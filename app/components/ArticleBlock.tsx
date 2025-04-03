import React from 'react';

export type ArticleBlockData = {
  summary: string;
  link: string;
};

type ArticleBlockProps = {
  data: ArticleBlockData;
};

const ArticleBlock: React.FC<ArticleBlockProps> = ({ data }) => {
  const styles = {
    articleBlock: {
      padding: '16px',
      margin: '12px 0',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      backgroundColor: '#f9f9f9',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      transition: 'transform 0.2s ease-in-out'
    },
    summary: {
      fontSize: '16px',
      lineHeight: '1.5',
      color: '#333',
      margin: '0 0 12px 0'
    },
    link: {
      display: 'inline-block',
      color: '#0070f3',
      textDecoration: 'none',
      fontWeight: 500,
      fontSize: '14px',
      padding: '4px 0'
    }
  };

  return (
    <div style={styles.articleBlock}>
      <p style={styles.summary}>{data.summary}</p>
      <a 
        href={data.link} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={styles.link}
      >
        Read More
      </a>
    </div>
  );
};

export default ArticleBlock;