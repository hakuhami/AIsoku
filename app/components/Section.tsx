// components/Section.tsx
import React from 'react';
import ArticleBlock, { ArticleBlockData } from './ArticleBlock';
import styles from './Section.module.css';

type SectionProps = {
  title: string;
  articles: ArticleBlockData[];
};

const Section: React.FC<SectionProps> = ({ title, articles }) => {
  return (
    <section className={styles.section}>
      <h3>{title}</h3>
      <div className={styles.articleList}>
        {articles.map((article, index) => (
          <ArticleBlock key={index} data={article} />
        ))}
      </div>
    </section>
  );
};

export default Section;
