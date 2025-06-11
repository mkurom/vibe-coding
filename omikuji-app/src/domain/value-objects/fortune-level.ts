export const FORTUNE_LEVELS = {
  GREAT_LUCK: 'great-luck',
  MIDDLE_LUCK: 'middle-luck', 
  SMALL_LUCK: 'small-luck',
  LUCK: 'luck',
  END_LUCK: 'end-luck',
  BAD_LUCK: 'bad-luck',
  GREAT_BAD_LUCK: 'great-bad-luck'
} as const;

export type FortuneLevelValue = typeof FORTUNE_LEVELS[keyof typeof FORTUNE_LEVELS];

export class FortuneLevel {
  private constructor(private readonly value: FortuneLevelValue) {}

  static create(value: FortuneLevelValue): FortuneLevel {
    if (!Object.values(FORTUNE_LEVELS).includes(value)) {
      throw new Error(`Invalid fortune level: ${value}`);
    }
    return new FortuneLevel(value);
  }

  static createRandom(): FortuneLevel {
    const levels = Object.values(FORTUNE_LEVELS);
    const randomIndex = Math.floor(Math.random() * levels.length);
    return new FortuneLevel(levels[randomIndex]);
  }

  getValue(): FortuneLevelValue {
    return this.value;
  }

  getDisplayName(): string {
    switch (this.value) {
      case FORTUNE_LEVELS.GREAT_LUCK:
        return '大吉';
      case FORTUNE_LEVELS.MIDDLE_LUCK:
        return '中吉';
      case FORTUNE_LEVELS.SMALL_LUCK:
        return '小吉';
      case FORTUNE_LEVELS.LUCK:
        return '吉';
      case FORTUNE_LEVELS.END_LUCK:
        return '末吉';
      case FORTUNE_LEVELS.BAD_LUCK:
        return '凶';
      case FORTUNE_LEVELS.GREAT_BAD_LUCK:
        return '大凶';
      default:
        throw new Error(`Unknown fortune level: ${this.value}`);
    }
  }

  getScore(): number {
    switch (this.value) {
      case FORTUNE_LEVELS.GREAT_LUCK:
        return 7;
      case FORTUNE_LEVELS.MIDDLE_LUCK:
        return 6;
      case FORTUNE_LEVELS.SMALL_LUCK:
        return 5;
      case FORTUNE_LEVELS.LUCK:
        return 4;
      case FORTUNE_LEVELS.END_LUCK:
        return 3;
      case FORTUNE_LEVELS.BAD_LUCK:
        return 2;
      case FORTUNE_LEVELS.GREAT_BAD_LUCK:
        return 1;
      default:
        return 0;
    }
  }

  equals(other: FortuneLevel): boolean {
    return this.value === other.value;
  }
} 