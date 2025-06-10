# TODO List App

シンプルで使いやすいTODOリストアプリケーションです。TypeScript、React、Next.js、Tailwind CSS、Shadcn UIを使用して構築されています。

## 🚀 機能

### 基本機能
- ✅ **タスク追加**: 新しいタスクを簡単に追加
- ✅ **タスク表示**: すべてのタスクを見やすく一覧表示
- ✅ **タスク編集**: 既存のタスクの内容をインライン編集
- ✅ **タスク削除**: 不要なタスクを削除
- ✅ **完了/未完了切り替え**: ワンクリックでタスクの状態を変更

### 高度な機能
- 🔍 **フィルタリング**: 全て/未完了/完了済みでタスクをフィルタ
- 📊 **並び替え**: 作成日時順または名前順でソート
- 📈 **統計表示**: タスクの進捗状況を視覚的に確認
- 💾 **自動保存**: LocalStorageでデータを自動保存
- 📱 **レスポンシブ**: モバイル、タブレット、デスクトップに対応

## 🛠️ 技術スタック

- **Frontend**: React 19, Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI, Radix UI
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Data Storage**: LocalStorage

## 🏃‍♂️ クイックスタート

### 前提条件
- Node.js 18以上
- pnpm

### インストールと起動

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) にアクセスしてアプリを確認できます。

## 📂 プロジェクト構造

```
todo-app/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # ルートレイアウト
│   ├── page.tsx           # メインページ
│   └── globals.css        # グローバルスタイル
├── components/            # Reactコンポーネント
│   ├── ui/               # Shadcn UIコンポーネント
│   ├── todo-app.tsx      # メインTODOアプリコンポーネント
│   ├── task-form.tsx     # タスク追加フォーム
│   ├── task-list.tsx     # タスク一覧表示
│   ├── task-item.tsx     # 個別タスクアイテム
│   ├── task-filters.tsx  # フィルタリング機能
│   └── task-stats.tsx    # 統計表示
├── lib/                  # ユーティリティ
│   ├── types.ts          # TypeScript型定義
│   ├── task-utils.ts     # タスク操作関数
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
