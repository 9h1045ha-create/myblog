# ブログ情報

- **ブログ名**: 非正規が不老不死を目指す
- **URL**: https://myblog.9h1045ha.workers.dev
- **GitHubリポジトリ**: 9h1045ha-create/myblog

## 構成

- **静的サイトジェネレーター**: Hugo
- **テーマ**: Ananke
- **ホスティング**: Cloudflare Workers
- **デプロイ**: `git push origin main` で Cloudflare が自動ビルド＆デプロイ

## ディレクトリ構成

- `content/posts/` — 記事ファイル（Markdown）
- `assets/ananke/css/custom.css` — カスタムCSS
- `layouts/_partials/` — テーマのパーシャルオーバーライド
- `static/` — 静的ファイル（JS・画像など）
- `public/` — Hugo ビルド出力（コミット対象）
- `hugo.toml` — サイト設定

## デザイン

- 背景: ライトグレー (`#f4f6f8`)、記事カードは白
- ヘッダー: ダークネイビーグラデーション＋カラーボーダーライン
- フォント: Noto Sans JP（Google Fonts）
- カラーアクセント: ブルー系 (`#3182ce`)

## 記事追加の手順

1. `content/posts/` に Markdown ファイルを作成
2. フロントマターに `date`, `draft`, `title` を記載
3. `hugo` でビルド
4. `git add`, `git commit`, `git push origin main` でデプロイ
