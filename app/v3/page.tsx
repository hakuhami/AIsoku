import Section from '../components/Section';

type ArticleBlockData = {
  summary: string;
  link: string;
};

const dummyNews: ArticleBlockData[] = [
  { summary: 'ニュース3-1', link: 'https://example.com/news2-1' },
  { summary: 'ニュース3-2', link: 'https://example.com/news2-2' },
  { summary: 'ニュース3-3', link: 'https://example.com/news2-3' },
];

const dummyTech: ArticleBlockData[] = [
  { summary: '技術記事3-1', link: 'https://example.com/tech2-1' },
  { summary: '技術記事3-2', link: 'https://example.com/tech2-2' },
  { summary: '技術記事3-3', link: 'https://example.com/tech2-3' },
];

const dummyPapers: ArticleBlockData[] = [
  { summary: '論文3-1', link: 'https://example.com/paper2-1' },
  { summary: '論文3-2', link: 'https://example.com/paper2-2' },
  { summary: '論文3-3', link: 'https://example.com/paper2-3' },
];

export default function Version3() {
  return (
    <>
      <h1>AIsoku 更新 (更新3)</h1>
      <Section title="ニュース" articles={dummyNews} />
      <Section title="技術記事" articles={dummyTech} />
      <Section title="論文" articles={dummyPapers} />
    </>
  );
}