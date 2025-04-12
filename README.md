# AIsoku とは？

**進歩が速すぎるAIに関する情報のキャッチアップを、AIを用いて簡単に行う**
ことを目的としたwebアプリとなります。
毎日午前8時に「AIに関するニュース」と「AIに関する技術記事」の2種類からLLMが情報を収集し、情報をアップデートしていきます。

デプロイ先：https://aisoku.vercel.app/

## システム構成

```mermaid
flowchart TD
    A[Vercel Hosting<br>(Next.js Frontend – AIsoku)<br>[TypeScript (React & Next.js)]]
    B[Firestore<br>(データ格納庫)]
    C[Cloud Run Jobs<br>(AIsoku-retrieval – Python バッチ処理)<br>・Perplexity API ("sonar-reasoning") 使用<br>・毎日午前8時にスケジュール実行<br>・Firestore "v1" にアップロード<br>　　＋データシフト (v1 → v2, ... ,v5削除)]

    A -->|クライアントから<br>Firestoreへの問い合わせ| B
    C -->|書き込み（更新）| B
    end

```

## 機能

- 更新バージョンごとの技術情報表示
- ニュースと技術記事のカテゴリ分け
- レスポンシブUIデザイン
- Firebase Firestoreを使用したデータ管理

## 技術スタック

- **フロントエンド**: Next.js
- **LLM**: Perplexity (sonor-pro)
- **LLMによるバッジ処理**: Cloud run job
- **データベース**: Firebase Firestore
- **デプロイ**: Vercel