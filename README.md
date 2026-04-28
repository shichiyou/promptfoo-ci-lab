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

| トリガ | 実行フェーズ | 設定ファイル |
|---|---|---|
| `push` to `main` | 全フェーズ一括実行 + Phase 2 品質ゲート | `tests/*.yaml` |
| `pull_request` to `main` | Phase 1 要件分析 | `tests/requirements-analysis.yaml` |
| 毎週月曜 09:00 UTC | Phase 3 実装計画 | `tests/impl-plan.yaml` |

各フェーズは独立した設定ファイルで管理：

```bash
# Phase 1: 要件分析
npm run eval:phase1

# Phase 2: 品質ゲート
npm run eval:phase2

# Phase 3: 実装計画
npm run eval:phase3

# 全フェーズ一括実行
npm run eval
```

## プロバイダー

- OpenAI GPT-4o / GPT-4o-mini
- Anthropic Claude（コメントアウト済み）
- Ollama ローカルモデル（コメントアウト済み）

## プロジェクトルート汚染防止

本リポジトリは `experiences/promptfoo-ci-lab/` サブモジュールとして親リポジトリに含まれます。
`node_modules`, 出力ファイル, `.env` は `.gitignore` で除外されています。
