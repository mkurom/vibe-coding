import { OmikujiRepository } from '../../domain/repositories/omikuji-repository';
import { Omikuji } from '../../domain/entities/omikuji';
import { OmikujiDomainService } from '../../domain/services/omikuji-domain-service';

export interface DrawOmikujiCommand {
  allowMultiplePerDay?: boolean;
}

export interface DrawOmikujiResult {
  success: boolean;
  omikuji?: Omikuji;
  error?: string;
}

export class DrawOmikujiUseCase {
  constructor(private readonly omikujiRepository: OmikujiRepository) {}

  async execute(command: DrawOmikujiCommand = {}): Promise<DrawOmikujiResult> {
    try {
      // 今日のおみくじをチェック
      if (!command.allowMultiplePerDay) {
        const today = new Date();
        const todaysOmikuji = await this.omikujiRepository.findByDate(today);
        
        if (!OmikujiDomainService.canDrawOmikujiToday(todaysOmikuji)) {
          return {
            success: false,
            error: '今日はすでにおみくじを引いています。明日また来てください。',
          };
        }
      }

      // 新しいおみくじを生成
      const omikuji = Omikuji.createRandom();
      
      // 保存
      await this.omikujiRepository.save(omikuji);
      
      return {
        success: true,
        omikuji,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'おみくじを引く際にエラーが発生しました。',
      };
    }
  }
} 