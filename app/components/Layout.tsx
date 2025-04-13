'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type LayoutProps = {
  children: ReactNode;
  currentUpdate: number;
};

const Layout: React.FC<LayoutProps> = ({ children, currentUpdate }) => {
  const updatePages = [1, 2, 3, 4, 5];
  const pathname = usePathname();
  const [activeUpdate, setActiveUpdate] = useState(1);
  
  // パスから現在の更新番号を取得し、状態として保持（更新 {num} の背景色を付けるため）
  useEffect(() => {
    const getUpdateFromPath = (): number => {      
      // /v2, /v3 などのパターンから数字を抽出
      const match = pathname?.match(/\/v(\d+)/);
      if (match && match[1]) {
        return parseInt(match[1], 10);
      }
      
      return 1; // デフォルト値（トップページの場合）
    };
    
    // パスから計算した値を優先し、props.currentUpdateはフォールバックとして使用
    const newActiveUpdate = getUpdateFromPath();
    setActiveUpdate(newActiveUpdate);
  }, [pathname, currentUpdate]);
  
  const styles = {
    container: {
      display: 'flex',
      minHeight: '100vh',
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px'
    },
    sidebar: {
      width: '250px',
      padding: '20px',
      backgroundColor: '#f0f0f0',
      borderRadius: '8px',
      marginRight: '20px'
    },
    main: {
      flex: 1,
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
    },
    sidebarTitle: {
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '16px'
    },
    navList: {
      listStyle: 'none',
      padding: 0,
      margin: 0
    },
    navItem: {
      marginBottom: '8px'
    },
    navLink: {
      display: 'block',
      padding: '8px 12px',
      textDecoration: 'none',
      color: '#333',
      borderRadius: '4px',
      transition: 'background-color 0.2s'
    },
    activeLink: {
      backgroundColor: '#e0e0e0',
      fontWeight: 'bold',
      color: '#0070f3'
    }
  };

  return (
    <div style={styles.container}>
      <aside style={styles.sidebar}>
        <h2 style={styles.sidebarTitle}>更新一覧</h2>
        <ul style={styles.navList}>
          {updatePages.map((num) => {            
            return (
              <li key={num} style={styles.navItem}>
                <Link 
                  href={num === 1 ? '/' : `/v${num}`} 
                  style={{
                    ...styles.navLink,
                    ...(num === activeUpdate ? styles.activeLink : {})
                  }}
                >
                  更新 {num}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
      <main style={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default Layout;