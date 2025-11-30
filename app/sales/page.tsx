import Link from 'next/link'
import { getSalesCountries } from '@/lib/content-loader'

export default async function SalesPage() {
  const salesData = await getSalesCountries()
  
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-gray-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="brand-logo text-3xl">KOUEI</Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/sales" className="text-cyan-500 hover:text-cyan-500 font-medium transition-colors">販売事業</Link>
              <Link href="/manufacturers" className="text-gray-700 hover:text-cyan-500 font-medium transition-colors">取扱メーカー</Link>
              <Link href="/about" className="text-gray-700 hover:text-cyan-500 font-medium transition-colors">会社概要</Link>
              <Link href="/contact" className="text-gray-700 hover:text-cyan-500 font-medium transition-colors">お問い合わせ</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ヘッダー画像 */}
      <div className="h-48 bg-gradient-to-r from-cyan-100 to-cyan-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <h1 className="text-4xl font-bold text-gray-800">販売事業</h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* 事業部門メニュー */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* 日本国内販売 */}
          <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">日本国内販売</h3>
              <p className="text-blue-100 text-sm">国内製造業向け製品・機器の販売</p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">日本の製造業向けに高品質な工具・機械・設備を提供しています。</p>
              <Link href="#domestic" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                詳細を見る
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ベトナム事業 */}
          <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-green-500 to-green-600 p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">ベトナム事業</h3>
              <p className="text-green-100 text-sm">ベトナム製造業への製品供給</p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">ベトナムの急成長する製造業市場での事業展開を行っています。</p>
              <Link href="#vietnam" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium">
                詳細を見る
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* ミャンマー事業 */}
          <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">ミャンマー事業</h3>
              <p className="text-purple-100 text-sm">ミャンマー市場での事業展開</p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">ミャンマーの新興市場において戦略的な事業展開を図っています。</p>
              <Link href="#myanmar" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium">
                詳細を見る
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* 海外プロジェクト向け輸出 */}
          <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">海外プロジェクト向け輸出</h3>
              <p className="text-orange-100 text-sm">大型プロジェクト向け機器輸出</p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">海外の大型インフラ・プラントプロジェクト向け機器を供給しています。</p>
              <Link href="#projects" className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium">
                詳細を見る
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* 海外工場向け輸出 */}
          <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">海外工場向け輸出</h3>
              <p className="text-teal-100 text-sm">製造業向け機械工具の輸出</p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">海外製造拠点向けに最適な機械工具・設備を提供しています。</p>
              <Link href="#factory-export" className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium">
                詳細を見る
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* 輸出入実績 */}
          <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">輸出入実績</h3>
              <p className="text-indigo-100 text-sm">取引実績と統計データ</p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">豊富な取引実績と統計データをご紹介します。</p>
              <Link href="#track-record" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium">
                詳細を見る
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* 海外取引支援 */}
          <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 md:col-span-2 lg:col-span-1">
            <div className="bg-gradient-to-br from-red-500 to-red-600 p-6">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">海外取引支援</h3>
              <p className="text-red-100 text-sm">グローバル取引のトータルサポート</p>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">海外取引における様々な課題をトータルでサポートします。</p>
              <Link href="#support" className="inline-flex items-center text-red-600 hover:text-red-700 font-medium">
                詳細を見る
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* 事業概要セクション */}
        <section className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">事業概要</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">主力商品</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                  鉄鋼製品・金属加工品
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                  機械工具・切削工具
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                  測定機器・検査機器
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                  産業設備・プラント機器
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                  安全用品・環境機器
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">サービス内容</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                  製品調達・品質管理
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                  物流・通関手続き
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                  アフターサービス
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                  技術コンサルティング
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></span>
                  市場調査・マーケティング支援
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">地域別販売実績</h2>
          <div className="space-y-8">
            {salesData.map((region, regionIndex) => (
              <div key={regionIndex} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
                <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 px-8 py-6">
                  <h3 className="text-2xl font-semibold text-white">{region.region}</h3>
                </div>
                <div className="p-8">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {region.countries.map((country, countryIndex) => (
                      <div key={countryIndex} className="country-card bg-white p-6 rounded-lg border transition-all hover:shadow-lg">
                        <div className="flex items-center space-x-4 mb-4">
                          <div className="text-5xl">
                            {country.flag}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-800">{country.name}</h4>
                            <div className="stat-number text-2xl">
                              {country.companies}
                            </div>
                            <p className="text-sm text-gray-600">取引企業数</p>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{country.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">取引実績サマリー</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg country-card text-center">
              <div className="stat-number">
                {salesData.reduce((total, region) => 
                  total + region.countries.reduce((regionTotal, country) => 
                    regionTotal + country.companies, 0
                  ), 0
                )}
              </div>
              <p className="text-gray-600 font-medium">総取引企業数</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg country-card text-center">
              <div className="stat-number">
                {salesData.reduce((total, region) => total + region.countries.length, 0)}
              </div>
              <p className="text-gray-600 font-medium">展開国数</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg country-card text-center">
              <div className="stat-number">{salesData.length}</div>
              <p className="text-gray-600 font-medium">主要地域</p>
            </div>
            
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg country-card text-center">
              <div className="stat-number">30+</div>
              <p className="text-gray-600 font-medium">年の実績</p>
            </div>
          </div>
        </section>

        {/* CTA セクション */}
        <section className="text-center bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">お見積りのご依頼</h2>
          <p className="text-xl mb-8 text-cyan-100">製品・サービスに関するお問い合わせはお気軽にどうぞ</p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-cyan-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
          >
            お問い合わせフォーム
          </Link>
        </section>
      </main>

      {/* フッター */}
      <footer className="footer-bg text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="brand-logo text-2xl text-cyan-400 mb-4">KOUEI</div>
              <p className="text-gray-300 text-sm leading-relaxed">
                株式会社恒栄トレーディング<br />
                グローバルな商品取引を通じて<br />
                世界の発展に貢献
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-cyan-400">事業内容</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><Link href="/sales" className="hover:text-cyan-400 transition-colors">販売事業</Link></li>
                <li><Link href="/manufacturers" className="hover:text-cyan-400 transition-colors">取扱メーカー</Link></li>
                <li>鉄鋼製品・機械工具</li>
                <li>設備・プラント機器</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-cyan-400">グローバルオフィス</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>日本本社</li>
                <li>ベトナム拠点</li>
                <li>ミャンマー拠点</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-cyan-400">お問い合わせ</h4>
              <div className="text-gray-300 text-sm space-y-1">
                <p>Email: kouei.contact@kjt.co.jp</p>
                <Link href="/contact" className="inline-block mt-3 text-cyan-400 hover:text-cyan-300 transition-colors">
                  お問い合わせフォーム →
                </Link>
              </div>
            </div>
          </div>
          
          <hr className="border-gray-600 mb-6" />
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2024 株式会社恒栄トレーディング All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}