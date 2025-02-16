// components/Layout.tsx
import React, { ReactNode } from 'react';
import Link from 'next/link';
import styles from './Layout.module.css';

type LayoutProps = {
  children: ReactNode;
  currentUpdate: number;
};

const Layout: React.FC<LayoutProps> = ({ children, currentUpdate }) => {
  const updatePages = [1, 2, 3, 4, 5];
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2>更新一覧</h2>
        <ul>
          {updatePages.map((num) => (
            <li key={num}>
              <Link href={num === 1 ? '/' : `/update${num}`}>
                <a className={num === currentUpdate ? styles.active : ''}>更新 {num}</a>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
