import Link from 'next/link'
import { getOrganization } from '@/lib/content-loader'

export default async function BangladeshPage() {
  const bangladesh = await getOrganization('bangladesh')
  
  if (!bangladesh) {
    return <div>組織情報が見つかりません</div>
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-gray-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="brand-logo text-3xl">KOUEI</Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/sales" className="text-gray-700 hover:text-cyan-500 font-medium transition-colors">販売事業</Link>
              <Link href="/manufacturers" className="text-gray-700 hover:text-cyan-500 font-medium transition-colors">取扱メーカー</Link>
              <Link href="/about" className="text-gray-700 hover:text-cyan-500 font-medium transition-colors">会社概要</Link>
              <Link href="/contact" className="text-gray-700 hover:text-cyan-500 font-medium transition-colors">お問い合わせ</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ヘッダー画像 */}
      <div className="h-48 bg-gradient-to-r from-orange-100 to-orange-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{bangladesh.name}</h1>
            <p className="text-lg text-gray-700">{bangladesh.name_en}</p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* 企業概要セクション */}
        <section className="mb-12">
          <div className="bg-orange-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">企業概要</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {bangladesh.description}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-orange-600 mb-2">設立</h3>
                <p className="text-gray-800 text-lg font-semibold">{bangladesh.overview.established}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-orange-600 mb-2">代表者</h3>
                <p className="text-gray-800 text-lg font-semibold">{bangladesh.overview.representative}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-orange-600 mb-2">資本金</h3>
                <p className="text-gray-800 text-lg font-semibold">{bangladesh.overview.capital}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 業務内容セクション */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">業務内容</h2>
          <div className="grid gap-6">
            {bangladesh.business_activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
                  <h3 className="text-xl font-bold text-white">{activity.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed text-lg">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 販売実績セクション */}
        {bangladesh.sales_performance && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">販売実績</h2>
            <div className="bg-orange-50 rounded-lg p-8">
              <div className="text-center">
                {bangladesh.sales_performance.map((performance, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                    <p className="text-2xl font-bold text-orange-600 mb-2">🏢</p>
                    <p className="text-gray-800 font-semibold text-lg">{performance}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 取引条件セクション */}
        {bangladesh.payment_conditions && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">取引条件</h2>
            <div className="bg-orange-50 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {bangladesh.payment_conditions.map((condition, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg text-center shadow-sm">
                    <p className="text-gray-800 font-medium">{condition}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 強みセクション */}
        {bangladesh.strengths && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">KOUEIバングラデシュ事務所の強み</h2>
            <div className="bg-orange-50 rounded-lg p-8">
              <div className="space-y-4">
                {bangladesh.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-4">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-gray-700 leading-relaxed">{strength}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 連絡先情報セクション */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">連絡先情報</h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6">
              <h3 className="text-2xl font-semibold text-white text-center">{bangladesh.contact_info.headquarters.name}</h3>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-orange-600 mb-2">所在地</h4>
                  <p className="text-gray-800 text-lg leading-relaxed">
                    {bangladesh.contact_info.headquarters.address}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-orange-600 mb-2">Email</h4>
                  <p className="text-gray-800 text-lg">
                    <a href={`mailto:${bangladesh.contact_info.headquarters.email}`} className="text-orange-600 hover:text-orange-700 transition-colors">
                      {bangladesh.contact_info.headquarters.email}
                    </a>
                  </p>
                </div>

                {bangladesh.contact_info.headquarters.website && (
                  <div>
                    <h4 className="text-sm font-medium text-orange-600 mb-2">ウェブサイト</h4>
                    <p className="text-gray-800 text-lg">
                      <a href={`https://${bangladesh.contact_info.headquarters.website}`} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:text-orange-700 transition-colors">
                        {bangladesh.contact_info.headquarters.website}
                      </a>
                    </p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium text-orange-600 mb-2">対応言語</h4>
                  <div className="flex flex-wrap gap-2">
                    {bangladesh.contact_info.headquarters.languages.map((language, index) => (
                      <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA セクション */}
        <section className="text-center bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">お問い合わせ</h2>
          <p className="text-xl mb-8 text-orange-100">バングラデシュでの事業に関するご相談はお気軽にどうぞ</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-block bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              お問い合わせフォーム
            </Link>
            <Link 
              href="/about" 
              className="inline-block bg-orange-400 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-500 transition-colors transform hover:scale-105"
            >
              会社概要に戻る
            </Link>
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