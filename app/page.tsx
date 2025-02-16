// pages/index.tsx
import { NextPage } from 'next';
import Layout from './components/layout';
import Section from './components/section';

type ArticleBlockData = {
  summary: string;
  link: string;
};

// ダミーデータ（後でAPI連携時に置き換え可能）
const dummyNews: ArticleBlockData[] = [
  { summary: '最新ニュース1', link: 'https://example.com/news1' },
  { summary: '最新ニュース2', link: 'https://example.com/news2' },
  { summary: '最新ニュース3', link: 'https://example.com/news3' },
];

const dummyTech: ArticleBlockData[] = [
  { summary: '最新技術記事1', link: 'https://example.com/tech1' },
  { summary: '最新技術記事2', link: 'https://example.com/tech2' },
  { summary: '最新技術記事3', link: 'https://example.com/tech3' },
];

const dummyPapers: ArticleBlockData[] = [
  { summary: '最新論文1', link: 'https://example.com/paper1' },
  { summary: '最新論文2', link: 'https://example.com/paper2' },
  { summary: '最新論文3', link: 'https://example.com/paper3' },
];

const Home: NextPage = () => {
  return (
    <Layout currentUpdate={1}>
      <h1>SummAI 最新更新 (更新1)</h1>
      <Section title="ニュース" articles={dummyNews} />
      <Section title="技術記事" articles={dummyTech} />
      <Section title="論文" articles={dummyPapers} />
    </Layout>
  );
};

export default Home;
