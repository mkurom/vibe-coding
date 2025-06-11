import { Omikuji } from '../entities/omikuji';
import { FortuneLevel } from '../value-objects/fortune-level';

export class OmikujiDomainService {
  static canDrawOmikujiToday(todaysOmikuji: Omikuji[]): boolean {
    // 一日一回のルール（要件により変更可能）
    return todaysOmikuji.length === 0;
  }

  static calculateStatistics(omikujiList: Omikuji[]): FortuneStatistics {
    const statistics: FortuneStatistics = {
      total: omikujiList.length,
      counts: {
        'great-luck': 0,
        'middle-luck': 0,
        'small-luck': 0,
        'luck': 0,
        'end-luck': 0,
        'bad-luck': 0,
        'great-bad-luck': 0,
      },
      percentages: {
        'great-luck': 0,
        'middle-luck': 0,
        'small-luck': 0,
        'luck': 0,
        'end-luck': 0,
        'bad-luck': 0,
        'great-bad-luck': 0,
      },
      averageScore: 0,
      mostFrequent: null,
    };

    if (omikujiList.length === 0) {
      return statistics;
    }

    // カウント計算
    omikujiList.forEach(omikuji => {
      const fortuneValue = omikuji.getFortune().getValue();
      statistics.counts[fortuneValue]++;
    });

    // パーセンテージ計算
    Object.keys(statistics.counts).forEach(key => {
      const fortuneKey = key as keyof typeof statistics.counts;
      statistics.percentages[fortuneKey] = 
        Math.round((statistics.counts[fortuneKey] / statistics.total) * 100);
    });

    // 平均スコア計算
    const totalScore = omikujiList.reduce((sum, omikuji) => {
      return sum + omikuji.getFortune().getScore();
    }, 0);
    statistics.averageScore = Math.round((totalScore / omikujiList.length) * 100) / 100;

    // 最頻値計算
    let maxCount = 0;
    let mostFrequentFortune: string | null = null;
    Object.entries(statistics.counts).forEach(([fortune, count]) => {
      if (count > maxCount) {
        maxCount = count;
        mostFrequentFortune = fortune;
      }
    });
    statistics.mostFrequent = mostFrequentFortune;

    return statistics;
  }

  static isLuckyDay(omikuji: Omikuji): boolean {
    const fortuneScore = omikuji.getFortune().getScore();
    return fortuneScore >= 5; // 小吉以上を幸運とする
  }

  static generateShareText(omikuji: Omikuji): string {
    const fortune = omikuji.getFortune().getDisplayName();
    const luckyColor = omikuji.getLuckyColor();
    const luckyNumber = omikuji.getLuckyNumber();
    
    return `今日のおみくじは「${fortune}」でした！🎋\nラッキーカラー: ${luckyColor}\nラッキーナンバー: ${luckyNumber}\n\n#おみくじ #運勢 #今日の運勢`;
  }
}

export interface FortuneStatistics {
  total: number;
  counts: {
    'great-luck': number;
    'middle-luck': number;
    'small-luck': number;
    'luck': number;
    'end-luck': number;
    'bad-luck': number;
    'great-bad-luck': number;
  };
  percentages: {
    'great-luck': number;
    'middle-luck': number;
    'small-luck': number;
    'luck': number;
    'end-luck': number;
    'bad-luck': number;
    'great-bad-luck': number;
  };
  averageScore: number;
  mostFrequent: string | null;
} 