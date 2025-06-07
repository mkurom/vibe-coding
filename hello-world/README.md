# Hello World App

## プロジェクト概要
Next.js App Routerを使用したシンプルなHello Worldアプリケーション

## 使用技術
- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- PostCSS
- Autoprefixer

## 開発開始方法

### 依存関係のインストール
```bash
# npm使用の場合
npm install

# pnpm使用の場合（推奨）
pnpm install
```

### 開発サーバーの起動
```bash
# npm使用の場合
npm run dev

# pnpm使用の場合（推奨）
pnpm dev
```

ブラウザで `http://localhost:3000` を開いてアプリケーションを確認できます。

### ビルド
```bash
# npm使用の場合
npm run build

# pnpm使用の場合（推奨）
pnpm run build
```

### 本番サーバーの起動
```bash
# npm使用の場合
npm start

# pnpm使用の場合（推奨）
pnpm start
```

## プロンプト記録

### 初回作成プロンプト
```
Hello world を出力するアプリを作成して下さい
```

```
エラーが出ています
修正して下さい
```

### 作成内容
1. Next.js App Routerプロジェクトの初期化
2. TypeScript、Tailwind CSSの設定
3. レスポンシブデザインでモダンなUIのHello Worldページ
4. 使用技術のバッジ表示
5. 日本語対応

## ファイル構成
```
hello-world/
├── app/
│   ├── globals.css      # グローバルスタイル
│   ├── layout.tsx       # ルートレイアウト
│   └── page.tsx         # メインページ
├── next.config.js       # Next.js設定
├── tailwind.config.js   # Tailwind CSS設定
├── postcss.config.js    # PostCSS設定
├── tsconfig.json        # TypeScript設定
├── package.json         # 依存関係とスクリプト
└── README.md           # このファイル
``` 