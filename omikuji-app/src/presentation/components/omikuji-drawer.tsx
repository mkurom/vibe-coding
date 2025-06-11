'use client';

import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { useOmikuji } from '../hooks/use-omikuji';

interface OmikujiDrawerProps {
  onOmikujiDrawn?: () => void;
}

export function OmikujiDrawer({ onOmikujiDrawn }: OmikujiDrawerProps) {
  const { isDrawing, error, drawOmikuji, clearError } = useOmikuji();

  const handleDraw = async () => {
    await drawOmikuji();
    onOmikujiDrawn?.();
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <motion.div
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        <div className="w-32 h-48 bg-gradient-to-b from-red-600 to-red-800 rounded-lg shadow-lg flex items-center justify-center">
          <div className="text-white text-xl font-bold">おみくじ</div>
        </div>
      </motion.div>

      <Button
        onClick={handleDraw}
        disabled={isDrawing}
        size="lg"
        className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg"
      >
        {isDrawing ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
          />
        ) : (
          'おみくじを引く'
        )}
      </Button>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md"
        >
          <span className="block sm:inline">{error}</span>
          <button
            onClick={clearError}
            className="absolute top-0 bottom-0 right-0 px-4 py-3"
          >
            <span className="sr-only">Dismiss</span>
            ×
          </button>
        </motion.div>
      )}
    </div>
  );
} 