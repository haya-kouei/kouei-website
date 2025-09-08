import Link from 'next/link'
import { getManufacturers } from '@/lib/content-loader'

export default async function ManufacturersPage() {
  const manufacturers = await getManufacturers()
  
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-600 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold hover:text-blue-200">
              恒栄トレーディング株式会社
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/sales" className="hover:text-blue-200">販売事業</Link>
              <Link href="/manufacturers" className="text-blue-200 font-semibold">取扱メーカー</Link>
              <Link href="/about" className="hover:text-blue-200">会社概要</Link>
              <Link href="/contact" className="hover:text-blue-200">お問い合わせ</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">取扱メーカー</h1>
          <p className="text-lg text-gray-600">
            信頼できるパートナーメーカーとの長期的な協力関係を構築しています
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">パートナーシップ方針</h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-700 leading-relaxed mb-4">
              恒栄トレーディングは、品質、信頼性、革新性を重視したメーカーパートナーとの
              長期的な関係構築に取り組んでいます。
            </p>
            <p className="text-gray-700 leading-relaxed">
              各メーカーの専門性と技術力を活かし、グローバル市場での競争力向上を
              共同で推進しています。
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">主要パートナーメーカー</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {manufacturers.map((manufacturer, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img 
                          src={manufacturer.logo} 
                          alt={`${manufacturer.name}のロゴ`}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            (e.target as HTMLImageElement).nextElementSibling!.textContent = manufacturer.name.charAt(0);
                          }}
                        />
                        <span className="text-2xl font-bold text-gray-400 hidden">
                          {manufacturer.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{manufacturer.name}</h3>
                        <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                          {manufacturer.category}
                        </span>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      設立: {manufacturer.established}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{manufacturer.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">主要製品</h4>
                    <div className="flex flex-wrap gap-2">
                      {manufacturer.products.map((product, productIndex) => (
                        <span 
                          key={productIndex} 
                          className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {manufacturer.website && (
                    <a 
                      href={manufacturer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      公式ウェブサイト →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">取扱分野</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">機械・産業設備</h3>
              <p className="text-blue-700 text-sm">
                精密機械、自動車部品、産業機械など高品質な機械製品を取り扱っています。
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 mb-3">電子・技術製品</h3>
              <p className="text-green-700 text-sm">
                最先端の電子部品、半導体、センサー類など技術革新をリードする製品群。
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 mb-3">化学・材料</h3>
              <p className="text-purple-700 text-sm">
                環境に配慮した化学製品、特殊材料、コーティング剤など多様な材料製品。
              </p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">品質保証</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">品質管理システム</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>ISO 9001:2015認証取得</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>厳格な品質検査プロセス</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span>継続的な品質改善活動</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">パートナー選定基準</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span>技術力・製品品質</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span>環境・社会への責任</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    <span>長期的な信頼関係</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">パートナー募集</h2>
          <p className="text-gray-700 mb-6">
            私たちと共にグローバル市場での成長を目指すメーカーパートナーを募集しています。
            品質と革新性を重視した製品をお持ちの企業様は、ぜひご相談ください。
          </p>
          <Link 
            href="/contact" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-block"
          >
            パートナー申請・お問い合わせ
          </Link>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 恒栄トレーディング株式会社 All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}