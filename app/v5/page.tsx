'use client';

import { NextPage } from 'next';
import Section from '../components/Section';
import { useUpdateData } from '../../hooks/useUpdateData';

const Version5: NextPage = () => {
  const { data, loading, error } = useUpdateData('v5');

  if (loading) return <div>Loading data from Firebase...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data available.</div>;

  return (
    <>
      <h1>AIsoku - Latest Update (v5)</h1>
      <Section
        title="ニュース"
        articles={data.news.map(article => ({
          summary: article.content,
          link: article.url,
        }))}
      />
      <Section
        title="技術記事"
        articles={data.tech.map(article => ({
          summary: article.content,
          link: article.url,
        }))}
      />
    </>
  );
};

export default Version5;
