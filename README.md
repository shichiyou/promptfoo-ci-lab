# promptfoo CI Lab

## 概要

[promptfoo](https://promptfoo.dev) を CI/CD パイプラインに組み込んだ実験環境。

## 使い方（ローカル）

```bash
# 評価実行
npm run eval

# 結果をブラウザで確認
npm run view

# Red Team スキャン
npm run redteam
```

## CI/CD

GitHub Actions で以下が自動実行されます：

- `push` to `main`
- `pull_request` to `main`
- 毎週月曜 09:00 UTC（定期回帰テスト）

## プロバイダー

- OpenAI GPT-4o / GPT-4o-mini
- Anthropic Claude（コメントアウト済み）
- Ollama ローカルモデル（コメントアウト済み）

## プロジェクトルート汚染防止

本リポジトリは `experiences/promptfoo-ci-lab/` サブモジュールとして親リポジトリに含まれます。
`node_modules`, 出力ファイル, `.env` は `.gitignore` で除外されています。
