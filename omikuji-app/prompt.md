# おみくじアプリ開発プロンプト

## 概要
DDDアーキテクチャを採用した、Material Design 3スタイルのおみくじアプリの開発

## 要件
- Next.js 15 + TypeScript
- Material Design 3 デザインシステム採用
- Roboto フォント使用
- Tailwind CSS + Shadcn UI
- framer-motion によるアニメーション
- レスポンシブデザイン

## DDDアーキテクチャ
### ドメイン層
- FortuneLevel（運勢レベル値オブジェクト）
- FortuneScore（運勢スコア値オブジェクト）
- OmikujiId（ID値オブジェクト）
- Omikuji（おみくじエンティティ）
- OmikujiRepository（リポジトリインターフェース）
- OmikujiDomainService（ドメインサービス）

### アプリケーション層
- DrawOmikujiUseCase（おみくじを引くユースケース）
- GetOmikujiHistoryUseCase（履歴取得ユースケース）
- GetOmikujiStatisticsUseCase（統計取得ユースケース）

### インフラストラクチャ層
- LocalStorageService（ローカルストレージサービス）
- LocalOmikujiRepository（ローカルストレージ実装）

### プレゼンテーション層
- useOmikuji（カスタムフック）
- Material Design 3 コンポーネント

## Material Design 3 実装内容

### カラーシステム
- Primary: 緑系（103 80% 40%）
- Secondary: 紫系（285 43% 49%）
- Tertiary: オレンジ系（24 100% 50%）
- Surface: ニュートラル（0 0% 98%）
- ライト・ダークテーマ対応

### タイポグラフィ
- Roboto フォントファミリー使用
- Material Design 3 タイポグラフィスケール実装
- Display、Headline、Title、Body、Label各レベル

### コンポーネント
- md3-surface（基本サーフェス）
- md3-card-elevated（浮上カード）
- md3-card-filled（塗りつぶしカード）
- md3-button-filled（塗りつぶしボタン）
- md3-button-outlined（アウトラインボタン）
- md3-primary-container（プライマリコンテナ）
- md3-ripple（リップルエフェクト）

### エレベーション（立体感）
- 複数レベルのボックスシャドウ
- ホバー時の立体感変化
- スムーズなトランジション

## 機能
- おみくじを引く（7段階運勢）
- 詳細運勢表示（恋愛・仕事・健康・金運）
- ラッキーカラー・ナンバー表示
- 一日一回制限
- 結果シェア機能
- Material Design 3準拠のUI/UX

## 技術スタック
- Next.js 15
- TypeScript
- Tailwind CSS v4
- Shadcn UI
- Framer Motion
- Material Design 3
- Roboto Font
- nanoid (代替実装)
- date-fns
- nuqs

## 開発方針
日本の伝統的なおみくじ体験をモダンなWebアプリとして実現する。和風のデザインと最新のWeb技術を融合させ、直感的で楽しい体験を提供する。

## 技術指針
- Next.js 14 App Routerを使用
- TypeScriptで型安全性を確保
- Shadcn UI + Tailwind CSSで美しいUIを構築
- React Server Componentsを優先使用
- アニメーションでユーザー体験を向上

## 主要機能
1. **おみくじを引く**: ボタンクリックでランダムに運勢を決定
2. **結果表示**: 大吉〜大凶の7段階 + 詳細な運勢情報
3. **履歴管理**: ローカルストレージで過去30日分を保存
4. **統計表示**: 運勢の傾向をグラフで可視化
5. **シェア機能**: SNSでおみくじ結果を共有

## UI/UXの重要ポイント
- 和風モダンなデザイン（朱色・金色・紫をアクセントカラーに）
- アニメーション豊富な演出（おみくじを引く瞬間）
- レスポンシブ対応（モバイルファースト）
- アクセシビリティ配慮

## データ構造
```typescript
interface OmikujiResult {
  id: string;
  date: Date;
  fortune: FortuneLevel;
  generalMessage: string;
  love: number; // 1-5
  work: number; // 1-5  
  health: number; // 1-5
  money: number; // 1-5
  luckyColor: string;
  luckyNumber: number;
  advice: string;
}
```

## 開発ステップ
1. Next.jsプロジェクト初期化 + 基本設定
2. UIコンポーネント作成（ボタン、カード等）
3. おみくじロジック実装
4. 結果表示画面作成
5. 履歴・統計機能追加
6. アニメーション・演出追加
7. パフォーマンス最適化

## 注意点
- 'use client'の使用は最小限に
- ローカルストレージの容量制限を考慮
- 和風デザインを意識した色彩・フォント選択
- アニメーションのパフォーマンス最適化 