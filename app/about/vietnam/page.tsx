import Link from 'next/link'
import { getOrganization } from '@/lib/content-loader'
import Header from '@/components/Header'

export default async function VietnamPage() {
  const vietnam = await getOrganization('vietnam')
  
  if (!vietnam) {
    return <div>組織情報が見つかりません</div>
  }
  
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="about" />

      {/* ヘッダー画像 */}
      <div className="h-48 bg-gradient-to-r from-green-100 to-green-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{vietnam.name}</h1>
            <p className="text-lg text-gray-700">{vietnam.name_en}</p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* 企業概要セクション */}
        <section className="mb-12">
          <div className="bg-green-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">企業概要</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {vietnam.description}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-600 mb-2">設立</h3>
                <p className="text-gray-800 text-lg font-semibold">{vietnam.overview.established}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-600 mb-2">代表者</h3>
                <p className="text-gray-800 text-lg font-semibold">{vietnam.overview.representative}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-600 mb-2">従業員数</h3>
                <p className="text-gray-800 text-lg font-semibold">{vietnam.overview.employees}名</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-green-600 mb-2">営業エリア</h3>
                <p className="text-gray-800 text-lg font-semibold">{vietnam.overview.coverage}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 業務内容セクション */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">業務内容</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {vietnam.business_activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                  <h3 className="text-lg font-bold text-white">{activity.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* パートナーメーカーセクション */}
        {vietnam.partner_manufacturers && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">日本メーカー製品の販売代理</h2>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {vietnam.partner_manufacturers.map((manufacturer, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg text-center">
                    <p className="text-gray-800 font-medium">{manufacturer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 展示会サポートセクション */}
        {vietnam.exhibition_support && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">メーカー様の展示会サポート</h2>
            <div className="space-y-6">
              {vietnam.exhibition_support.map((support, index) => (
                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold text-white">{support.event}</h3>
                      <span className="bg-white/20 text-white px-3 py-1 rounded text-sm">
                        {support.year}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 leading-relaxed">{support.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 強みセクション */}
        {vietnam.strengths && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">KOUEIベトナムの強み</h2>
            <div className="bg-green-50 rounded-lg p-8">
              <div className="space-y-4">
                {vietnam.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-4">
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
            <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6">
              <h3 className="text-2xl font-semibold text-white text-center">{vietnam.contact_info.headquarters.name}</h3>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-green-600 mb-2">所在地</h4>
                  <p className="text-gray-800 text-lg leading-relaxed">
                    {vietnam.contact_info.headquarters.address}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-green-600 mb-2">電話番号</h4>
                  {Array.isArray(vietnam.contact_info.headquarters.phone) ? (
                    <div className="space-y-1">
                      {vietnam.contact_info.headquarters.phone.map((phone, index) => (
                        <p key={index} className="text-gray-800 text-lg">{phone}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-800 text-lg">{vietnam.contact_info.headquarters.phone}</p>
                  )}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-green-600 mb-2">Email</h4>
                  <p className="text-gray-800 text-lg">
                    <a href={`mailto:${vietnam.contact_info.headquarters.email}`} className="text-green-600 hover:text-green-700 transition-colors">
                      {vietnam.contact_info.headquarters.email}
                    </a>
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-green-600 mb-2">対応言語</h4>
                  <div className="flex flex-wrap gap-2">
                    {vietnam.contact_info.headquarters.languages.map((language, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SNSセクション */}
        {vietnam.social_media?.instagram && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">SNS</h2>
            <div className="text-center">
              <a 
                href={`https://instagram.com/${vietnam.social_media.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348zm7.718 0c-1.297 0-2.348-1.051-2.348-2.348s1.051-2.348 2.348-2.348 2.348 1.051 2.348 2.348-1.051 2.348-2.348 2.348z"/>
                </svg>
                Instagram: {vietnam.social_media.instagram}
              </a>
            </div>
          </section>
        )}

        {/* CTA セクション */}
        <section className="text-center bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">お問い合わせ</h2>
          <p className="text-xl mb-8 text-green-100">ベトナムでの事業に関するご相談はお気軽にどうぞ</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-block bg-white text-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              お問い合わせフォーム
            </Link>
            <Link 
              href="/about" 
              className="inline-block bg-green-400 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-500 transition-colors transform hover:scale-105"
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