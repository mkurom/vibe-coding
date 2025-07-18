# 計算機アプリ要件定義書

## 1. 概要

### 1.1 プロジェクト概要
Web上で動作する四則演算対応の計算機アプリケーション

### 1.2 目的
- 基本的な四則演算機能を提供
- 直感的で使いやすいユーザーインターフェース
- レスポンシブデザインによるマルチデバイス対応

## 2. 機能要件

### 2.1 基本計算機能
- **FR-001**: 加算（+）演算機能
- **FR-002**: 減算（-）演算機能  
- **FR-003**: 乗算（×）演算機能
- **FR-004**: 除算（÷）演算機能
- **FR-005**: 小数点計算対応
- **FR-006**: 連続計算機能（演算子を続けて押した場合の処理）

### 2.2 入力機能
- **FR-007**: 数字入力（0-9）
- **FR-008**: 小数点入力（.）
- **FR-009**: 演算子入力（+, -, ×, ÷）
- **FR-010**: イコール入力（=）

### 2.3 表示機能
- **FR-011**: 現在の入力値表示
- **FR-012**: 計算結果表示
- **FR-013**: 演算状態の適切な表示切り替え

### 2.4 クリア機能
- **FR-014**: AC（All Clear）- 全ての値と状態をリセット
- **FR-015**: CE（Clear Entry）- 現在の入力値のみクリア

### 2.5 エラーハンドリング
- **FR-016**: ゼロ除算エラーの適切な処理
- **FR-017**: 無効な入力の防止
- **FR-018**: オーバーフローの適切な処理

## 3. 非機能要件

### 3.1 ユーザビリティ
- **NFR-001**: 直感的なボタン配置
- **NFR-002**: 視覚的フィードバック（ボタンクリック時のレスポンス）
- **NFR-003**: アクセシビリティ対応（スクリーンリーダー対応）

### 3.2 パフォーマンス
- **NFR-004**: ボタンクリック時の即座のレスポンス（100ms以内）
- **NFR-005**: 計算結果の即座の表示

### 3.3 互換性
- **NFR-006**: モダンブラウザ対応（Chrome, Firefox, Safari, Edge）
- **NFR-007**: レスポンシブデザイン（スマートフォン、タブレット、デスクトップ）

### 3.4 セキュリティ
- **NFR-008**: XSS攻撃の防止
- **NFR-009**: 入力値の適切なバリデーション

## 4. ユーザーインターフェース要件

### 4.1 レイアウト
- **UI-001**: カード型のコンパクトなデザイン
- **UI-002**: 4×5のボタングリッドレイアウト
- **UI-003**: 上部にディスプレイエリア配置
- **UI-004**: 視覚的に区別できるボタンの色分け

### 4.2 ボタン仕様
- **UI-005**: 数字ボタン（0-9）: アウトラインスタイル
- **UI-006**: 演算子ボタン（+, -, ×, ÷, =）: プライマリースタイル
- **UI-007**: クリアボタン（AC）: デストラクティブスタイル
- **UI-008**: クリアボタン（CE）: セカンダリースタイル

### 4.3 ディスプレイ仕様
- **UI-009**: 大きな数字での結果表示
- **UI-010**: 右寄せ表示
- **UI-011**: モノスペースフォント使用
- **UI-012**: 背景色で入力エリアを明確化

## 5. 動作仕様

### 5.1 基本操作フロー
1. **数字入力**: 数字ボタンクリック → ディスプレイに数字表示
2. **演算開始**: 演算子ボタンクリック → 次の数字入力待機状態
3. **計算実行**: イコールボタンクリック → 計算結果表示

### 5.2 状態管理
- **ST-001**: `display`: 現在表示中の値
- **ST-002**: `previousValue`: 前回入力された値
- **ST-003**: `operation`: 選択された演算子
- **ST-004**: `waitingForOperand`: 次の数値入力待機状態

### 5.3 計算ロジック
- **CALC-001**: 加算: `a + b`
- **CALC-002**: 減算: `a - b`
- **CALC-003**: 乗算: `a × b`
- **CALC-004**: 除算: `a ÷ b`（b≠0）

### 5.4 エラーケース
- **ERR-001**: ゼロ除算 → "Error"表示
- **ERR-002**: オーバーフロー → "Infinity"表示
- **ERR-003**: 無効な操作 → 前の状態を維持

## 6. テスト要件

### 6.1 ユニットテスト
- 計算ロジックの単体テスト
- 状態管理関数のテスト
- エラーハンドリングのテスト

### 6.2 統合テスト
- コンポーネント間の連携テスト
- UI操作とロジックの統合テスト

### 6.3 E2Eテスト
- 実際のユーザー操作フローのテスト
- ブラウザ間の動作確認
- レスポンシブデザインの確認

## 7. 受入れ基準

### 7.1 機能的受入れ基準
- [ ] 全ての四則演算が正確に動作する
- [ ] クリア機能が正しく動作する
- [ ] エラーケースが適切に処理される
- [ ] 連続計算が正しく動作する

### 7.2 非機能的受入れ基準
- [ ] 全てのテストが合格する
- [ ] レスポンシブデザインが正しく動作する
- [ ] アクセシビリティ要件を満たす
- [ ] パフォーマンス要件を満たす

## 8. 技術仕様

### 8.1 フロントエンド
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Testing**: Jest (Unit) + Playwright (E2E)

### 8.2 開発環境
- **Package Manager**: pnpm
- **Node.js**: 18.x以上
- **Browser Support**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ 