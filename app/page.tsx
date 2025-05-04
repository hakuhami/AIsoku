'use client';

import { useEffect, useState } from 'react';
import { NextPage } from 'next';
import Section from './components/Section';
import { useUpdateData } from '../hooks/useUpdateData';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';

const Home: NextPage = () => {
  const { data, loading, error } = useUpdateData('v1');
  const [user, setUser] = useState<User | null>(null);

  // Firebase認証状態の監視
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Googleログイン処理
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      {String(error)}
      <div>ログインに失敗しました。もう一度お試しください。</div>;
    }
  };

  // 未ログインの場合のログイン画面
  if (!user) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        gap: '20px'
      }}>
        <h1>AIsoku - AIに関する最新情報を毎日更新</h1>
        <p>続けるにはGoogleアカウントでのログインが必要です</p>
        <button 
          onClick={loginWithGoogle}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4285F4',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ログイン
        </button>
      </div>
    );
  }

  if (loading) return <div>Loading data from Firebase...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available.</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1>AIsoku - 本日の更新</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span>ようこそ、{user.displayName || user.email}さん</span>
          <button 
            onClick={() => auth.signOut()} 
            style={{
              padding: '5px 10px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ログアウト
          </button>
        </div>
      </div>

      <Section
        title="ニュース"
        articles={data.news.map(article => ({
          title: article.title,
          content: article.content,
          url: article.url,
        }))}
      />
      <Section
        title="技術記事"
        articles={data.tech.map(article => ({
          title: article.title,
          content: article.content,
          url: article.url,
        }))}
      />
    </div>
  );
};

export default Home;