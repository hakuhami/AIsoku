'use client';

import { NextPage } from 'next';
import Section from '../components/Section';
import { useUpdateData } from '../../hooks/useUpdateData';

const Version3: NextPage = () => {
  const { data, loading, error } = useUpdateData('v3');

  if (loading) return <div>Loading data from Firebase...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available.</div>;

  return (
    <>
      <h1>AIsoku - Latest Update (v3)</h1>
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
    </>
  );
};

export default Version3;
