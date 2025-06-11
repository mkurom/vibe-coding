import { Omikuji } from '../entities/omikuji';
import { OmikujiId } from '../value-objects/omikuji-id';

export interface OmikujiRepository {
  save(omikuji: Omikuji): Promise<void>;
  findById(id: OmikujiId): Promise<Omikuji | null>;
  findAll(): Promise<Omikuji[]>;
  findRecent(days: number): Promise<Omikuji[]>;
  findByDate(date: Date): Promise<Omikuji[]>;
  delete(id: OmikujiId): Promise<void>;
  deleteOlderThan(days: number): Promise<void>;
} 