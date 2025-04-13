# AIsoku とは？

**進歩が速すぎるAIに関する情報のキャッチアップを、AIを用いて簡単に行う**
ことを目的としたwebアプリとなります。  
毎日午前8時に「AIに関するニュース」と「AIに関する技術記事」の2種類の記事から、LLMが代表的な情報を収集し要約したうえで、その情報を表示します。

デプロイ先：https://aisoku.vercel.app/  
LLMによる情報収集機能 (Host→ Cloud run)：https://github.com/hakuhami/AIsoku-retrieval

## システム構成

```mermaid
flowchart TD
    A["<u>AIsoku app</u>
    (Vercel Hosting)
    (TypeScript (Next.js))"]:::thick
    
    B["<u>Firestore</u>
    (Perplexity が収集・要約
    した記事情報の DB)"]

    C["<u>LLM の情報収集モジュール</u>
    ・Perplexity API
    (sonar-pro)
    ・Cloud Run Jobs
    　　によるバッジ処理
    ・毎日午前8時にスケジュ
    　　ール実行し、Firestore
    にアップロード
    （最も古いデータを削除、合計5日分のみ保存）"]

    A -->|"クライアントから
    問い合わせ"| B
    C -->|"毎朝8時書き込み（更新）"| B
    B -->|"全情報（5日分の記事）
    をレスポンス"|A

    classDef thick stroke-width:10px
```

## 技術スタック

- **フロントエンド**: Next.js
- **LLM**: Perplexity (sonor-pro)
- **情報更新のバッジ処理**: Cloud run job
- **データベース**: Firestore
- **デプロイ**: Vercel