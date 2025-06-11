import { OmikujiId } from '../value-objects/omikuji-id';
import { FortuneLevel } from '../value-objects/fortune-level';
import { FortuneScore } from '../value-objects/fortune-score';

export interface OmikujiProps {
  id: OmikujiId;
  date: Date;
  fortune: FortuneLevel;
  generalMessage: string;
  loveScore: FortuneScore;
  workScore: FortuneScore;
  healthScore: FortuneScore;
  moneyScore: FortuneScore;
  luckyColor: string;
  luckyNumber: number;
  advice: string;
}

export class Omikuji {
  private constructor(private readonly props: OmikujiProps) {}

  static create(props: Omit<OmikujiProps, 'id' | 'date'>): Omikuji {
    return new Omikuji({
      ...props,
      id: OmikujiId.create(),
      date: new Date(),
    });
  }

  static reconstruct(props: OmikujiProps): Omikuji {
    return new Omikuji(props);
  }

  static createRandom(): Omikuji {
    const fortune = FortuneLevel.createRandom();
    const loveScore = FortuneScore.createRandom();
    const workScore = FortuneScore.createRandom();
    const healthScore = FortuneScore.createRandom();
    const moneyScore = FortuneScore.createRandom();

    const luckyColors = ['赤', '青', '緑', '黄', '紫', '白', '黒', '金', '銀'];
    const luckyColor = luckyColors[Math.floor(Math.random() * luckyColors.length)];
    const luckyNumber = Math.floor(Math.random() * 100) + 1;

    return new Omikuji({
      id: OmikujiId.create(),
      date: new Date(),
      fortune,
      generalMessage: Omikuji.generateGeneralMessage(fortune),
      loveScore,
      workScore,
      healthScore,
      moneyScore,
      luckyColor,
      luckyNumber,
      advice: Omikuji.generateAdvice(fortune),
    });
  }

  private static generateGeneralMessage(fortune: FortuneLevel): string {
    const messages = {
      'great-luck': [
        '今日は最高の一日になりそうです！何事にも積極的に取り組んでください。',
        '運気は絶好調！新しいことにチャレンジする絶好のタイミングです。',
        '素晴らしい一日の始まりです。周りの人にも幸せを分けてあげましょう。'
      ],
      'middle-luck': [
        '安定した運気に恵まれています。着実に進歩していきましょう。',
        '良い流れが続いています。計画していたことを実行に移すときです。',
        '穏やかで充実した一日になりそうです。'
      ],
      'small-luck': [
        '小さな幸せが見つかる日です。周りに感謝の気持ちを忘れずに。',
        '控えめながらも良い運気です。謙虚な姿勢を大切にしましょう。',
        '身近なところに喜びが隠れています。'
      ],
      'luck': [
        '普通の運気ですが、努力次第で良い結果が得られます。',
        '平凡な一日ですが、それこそが大切な時間です。',
        '安定した日常に感謝しましょう。'
      ],
      'end-luck': [
        'ゆっくりとした運気です。焦らず着実に歩みを進めましょう。',
        '今は準備の時期。将来への投資だと思って過ごしてください。',
        '静かな時間を大切にしましょう。'
      ],
      'bad-luck': [
        '少し注意が必要な日です。慎重に行動しましょう。',
        '困難があっても諦めずに。必ず道は開けます。',
        '今日は控えめに過ごすのが吉です。'
      ],
      'great-bad-luck': [
        '今日は無理をしない日です。ゆっくり休息を取りましょう。',
        '困難な時こそ成長のチャンス。前向きに捉えてください。',
        '嵐の前の静けさ。必ず明るい日が来ます。'
      ]
    };

    const fortuneMessages = messages[fortune.getValue()];
    return fortuneMessages[Math.floor(Math.random() * fortuneMessages.length)];
  }

  private static generateAdvice(fortune: FortuneLevel): string {
    const advices = {
      'great-luck': [
        '積極的に行動し、チャンスを掴みましょう。',
        '周りの人に優しさを分けてあげてください。',
        '新しいことに挑戦する絶好の機会です。'
      ],
      'middle-luck': [
        '計画を立てて着実に実行しましょう。',
        '人との繋がりを大切にしてください。',
        '継続は力なり。コツコツと努力しましょう。'
      ],
      'small-luck': [
        '小さなことに感謝の気持ちを持ちましょう。',
        '周りをよく観察してみてください。',
        '謙虚な姿勢を心がけましょう。'
      ],
      'luck': [
        '普段通りの生活を大切にしましょう。',
        '健康管理に気を配ってください。',
        '当たり前のことに感謝しましょう。'
      ],
      'end-luck': [
        '焦らずゆっくりと進みましょう。',
        '準備に時間をかけることが大切です。',
        '内面を磨く時間にしましょう。'
      ],
      'bad-luck': [
        '慎重に行動し、リスクを避けましょう。',
        '今日は早めに休息を取ってください。',
        '困った時は人に相談しましょう。'
      ],
      'great-bad-luck': [
        '今日は無理をせず、体を休めましょう。',
        '明日への準備をゆっくりとしてください。',
        '困難も一時的なものです。諦めないでください。'
      ]
    };

    const fortuneAdvices = advices[fortune.getValue()];
    return fortuneAdvices[Math.floor(Math.random() * fortuneAdvices.length)];
  }

  // Getters
  getId(): OmikujiId {
    return this.props.id;
  }

  getDate(): Date {
    return this.props.date;
  }

  getFortune(): FortuneLevel {
    return this.props.fortune;
  }

  getGeneralMessage(): string {
    return this.props.generalMessage;
  }

  getLoveScore(): FortuneScore {
    return this.props.loveScore;
  }

  getWorkScore(): FortuneScore {
    return this.props.workScore;
  }

  getHealthScore(): FortuneScore {
    return this.props.healthScore;
  }

  getMoneyScore(): FortuneScore {
    return this.props.moneyScore;
  }

  getLuckyColor(): string {
    return this.props.luckyColor;
  }

  getLuckyNumber(): number {
    return this.props.luckyNumber;
  }

  getAdvice(): string {
    return this.props.advice;
  }

  // Methods
  isToday(): boolean {
    const today = new Date();
    return (
      this.props.date.getFullYear() === today.getFullYear() &&
      this.props.date.getMonth() === today.getMonth() &&
      this.props.date.getDate() === today.getDate()
    );
  }

  toJSON() {
    return {
      id: this.props.id.getValue(),
      date: this.props.date.toISOString(),
      fortune: this.props.fortune.getValue(),
      generalMessage: this.props.generalMessage,
      loveScore: this.props.loveScore.getValue(),
      workScore: this.props.workScore.getValue(),
      healthScore: this.props.healthScore.getValue(),
      moneyScore: this.props.moneyScore.getValue(),
      luckyColor: this.props.luckyColor,
      luckyNumber: this.props.luckyNumber,
      advice: this.props.advice,
    };
  }
} 