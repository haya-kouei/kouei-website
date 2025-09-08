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

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">販売事業</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            世界各国での商品販売とグローバルネットワークを活用した事業展開
          </p>
        </div>

        <section className="mb-16">
          <div className="bg-gray-50 p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">事業概要</h2>
            <p className="text-gray-700 leading-relaxed mb-6 text-lg">
              恒栄トレーディング株式会社は、グローバル市場において多様な商品の販売事業を展開しています。
              アジア太平洋地域を中心に、中東、南アジアなど幅広い地域で事業を行っており、
              各地域の特性に合わせた最適なソリューションを提供しています。
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              特に東南アジア地域においては、ベトナムを筆頭に366社との取引実績を誇り、
              現地のニーズに深く根ざした事業展開を行っています。
            </p>
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
                          <img 
                            src={country.flag} 
                            alt={`${country.name}の国旗`}
                            className="w-16 h-12 object-cover rounded border shadow-sm"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/flags/placeholder.png'
                            }}
                          />
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

        <section className="py-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-white/95 backdrop-blur-sm max-w-md mx-auto p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold text-cyan-600 mb-4">お問い合わせ</h3>
              <p className="text-gray-700 mb-6">各地域での事業展開や取引に関するご相談は、お気軽にお問い合わせください。</p>
              <Link 
                href="/contact" 
                className="btn-primary inline-block px-8 py-3 rounded-lg font-semibold transition-all hover:scale-105"
              >
                お問い合わせフォーム
              </Link>
            </div>
          </div>
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
                <li>Kouei Vietnam Trading</li>
                <li>Kouei Myanmar Branch</li>
                <li>Kouei Bangladesh Office</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 text-cyan-400">お問い合わせ</h4>
              <div className="text-gray-300 text-sm space-y-1">
                <p>TEL: 03-3803-7871</p>
                <p>Email: info@kjt.co.jp</p>
                <p>平日 9:00-18:00</p>
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