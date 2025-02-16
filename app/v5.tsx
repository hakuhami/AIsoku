// pages/update2.tsx
import { NextPage } from 'next';
import Layout from './components/layout';
import Section from './components/section';

type ArticleBlockData = {
  summary: string;
  link: string;
};

const dummyNews: ArticleBlockData[] = [
  { summary: 'ニュース5-1', link: 'https://example.com/news2-1' },
  { summary: 'ニュース5-2', link: 'https://example.com/news2-2' },
  { summary: 'ニュース5-3', link: 'https://example.com/news2-3' },
];

const dummyTech: ArticleBlockData[] = [
  { summary: '技術記事5-1', link: 'https://example.com/tech2-1' },
  { summary: '技術記事5-2', link: 'https://example.com/tech2-2' },
  { summary: '技術記事5-3', link: 'https://example.com/tech2-3' },
];

const dummyPapers: ArticleBlockData[] = [
  { summary: '論文5-1', link: 'https://example.com/paper2-1' },
  { summary: '論文5-2', link: 'https://example.com/paper2-2' },
  { summary: '論文5-3', link: 'https://example.com/paper2-3' },
];

const Version5: NextPage = () => {
  return (
    <Layout currentUpdate={2}>
      <h1>SummAI 更新 (更新5)</h1>
      <Section title="ニュース" articles={dummyNews} />
      <Section title="技術記事" articles={dummyTech} />
      <Section title="論文" articles={dummyPapers} />
    </Layout>
  );
};

export default Version5;
