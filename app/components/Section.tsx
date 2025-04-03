// components/Section.tsx
import React from 'react';
import ArticleBlock, { ArticleBlockData } from './ArticleBlock';

type SectionProps = {
  title: string;
  articles: ArticleBlockData[];
};

const Section: React.FC<SectionProps> = ({ title, articles }) => {
  const styles = {
    section: {
      marginBottom: '32px',
      padding: '16px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '16px',
      paddingBottom: '8px',
      borderBottom: '1px solid #eaeaea'
    },
    articleList: {
      display: 'grid',
      gap: '16px'
    }
  };

  return (
    <section style={styles.section}>
      <h3 style={styles.sectionTitle}>{title}</h3>
      <div style={styles.articleList}>
        {articles.map((article, index) => (
          <ArticleBlock key={index} data={article} />
        ))}
      </div>
    </section>
  );
};

export default Section;