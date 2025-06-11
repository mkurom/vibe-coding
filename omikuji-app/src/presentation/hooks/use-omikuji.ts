'use client';

import { useState, useCallback } from 'react';
import { Omikuji } from '../../domain/entities/omikuji';
import { DrawOmikujiUseCase } from '../../application/use-cases/draw-omikuji-use-case';
import { GetOmikujiHistoryUseCase } from '../../application/use-cases/get-omikuji-history-use-case';
import { GetOmikujiStatisticsUseCase } from '../../application/use-cases/get-omikuji-statistics-use-case';
import { LocalOmikujiRepository } from '../../infrastructure/persistence/local-omikuji-repository';
import { FortuneStatistics } from '../../domain/services/omikuji-domain-service';

const repository = new LocalOmikujiRepository();
const drawOmikujiUseCase = new DrawOmikujiUseCase(repository);
const getHistoryUseCase = new GetOmikujiHistoryUseCase(repository);
const getStatisticsUseCase = new GetOmikujiStatisticsUseCase(repository);

export function useOmikuji() {
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentOmikuji, setCurrentOmikuji] = useState<Omikuji | null>(null);
  const [error, setError] = useState<string | null>(null);

  const drawOmikuji = useCallback(async (allowMultiple = false) => {
    setIsDrawing(true);
    setError(null);
    
    try {
      const result = await drawOmikujiUseCase.execute({
        allowMultiplePerDay: allowMultiple,
      });
      
      if (result.success && result.omikuji) {
        setCurrentOmikuji(result.omikuji);
      } else {
        setError(result.error || 'おみくじを引けませんでした。');
      }
    } catch (err) {
      setError('エラーが発生しました。');
    } finally {
      setIsDrawing(false);
    }
  }, []);

  const getHistory = useCallback(async (days = 30): Promise<Omikuji[]> => {
    const result = await getHistoryUseCase.execute({ days });
    if (result.success && result.omikujiList) {
      return result.omikujiList;
    }
    throw new Error(result.error || '履歴の取得に失敗しました。');
  }, []);

  const getStatistics = useCallback(async (days = 30): Promise<FortuneStatistics> => {
    const result = await getStatisticsUseCase.execute({ days });
    if (result.success && result.statistics) {
      return result.statistics;
    }
    throw new Error(result.error || '統計の取得に失敗しました。');
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearCurrentOmikuji = useCallback(() => {
    setCurrentOmikuji(null);
  }, []);

  return {
    isDrawing,
    currentOmikuji,
    error,
    drawOmikuji,
    getHistory,
    getStatistics,
    clearError,
    clearCurrentOmikuji,
  };
} 