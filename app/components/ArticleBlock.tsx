// components/ArticleBlock.tsx
import React from 'react';
import styles from './ArticleBlock.module.css';

export type ArticleBlockData = {
  summary: string;
  link: string;
};

type ArticleBlockProps = {
  data: ArticleBlockData;
};

const ArticleBlock: React.FC<ArticleBlockProps> = ({ data }) => {
  return (
    <div className={styles.articleBlock}>
      <p className={styles.summary}>{data.summary}</p>
      <a href={data.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
        Read More
      </a>
    </div>
  );
};

export default ArticleBlock;
