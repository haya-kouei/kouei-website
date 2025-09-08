import Link from 'next/link'
import { getOrganization } from '@/lib/content-loader'

export default async function JapanPage() {
  const japan = await getOrganization('japan')
  
  if (!japan) {
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
      <div className="h-48 bg-gradient-to-r from-blue-100 to-blue-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{japan.name}</h1>
            <p className="text-lg text-gray-700">{japan.name_en}</p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* 企業概要セクション */}
        <section className="mb-12">
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">企業概要</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {japan.description}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600 mb-2">設立</h3>
                <p className="text-gray-800 text-lg font-semibold">{japan.overview.established}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600 mb-2">代表者</h3>
                <p className="text-gray-800 text-lg font-semibold">{japan.overview.representative}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600 mb-2">従業員数</h3>
                <p className="text-gray-800 text-lg font-semibold">{japan.overview.employees}名</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-blue-600 mb-2">資本金</h3>
                <p className="text-gray-800 text-lg font-semibold">{japan.overview.capital}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 業務内容セクション */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">業務内容</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {japan.business_activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                  <h3 className="text-lg font-bold text-white">{activity.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 強みセクション */}
        {japan.strengths && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">KOUEI の強み</h2>
            <div className="bg-blue-50 rounded-lg p-8">
              <div className="space-y-4">
                {japan.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-4">
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

        {/* 法人情報セクション */}
        {japan.company_info && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">法人情報</h2>
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-600 mb-2">法人番号</h3>
                  <p className="text-gray-800 text-lg font-semibold">{japan.company_info.corporate_number}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-600 mb-2">適格請求書発行事業者登録番号</h3>
                  <p className="text-gray-800 text-lg font-semibold">{japan.company_info.qualified_invoice_number}</p>
                </div>
                <div className="bg-white p-4 rounded-lg md:col-span-2">
                  <h3 className="text-sm font-medium text-blue-600 mb-2">古物商許可証</h3>
                  <p className="text-gray-800 text-lg font-semibold">{japan.company_info.antique_dealer_license}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-600 mb-2">主要銀行</h3>
                  <div className="space-y-1">
                    {japan.company_info.main_banks.map((bank, index) => (
                      <p key={index} className="text-gray-800">{bank}</p>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-blue-600 mb-2">関連会社</h3>
                  <div className="space-y-1">
                    {japan.company_info.related_companies.map((company, index) => (
                      <p key={index} className="text-gray-800">{company}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 連絡先情報セクション */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">連絡先情報</h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6">
              <h3 className="text-2xl font-semibold text-white text-center">{japan.contact_info.headquarters.name}</h3>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-blue-600 mb-2">所在地</h4>
                  <p className="text-gray-800 text-lg leading-relaxed">
                    {japan.contact_info.headquarters.address}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-blue-600 mb-2">Email</h4>
                  <p className="text-gray-800 text-lg">
                    <a href={`mailto:${japan.contact_info.headquarters.email}`} className="text-blue-600 hover:text-blue-700 transition-colors">
                      {japan.contact_info.headquarters.email}
                    </a>
                  </p>
                </div>

                {japan.contact_info.headquarters.website && (
                  <div>
                    <h4 className="text-sm font-medium text-blue-600 mb-2">ウェブサイト</h4>
                    <p className="text-gray-800 text-lg">
                      <a href={japan.contact_info.headquarters.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors">
                        {japan.contact_info.headquarters.website}
                      </a>
                    </p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium text-blue-600 mb-2">対応言語</h4>
                  <div className="flex flex-wrap gap-2">
                    {japan.contact_info.headquarters.languages.map((language, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
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
        <section className="text-center bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">お問い合わせ</h2>
          <p className="text-xl mb-8 text-blue-100">商品取引・事業提携に関するご相談はお気軽にどうぞ</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              お問い合わせフォーム
            </Link>
            <Link 
              href="/about" 
              className="inline-block bg-blue-400 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-500 transition-colors transform hover:scale-105"
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