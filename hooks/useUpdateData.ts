import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

/**
 * Firestore内のデータ構造:
 * 
 * 【通常構造 - 大半のケース】
 * {updateId} (collection)
 *   ├── news (doc)
 *   │   ├── 1st (field) ── Article
 *   │   ├── 2nd (field) ── Article
 *   │   └── 3rd (field) ── Article
 *   └── tech (doc)
 *       ├── 1st (field) ── Article
 *       ├── 2nd (field) ── Article
 *       └── 3rd (field) ── Article
 * 
 * 【異常構造 - 稀なケース】（API側で要修正。異常な構造になってしまった際にも、画面上では正しく表示できるようにする。）
 * {updateId} (collection)
 *   ├── news (doc)
 *   │   └── 1st (field) ── { "1st": Article, "2nd": Article, "3rd": Article }
 *   └── tech (doc)
 *       └── 1st (field) ── { "1st": Article, "2nd": Article, "3rd": Article }
 */

export type Article = {
  title: string;
  content: string;
  url: string;
};

export type UpdateData = {
  news: Article[];
  tech: Article[];
};

// Firestoreから取得する可能性のある記事データの型
interface ArticleData {
  title?: string;
  content?: string;
  url?: string;
}

// 通常のドキュメント構造
type FirestoreDocData = Record<string, ArticleData>;

// Firestoreから取得する可能性のあるデータ型
type FirestoreData = Record<string, unknown>;

export function useUpdateData(updateId: string) {
  const [data, setData] = useState<UpdateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newsDocRef = doc(db, updateId, 'news');
        const techDocRef = doc(db, updateId, 'tech');

        const [newsSnap, techSnap] = await Promise.all([
          getDoc(newsDocRef),
          getDoc(techDocRef),
        ]);

        // ドキュメントのデータを取得
        const rawNewsData = newsSnap.exists() ? newsSnap.data() : {};
        const rawTechData = techSnap.exists() ? techSnap.data() : {};

        // ステップ1: 通常のデータ構造ならそのまま取得、異常なネスト構造がある場合は対処
        const newsData = handlePossibleNestedStructure(rawNewsData);
        const techData = handlePossibleNestedStructure(rawTechData);

        // ステップ2: 記事データを順序通りに配列に変換
        const newsArticles = convertToOrderedArticleArray(newsData);
        const techArticles = convertToOrderedArticleArray(techData);

        setData({
          news: newsArticles,
          tech: techArticles,
        });
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [updateId]);

  return { data, loading, error };
}

/**
 * 通常の構造であればそのまま取得、稀に発生する異常なネスト構造の場合は、それを検出して修正して返す関数
 * （ "異常な構造": { "1st": { "1st": {...}, "2nd": {...} } } のような構造を修正 ）
 */
function handlePossibleNestedStructure(data: FirestoreData): FirestoreDocData {
  const keys = Object.keys(data);
  
  // 異常構造の検出: キーが1つだけ("1st")で、その値がオブジェクト（原因は要確認）
  if (keys.length === 1 && keys[0] === '1st' && 
      typeof data['1st'] === 'object' && data['1st'] !== null) {
    
    const firstValue = data['1st'] as Record<string, unknown>;
    // "1st"フィールド内に1st, 2nd, 3rdなどのキーが存在するか確認
    const nestedKeys = Object.keys(firstValue);
    const hasExpectedNestedStructure = nestedKeys.some(key => /^\d+(?:st|nd|rd|th)$/.test(key));
    
    if (hasExpectedNestedStructure) {
      return firstValue as FirestoreDocData;
    }
  }
  
  // 通常構造の場合: そのまま返す
  return data as FirestoreDocData;
}

/**
 * 記事データを順序付けられた配列に変換する関数
 */
function convertToOrderedArticleArray(docObj: FirestoreDocData): Article[] {
  // キーを数値順にソート (1st, 2nd, 3rd, ...)
  const sortedKeys = Object.keys(docObj).sort((a, b) => {
    const numA = parseInt(a.match(/\d+/)?.[0] || "0", 10);
    const numB = parseInt(b.match(/\d+/)?.[0] || "0", 10);
    return numA - numB;
  });
  
  return sortedKeys.map(key => {
    const articleData = docObj[key];
    
    // 無効なデータの場合は空のArticleを返す
    if (!articleData || typeof articleData !== 'object') {
      return { title: '', content: '', url: '' };
    }
    
    // 有効な記事データを返す
    return {
      title: articleData.title || '',
      content: articleData.content || '',
      url: articleData.url || '',
    };
  });
}