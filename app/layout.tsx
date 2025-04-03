import './globals.css'
import Layout from './components/Layout'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AIsoku - AI最新情報まとめ',
  description: 'AIに関するニュース、技術記事、論文の要約を毎日提供するサービス',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <Layout currentUpdate={1}>
          {children}
        </Layout>
      </body>
    </html>
  )
}