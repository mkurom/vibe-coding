'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useOmikuji } from '@/presentation/hooks/use-omikuji';

export default function Home() {
  const { isDrawing, currentOmikuji, error, drawOmikuji, clearError, clearCurrentOmikuji } = useOmikuji();
  const [showResult, setShowResult] = useState(false);

  const handleDraw = async () => {
    await drawOmikuji();
    if (!error) {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    clearCurrentOmikuji();
    setShowResult(false);
    clearError();
  };

  const getFortuneColor = (fortune: string) => {
    switch (fortune) {
      case 'great-luck':
        return 'md3-tertiary-container';
      case 'middle-luck':
        return 'md3-primary-container';
      case 'small-luck':
        return 'md3-secondary-container';
      case 'luck':
        return 'md3-surface-variant';
      case 'end-luck':
        return 'md3-surface';
      case 'bad-luck':
        return 'md3-surface-variant';
      case 'great-bad-luck':
        return 'bg-red-100 text-red-800';
      default:
        return 'md3-surface-variant';
    }
  };

  const getScoreStars = (score: number) => {
    return '★'.repeat(score) + '☆'.repeat(5 - score);
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="md3-display-medium text-primary mb-4">
            🎋 おみくじ
          </h1>
          <p className="md3-body-large text-on-surface mb-2">
            今日の運勢を占ってみましょう
          </p>
          <p className="md3-body-small text-on-surface-variant">
            一日一回、あなたの運勢をお教えします
          </p>
        </div>

        {!showResult ? (
          /* おみくじを引く画面 */
          <div className="max-w-md mx-auto">
            <div className="md3-card-elevated p-8">
              <div className="flex flex-col items-center space-y-8">
                {/* おみくじ箱 */}
                <div className="omikuji-container w-40 h-56 flex items-center justify-center cursor-pointer md3-ripple">
                  <div className="md3-headline-small">おみくじ</div>
                </div>

                {/* 引くボタン */}
                <Button
                  onClick={handleDraw}
                  disabled={isDrawing}
                  size="lg"
                  className="md3-button-filled md3-ripple px-8 py-4"
                >
                  {isDrawing ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      <span className="md3-label-large">占い中...</span>
                    </div>
                  ) : (
                    <span className="md3-label-large">おみくじを引く</span>
                  )}
                </Button>

                {/* エラー表示 */}
                {error && (
                  <div className="md3-surface w-full border border-outline rounded-2xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="md3-body-medium text-error">{error}</span>
                      <button 
                        onClick={clearError} 
                        className="text-error hover:text-error/80 md3-label-medium"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : currentOmikuji ? (
          /* 結果表示画面 */
          <div className="max-w-3xl mx-auto space-y-6">
            {/* 運勢メイン */}
            <div className="md3-card-elevated p-8 text-center">
              <div className="mb-6">
                <div className={`inline-block px-8 py-4 rounded-2xl ${getFortuneColor(currentOmikuji.getFortune().getValue())}`}>
                  <h2 className="md3-headline-large">
                    {currentOmikuji.getFortune().getDisplayName()}
                  </h2>
                </div>
              </div>
              <p className="md3-body-large text-on-surface leading-relaxed max-w-2xl mx-auto">
                {currentOmikuji.getGeneralMessage()}
              </p>
            </div>

            {/* 詳細運勢 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="md3-card-filled p-6 text-center">
                <h3 className="md3-title-medium text-primary mb-3">恋愛運</h3>
                <div className="md3-headline-small text-secondary">{getScoreStars(currentOmikuji.getLoveScore().getValue())}</div>
              </div>
              
              <div className="md3-card-filled p-6 text-center">
                <h3 className="md3-title-medium text-primary mb-3">仕事運</h3>
                <div className="md3-headline-small text-secondary">{getScoreStars(currentOmikuji.getWorkScore().getValue())}</div>
              </div>
              
              <div className="md3-card-filled p-6 text-center">
                <h3 className="md3-title-medium text-primary mb-3">健康運</h3>
                <div className="md3-headline-small text-secondary">{getScoreStars(currentOmikuji.getHealthScore().getValue())}</div>
              </div>
              
              <div className="md3-card-filled p-6 text-center">
                <h3 className="md3-title-medium text-primary mb-3">金運</h3>
                <div className="md3-headline-small text-secondary">{getScoreStars(currentOmikuji.getMoneyScore().getValue())}</div>
              </div>
            </div>

            {/* ラッキー情報 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md3-surface-variant p-6 rounded-2xl">
                <h3 className="md3-title-medium text-tertiary mb-4">ラッキーカラー</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary shadow-md"></div>
                  <span className="md3-body-large">{currentOmikuji.getLuckyColor()}</span>
                </div>
              </div>
              
              <div className="md3-surface-variant p-6 rounded-2xl">
                <h3 className="md3-title-medium text-tertiary mb-4">ラッキーナンバー</h3>
                <div className="md3-display-small text-primary font-bold">
                  {currentOmikuji.getLuckyNumber()}
                </div>
              </div>
            </div>

            {/* アドバイス */}
            <div className="md3-primary-container p-8 rounded-2xl">
              <h3 className="md3-title-large mb-4">今日のアドバイス</h3>
              <p className="md3-body-large leading-relaxed">
                {currentOmikuji.getAdvice()}
              </p>
            </div>

            {/* アクションボタン */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
              <Button
                onClick={handleReset}
                variant="outline"
                size="lg"
                className="md3-button-outlined md3-ripple px-8 py-4"
              >
                <span className="md3-label-large">もう一度引く</span>
              </Button>
              
              <Button
                onClick={() => {
                  const text = `今日のおみくじは「${currentOmikuji.getFortune().getDisplayName()}」でした！🎋\nラッキーカラー: ${currentOmikuji.getLuckyColor()}\nラッキーナンバー: ${currentOmikuji.getLuckyNumber()}\n\n#おみくじ #運勢`;
                  if (navigator.share) {
                    navigator.share({ text });
                  } else {
                    navigator.clipboard.writeText(text);
                    alert('結果をクリップボードにコピーしました！');
                  }
                }}
                className="md3-button-filled md3-ripple px-8 py-4"
                size="lg"
              >
                <span className="md3-label-large">結果をシェア</span>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
} 