import { OmikujiRepository } from '../../domain/repositories/omikuji-repository';
import { Omikuji } from '../../domain/entities/omikuji';
import { OmikujiId } from '../../domain/value-objects/omikuji-id';
import { FortuneLevel } from '../../domain/value-objects/fortune-level';
import { FortuneScore } from '../../domain/value-objects/fortune-score';
import { LocalStorageService } from '../storage/local-storage-service';

const STORAGE_KEY = 'omikuji-history';
const MAX_STORAGE_DAYS = 30;

interface StoredOmikuji {
  id: string;
  date: string;
  fortune: string;
  generalMessage: string;
  loveScore: number;
  workScore: number;
  healthScore: number;
  moneyScore: number;
  luckyColor: string;
  luckyNumber: number;
  advice: string;
}

export class LocalOmikujiRepository implements OmikujiRepository {
  async save(omikuji: Omikuji): Promise<void> {
    const stored = this.loadStoredOmikuji();
    const serialized = this.serializeOmikuji(omikuji);
    
    // 既存のエントリがあれば更新、なければ追加
    const existingIndex = stored.findIndex(item => item.id === serialized.id);
    if (existingIndex >= 0) {
      stored[existingIndex] = serialized;
    } else {
      stored.push(serialized);
    }
    
    // 古いデータを削除
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - MAX_STORAGE_DAYS);
    const filtered = stored.filter(item => new Date(item.date) >= cutoffDate);
    
    LocalStorageService.setItem(STORAGE_KEY, filtered);
  }

  async findById(id: OmikujiId): Promise<Omikuji | null> {
    const stored = this.loadStoredOmikuji();
    const found = stored.find(item => item.id === id.getValue());
    
    if (!found) {
      return null;
    }
    
    return this.deserializeOmikuji(found);
  }

  async findAll(): Promise<Omikuji[]> {
    const stored = this.loadStoredOmikuji();
    return stored.map(item => this.deserializeOmikuji(item));
  }

  async findRecent(days: number): Promise<Omikuji[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const stored = this.loadStoredOmikuji();
    const recent = stored.filter(item => new Date(item.date) >= cutoffDate);
    
    return recent
      .map(item => this.deserializeOmikuji(item))
      .sort((a, b) => b.getDate().getTime() - a.getDate().getTime());
  }

  async findByDate(date: Date): Promise<Omikuji[]> {
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    const nextDay = new Date(targetDate);
    nextDay.setDate(nextDay.getDate() + 1);
    
    const stored = this.loadStoredOmikuji();
    const filtered = stored.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= targetDate && itemDate < nextDay;
    });
    
    return filtered.map(item => this.deserializeOmikuji(item));
  }

  async delete(id: OmikujiId): Promise<void> {
    const stored = this.loadStoredOmikuji();
    const filtered = stored.filter(item => item.id !== id.getValue());
    LocalStorageService.setItem(STORAGE_KEY, filtered);
  }

  async deleteOlderThan(days: number): Promise<void> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    const stored = this.loadStoredOmikuji();
    const filtered = stored.filter(item => new Date(item.date) >= cutoffDate);
    
    LocalStorageService.setItem(STORAGE_KEY, filtered);
  }

  private loadStoredOmikuji(): StoredOmikuji[] {
    return LocalStorageService.getItem<StoredOmikuji[]>(STORAGE_KEY) || [];
  }

  private serializeOmikuji(omikuji: Omikuji): StoredOmikuji {
    return {
      id: omikuji.getId().getValue(),
      date: omikuji.getDate().toISOString(),
      fortune: omikuji.getFortune().getValue(),
      generalMessage: omikuji.getGeneralMessage(),
      loveScore: omikuji.getLoveScore().getValue(),
      workScore: omikuji.getWorkScore().getValue(),
      healthScore: omikuji.getHealthScore().getValue(),
      moneyScore: omikuji.getMoneyScore().getValue(),
      luckyColor: omikuji.getLuckyColor(),
      luckyNumber: omikuji.getLuckyNumber(),
      advice: omikuji.getAdvice(),
    };
  }

  private deserializeOmikuji(stored: StoredOmikuji): Omikuji {
    return Omikuji.reconstruct({
      id: OmikujiId.create(stored.id),
      date: new Date(stored.date),
      fortune: FortuneLevel.create(stored.fortune as any),
      generalMessage: stored.generalMessage,
      loveScore: FortuneScore.create(stored.loveScore),
      workScore: FortuneScore.create(stored.workScore),
      healthScore: FortuneScore.create(stored.healthScore),
      moneyScore: FortuneScore.create(stored.moneyScore),
      luckyColor: stored.luckyColor,
      luckyNumber: stored.luckyNumber,
      advice: stored.advice,
    });
  }
} 