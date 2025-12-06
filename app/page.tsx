import Link from 'next/link'
import { getTopics, getSalesCountries, getOverseasSales } from '@/lib/content-loader'
import OrganizationChat from '@/components/OrganizationChat'

export default async function Home() {
  const topics = await getTopics()
  const salesData = await getSalesCountries()
  const overseasSales = await getOverseasSales()
  
  // 統計データの計算
  const totalCompanies = salesData.reduce((total, region) => 
    total + region.countries.reduce((regionTotal, country) => 
      regionTotal + country.companies, 0
    ), 0
  )
  const totalCountries = salesData.reduce((total, region) => total + region.countries.length, 0)
  
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-gray-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="brand-logo text-3xl">KOUEI</div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/sales" className="text-gray-700 hover:text-cyan-500 font-medium transition-colors">販売事業</Link>
              <Link href="/manufacturers" className="text-gray-700 hover:text-cyan-500 font-medium transition-colors">取扱メーカー</Link>
              <Link href="/about" className="text-gray-700 hover:text-cyan-500 font-medium transition-colors">会社概要</Link>
              <Link href="/contact" className="text-gray-700 hover:text-cyan-500 font-medium transition-colors">お問い合わせ</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* メインビジュアル - グローバルマップスタイル */}
      <section className="global-map-bg min-h-[70vh] flex items-center justify-center relative">
        <div className="container mx-auto px-4 text-center z-10">
          <h1 className="text-5xl md:text-6xl font-light text-gray-800 mb-8 leading-tight">
            KOUEI は鉄鋼製品・機械工具・設備の商社です。
          </h1>
          <h2 className="text-2xl md:text-3xl font-light text-cyan-500 mb-12">
            グローバル調達と販売を通じて世界の発展に貢献します。
          </h2>
          
          {/* 統計カード - オリジナル風 */}
          <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg country-card">
              <div className="stat-number">{totalCompanies}</div>
              <p className="text-gray-600 font-medium">取引企業数</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg country-card">
              <div className="stat-number">{totalCountries}</div>
              <p className="text-gray-600 font-medium">展開国数</p>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-lg country-card">
              <div className="stat-number">30+</div>
              <p className="text-gray-600 font-medium">年の実績</p>
            </div>
          </div>
        </div>
        
        {/* グローバル接続線エフェクト */}
        <div className="absolute inset-0 connection-lines pointer-events-none"></div>
      </section>

      {/* 企業ビジョン */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-12">
            <h3 className="text-sm font-medium text-cyan-500 mb-4 tracking-wider">Vision</h3>
            <p className="text-2xl md:text-3xl text-gray-800 font-light mb-8">
              アジアの製造現場において、最も役に立つ商社となる。
            </p>
            <h3 className="text-sm font-medium text-cyan-500 mb-4 tracking-wider">Mission</h3>
            <p className="text-2xl md:text-3xl text-gray-800 font-light">
              高品質な製品を提供し、アジアの発展に貢献する。
            </p>
          </div>
        </div>
      </section>

      {/* 会社情報 */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            株式会社恒栄トレーディング (Kouei Japan Trading Co., Ltd.)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                KOUEI は鉄鋼製品、工場向け機械工具、プラント向け設備機器、建設土木向け機材を販売している商社です。
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                日本・ベトナム・ミャンマーの拠点で連携し、世界各国で営業活動を行なっています。
              </p>
            </div>
            
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-6">弊社の強み</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>各国の工場様・プラント・土木向け販売実績から、様々な製品・高品質製品・安価製品のデータを蓄積しています。求められるご要望に最適な製品を提案します。</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>特に鉄鋼製品の海外調達、製造管理を得意としています。海外工場選定、材料選定、製造方法、JIS規格相当の試験を徹底し、高品質で安価な製品を提案します。</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>海外拠点による海外調達・海外営業マーケティングで豊富な実績があります。日本メーカー様と協力し、販売代理店として製品をPR・拡販します。</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-cyan-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>組織全体の9割以上が現地のスタッフです。海外の製造工場・顧客ユーザーに完全にコミットした体制をとっています。</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 海外販売先 */}
      {overseasSales && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-1">{overseasSales.header.title}</h2>
              <p className="text-sm text-gray-600">{overseasSales.header.subtitle}</p>
            </div>
            
            <div className="space-y-8">
              {overseasSales.regions.map((region, regionIndex) => (
                <div key={regionIndex}>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">{region.name}</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                    {region.countries.map((country, countryIndex) => (
                      <div key={countryIndex} className="flex items-center bg-gray-50 p-3 rounded">
                        <span className="text-2xl mr-3">{country.flag}</span>
                        <div className="flex-1">
                          <div className="flex items-baseline">
                            <span className="text-gray-700 text-sm font-medium mr-2">{country.name}</span>
                            <div className="flex items-baseline ml-auto">
                              <span className="text-2xl font-bold text-gray-900">{country.companies}</span>
                              <span className="text-gray-600 text-xs ml-0.5">社</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* トピックス */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12">トピックス</h2>
          
          <div className="space-y-6">
            {topics.slice(0, 6).map((topic, index) => (
              <div key={topic.id} className="flex items-start space-x-6 py-4 border-b border-gray-200">
                <span className="text-gray-500 font-medium whitespace-nowrap">
                  {new Date(topic.date).toLocaleDateString('ja-JP', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')}
                </span>
                <p className="text-lg text-gray-800">{topic.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Request CTA */}
      <section className="py-16 bg-gradient-to-r from-cyan-500 to-cyan-600">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white/95 backdrop-blur-sm max-w-md mx-auto p-8 rounded-lg shadow-xl">
            <h3 className="text-2xl font-bold text-cyan-600 mb-4">Request Quotation</h3>
            <p className="text-gray-700 mb-6">English Support Available</p>
            <Link 
              href="/contact" 
              className="btn-primary inline-block px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </section>

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

      {/* 組織案内AIチャット */}
      <OrganizationChat />
    </div>
  )
}