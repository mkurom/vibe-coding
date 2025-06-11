# 🎋 おみくじアプリ

Material Design 3スタイルで作られた、DDD（ドメイン駆動設計）に基づいて構築されたモダンなおみくじアプリケーションです。

## ✨ 特徴

- **Material Design 3**: Googleの最新デザインシステムを採用
- **DDD アーキテクチャ**: クリーンで保守性の高いコード構造
- **レスポンシブ対応**: モバイル・タブレット・PC対応
- **ローカルストレージ**: 過去30日分の履歴を保存
- **アニメーション**: Framer Motionによる滑らかな演出
- **モダンタイポグラフィ**: Robotoフォントによる美しい文字表現

## 🎯 機能

### 🎲 おみくじを引く
- ワンクリックでランダムな運勢を生成
- 7段階の運勢レベル（大吉〜大凶）
- 一日一回の制限機能

### 📊 詳細な運勢情報
- **総合運勢**: メインの運勢とメッセージ
- **個別運勢**: 恋愛運・仕事運・健康運・金運（1-5星評価）
- **ラッキー情報**: ラッキーカラー・ラッキーナンバー
- **アドバイス**: その日に適した行動指針

### 🔄 シェア機能
- SNS用テキスト自動生成
- Web Share API対応
- クリップボードコピー機能

## 🏗️ アーキテクチャ

### DDDレイヤー構成

```
src/
├── domain/                 # ドメイン層
│   ├── entities/           # エンティティ
│   │   └── omikuji.ts     # おみくじエンティティ
│   ├── value-objects/      # 値オブジェクト
│   │   ├── fortune-level.ts
│   │   ├── fortune-score.ts
│   │   └── omikuji-id.ts
│   ├── repositories/       # リポジトリインターフェース
│   │   └── omikuji-repository.ts
│   └── services/          # ドメインサービス
│       └── omikuji-domain-service.ts
├── application/           # アプリケーション層
│   └── use-cases/         # ユースケース
│       ├── draw-omikuji-use-case.ts
│       ├── get-omikuji-history-use-case.ts
│       └── get-omikuji-statistics-use-case.ts
├── infrastructure/        # インフラストラクチャ層
│   ├── storage/           # ストレージサービス
│   │   └── local-storage-service.ts
│   └── persistence/       # 永続化実装
│       └── local-omikuji-repository.ts
├── presentation/          # プレゼンテーション層
│   ├── hooks/             # カスタムフック
│   │   └── use-omikuji.ts
│   └── components/        # プレゼンテーションコンポーネント
└── app/                   # Next.js App Router
    ├── page.tsx
    ├── layout.tsx
    └── globals.css
```

### 技術スタック

- **フレームワーク**: Next.js 15 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: Shadcn UI + Radix UI
- **アニメーション**: Framer Motion
- **状態管理**: React Hooks
- **データ永続化**: LocalStorage
- **パッケージマネージャー**: pnpm

## 🚀 セットアップ

### 必要な環境
- Node.js 18以上
- pnpm

### インストール

```bash
# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

### ビルド

```bash
# 本番ビルド
pnpm build

# ビルド結果の確認
pnpm start
```

## 📝 DDD設計の特徴

### ドメイン駆動設計の利点

1. **ビジネスロジックの分離**: ドメイン層でビジネスルールを管理
2. **テスタビリティ**: 各層が独立しているためテストが容易
3. **保守性**: 関心の分離により変更影響を局所化
4. **拡張性**: 新機能追加時のアーキテクチャが明確

### 主要なドメインオブジェクト

- **FortuneLevel**: 運勢レベルを表現する値オブジェクト
- **FortuneScore**: 1-5の運勢スコアを表現する値オブジェクト
- **Omikuji**: おみくじのエンティティ（集約ルート）
- **OmikujiDomainService**: おみくじに関するドメインロジック

## 🎨 デザインシステム

### カラーパレット
- **プライマリ**: 朱色系（#E53E3E）
- **セカンダリ**: 金色系（#D69E2E）
- **アクセント**: 紫系（#805AD5）
- **背景**: 温かみのある白（#FFFAF0）

### レスポンシブデザイン
- モバイルファースト
- ブレークポイント: sm(640px), md(768px), lg(1024px)

## 📱 使用方法

1. **おみくじを引く**: 「おみくじを引く」ボタンをクリック
2. **結果確認**: 運勢、個別運勢、ラッキー情報、アドバイスを確認
3. **シェア**: 「結果をシェア」ボタンでSNSに投稿
4. **再チャレンジ**: 「もう一度引く」ボタンで新しいおみくじを引く

## 🔮 今後の拡張予定

- [ ] 履歴画面の実装
- [ ] 統計画面の実装
- [ ] 多言語対応（日本語・英語）
- [ ] PWA対応
- [ ] ダークモード
- [ ] 季節・イベント限定おみくじ

## 📄 ライセンス

MIT License

---

**作成者**: AI Assistant  
**作成日**: 2024年12月  
**技術**: DDD + Next.js + TypeScript
