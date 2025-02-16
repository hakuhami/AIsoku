// pages/update2.tsx
import { NextPage } from 'next';
import Layout from './components/layout';
import Section from './components/section';

type ArticleBlockData = {
  summary: string;
  link: string;
};

const dummyNews: ArticleBlockData[] = [
  { summary: 'ニュース2-1', link: 'https://example.com/news2-1' },
  { summary: 'ニュース2-2', link: 'https://example.com/news2-2' },
  { summary: 'ニュース2-3', link: 'https://example.com/news2-3' },
];

const dummyTech: ArticleBlockData[] = [
  { summary: '技術記事2-1', link: 'https://example.com/tech2-1' },
  { summary: '技術記事2-2', link: 'https://example.com/tech2-2' },
  { summary: '技術記事2-3', link: 'https://example.com/tech2-3' },
];

const dummyPapers: ArticleBlockData[] = [
  { summary: '論文2-1', link: 'https://example.com/paper2-1' },
  { summary: '論文2-2', link: 'https://example.com/paper2-2' },
  { summary: '論文2-3', link: 'https://example.com/paper2-3' },
];

const Version2: NextPage = () => {
  return (
    <Layout currentUpdate={2}>
      <h1>SummAI 更新 (更新2)</h1>
      <Section title="ニュース" articles={dummyNews} />
      <Section title="技術記事" articles={dummyTech} />
      <Section title="論文" articles={dummyPapers} />
    </Layout>
  );
};

export default Version2;
