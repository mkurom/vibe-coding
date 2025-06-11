export class FortuneScore {
  private constructor(private readonly value: number) {}

  static create(value: number): FortuneScore {
    if (!Number.isInteger(value) || value < 1 || value > 5) {
      throw new Error('FortuneScore must be an integer between 1 and 5');
    }
    return new FortuneScore(value);
  }

  static createRandom(): FortuneScore {
    const randomValue = Math.floor(Math.random() * 5) + 1;
    return new FortuneScore(randomValue);
  }

  getValue(): number {
    return this.value;
  }

  getDisplayText(): string {
    switch (this.value) {
      case 5:
        return '大吉';
      case 4:
        return '吉';
      case 3:
        return '中吉';
      case 2:
        return '小吉';
      case 1:
        return '凶';
      default:
        return '不明';
    }
  }

  equals(other: FortuneScore): boolean {
    return this.value === other.value;
  }
} 