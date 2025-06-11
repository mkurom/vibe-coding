import { OmikujiRepository } from '../../domain/repositories/omikuji-repository';
import { OmikujiDomainService, FortuneStatistics } from '../../domain/services/omikuji-domain-service';

export interface GetOmikujiStatisticsCommand {
  days?: number;
}

export interface GetOmikujiStatisticsResult {
  success: boolean;
  statistics?: FortuneStatistics;
  error?: string;
}

export class GetOmikujiStatisticsUseCase {
  constructor(private readonly omikujiRepository: OmikujiRepository) {}

  async execute(command: GetOmikujiStatisticsCommand = {}): Promise<GetOmikujiStatisticsResult> {
    try {
      const days = command.days || 30; // デフォルト30日
      const omikujiList = await this.omikujiRepository.findRecent(days);
      const statistics = OmikujiDomainService.calculateStatistics(omikujiList);
      
      return {
        success: true,
        statistics,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : '統計の取得中にエラーが発生しました。',
      };
    }
  }
} 