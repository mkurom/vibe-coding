# カウンターアプリ作成プロンプト

## 元のプロンプト
```
カウンターアプリを作成して下さい
```

## 作成されたもの
- Next.js 15 + TypeScript + Tailwind CSS + Shadcn UI を使用したモダンなカウンターアプリ
- レスポンシブデザイン対応
- ダークモード対応
- 美しいグラデーション背景
- アイコン付きボタン（増加、減少、リセット）
- カード形式のUI

## 機能
- カウンターの増加（+1）
- カウンターの減少（-1）
- カウンターのリセット（0に戻す）
- 現在の値の表示

## 技術スタック
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Lucide React (アイコン)
- React Hooks (useState)

## 実行方法
```bash
pnpm dev
```

## プロジェクト構造
```
counter-app/
├── src/
│   ├── app/
│   │   ├── page.tsx          # メインページ
│   │   └── globals.css       # グローバルスタイル
│   ├── components/
│   │   ├── ui/               # Shadcn UIコンポーネント
│   │   └── counter.tsx       # カウンターコンポーネント
│   └── lib/
│       └── utils.ts          # ユーティリティ関数
├── package.json
└── README.md
```

## 学習ポイント
- Next.js App Routerの使用方法
- TypeScriptでのReactコンポーネント作成
- Shadcn UIの導入と使用方法
- Tailwind CSSでのレスポンシブデザイン
- React Hooksを使った状態管理
- モダンなUIデザインの実装 