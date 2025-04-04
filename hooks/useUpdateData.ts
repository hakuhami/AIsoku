// hooks/useUpdateData.ts
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

/**
 * Firestore内の構造:
 *  {updateId} (collection)
 *    ├── news (doc)
 *    └── tech (doc)
 *        ├── 1st (field)
 *        ├── 2st (field)
 *        └── 3st (field)
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

export function useUpdateData(updateId: string) {
  const [data, setData] = useState<UpdateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // "v1"などのコレクションの中の "news", "tech" ドキュメントを取得
        const newsDocRef = doc(db, updateId, 'news');
        const techDocRef = doc(db, updateId, 'tech');
        // papersDocRef も必要なら定義: doc(db, updateId, 'papers');

        const [newsSnap, techSnap] = await Promise.all([
          getDoc(newsDocRef),
          getDoc(techDocRef),
        ]);

        if (!newsSnap.exists()) {
          console.warn(`No 'news' doc found for ${updateId}`);
        }
        if (!techSnap.exists()) {
          console.warn(`No 'tech' doc found for ${updateId}`);
        }

        // 各doc.data() は { "1st": {...}, "2st": {...}, "3st": {...} } のようなオブジェクト
        const newsData = newsSnap.exists() ? (newsSnap.data() as Record<string, Article>) : {};
        const techData = techSnap.exists() ? (techSnap.data() as Record<string, Article>) : {};
        // const papersData = papersSnap.exists() ? (papersSnap.data() as Record<string, Article>) : {};

        // フィールド名 "1st", "2st", "3st" をまとめて Article[] に変換
        const transformDoc = (docObj: Record<string, Article>) => {
          return Object.values(docObj).map((v) => ({
            title: v.title || '',
            content: v.content || '',
            url: v.url || '',
          }));
        };

        const newsArr = transformDoc(newsData);
        const techArr = transformDoc(techData);
        // const papersArr = transformDoc(papersData);

        setData({
          news: newsArr,
          tech: techArr,
          // papers: papersArr
        });
      } catch (err: unknown) {
        setError(`Error fetching data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [updateId]);

  return { data, loading, error };
}
