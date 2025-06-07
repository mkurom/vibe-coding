import { Counter } from "@/components/counter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            カウンターアプリ
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            シンプルで美しいカウンターアプリケーション
          </p>
        </div>
        
        <Counter />
        
        <div className="text-center mt-8 text-sm text-slate-500 dark:text-slate-400">
          <p>Next.js + TypeScript + Tailwind CSS + Shadcn UI で作成</p>
        </div>
      </div>
    </div>
  );
}
