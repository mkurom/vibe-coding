export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          Hello World
        </h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Next.js App Routerで作成されたシンプルなHello Worldアプリケーションです。
        </p>
        <div className="flex justify-center space-x-4 mt-8">
          <div className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md">
            React
          </div>
          <div className="px-4 py-2 bg-black text-white rounded-lg shadow-md">
            Next.js
          </div>
          <div className="px-4 py-2 bg-blue-400 text-white rounded-lg shadow-md">
            TypeScript
          </div>
          <div className="px-4 py-2 bg-teal-500 text-white rounded-lg shadow-md">
            Tailwind CSS
          </div>
        </div>
      </div>
    </main>
  )
} 