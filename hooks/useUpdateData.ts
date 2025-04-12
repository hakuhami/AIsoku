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
        const newsDocRef = doc(db, updateId, 'news');
        const techDocRef = doc(db, updateId, 'tech');

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

        // 各doc.data() は { "1st": {...}, "2nd": {...}, "3rd": {...} } のようなオブジェクト
        const newsData = newsSnap.exists() ? (newsSnap.data() as Record<string, Article>) : {};
        const techData = techSnap.exists() ? (techSnap.data() as Record<string, Article>) : {};

        // フィールド名 "1st", "2nd", "3rd" をまとめて Article[] に変換
        const transformDoc = (docObj: Record<string, Article>) => {
          // キーを数値順にソート（"1st", "2nd", "3rd", ...）
          const sortedKeys = Object.keys(docObj).sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)?.[0] || "0", 10);
            const numB = parseInt(b.match(/\d+/)?.[0] || "0", 10);
            return numA - numB;
          });
          
          return sortedKeys.map(key => {
            const v = docObj[key];
            return {
              title: v.title || '',
              content: v.content || '',
              url: v.url || '',
            };
          });
        };

        const newsArr = transformDoc(newsData);
        const techArr = transformDoc(techData);

        setData({
          news: newsArr,
          tech: techArr,
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
