import Section from '../components/Section';

type ArticleBlockData = {
  summary: string;
  link: string;
};

const dummyNews: ArticleBlockData[] = [
  { summary: 'ニュース4-1', link: 'https://example.com/news2-1' },
  { summary: 'ニュース4-2', link: 'https://example.com/news2-2' },
  { summary: 'ニュース4-3', link: 'https://example.com/news2-3' },
];

const dummyTech: ArticleBlockData[] = [
  { summary: '技術記事4-1', link: 'https://example.com/tech2-1' },
  { summary: '技術記事4-2', link: 'https://example.com/tech2-2' },
  { summary: '技術記事4-3', link: 'https://example.com/tech2-3' },
];

const dummyPapers: ArticleBlockData[] = [
  { summary: '論文4-1', link: 'https://example.com/paper2-1' },
  { summary: '論文4-2', link: 'https://example.com/paper2-2' },
  { summary: '論文4-3', link: 'https://example.com/paper2-3' },
];

export default function Version4() {
  return (
    <>
      <h1>SummAI 更新 (更新4)</h1>
      <Section title="ニュース" articles={dummyNews} />
      <Section title="技術記事" articles={dummyTech} />
      <Section title="論文" articles={dummyPapers} />
    </>
  );
}