import { OmikujiRepository } from '../../domain/repositories/omikuji-repository';
import { Omikuji } from '../../domain/entities/omikuji';

export interface GetOmikujiHistoryCommand {
  days?: number;
}

export interface GetOmikujiHistoryResult {
  success: boolean;
  omikujiList?: Omikuji[];
  error?: string;
}

export class GetOmikujiHistoryUseCase {
  constructor(private readonly omikujiRepository: OmikujiRepository) {}

  async execute(command: GetOmikujiHistoryCommand = {}): Promise<GetOmikujiHistoryResult> {
    try {
      const days = command.days || 30; // デフォルト30日
      const omikujiList = await this.omikujiRepository.findRecent(days);
      
      return {
        success: true,
        omikujiList,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '履歴の取得中にエラーが発生しました。',
      };
    }
  }
} 