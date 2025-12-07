import Link from 'next/link'
import { getCompanyInfo } from '@/lib/content-loader'
import OrganizationChat from '@/components/OrganizationChat'

export default async function AboutPage() {
  const company = await getCompanyInfo()
  
  if (!company) {
    return <div>会社情報が見つかりません</div>
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
              <Link href="/about" className="text-cyan-500 hover:text-cyan-500 font-medium transition-colors">会社概要</Link>
              <Link href="/contact" className="text-gray-700 hover:text-cyan-500 font-medium transition-colors">お問い合わせ</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ヘッダー画像 */}
      <div className="h-48 bg-gradient-to-r from-indigo-100 to-indigo-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <h1 className="text-4xl font-bold text-gray-800">会社概要</h1>
        </div>
      </div>

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

      <main className="container mx-auto px-4 py-12">
        {/* 組織選択メニュー */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* 恒栄トレーディング (日本本社) */}
          <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">恒栄トレーディング</h3>
              <p className="text-blue-100 text-lg">(Kouei Japan Trading Co., Ltd.)</p>
              <p className="text-blue-200 text-sm mt-2">日本本社 - 東京</p>
            </div>
            <div className="p-8">
              <p className="text-gray-600 mb-6 leading-relaxed">
                1994年設立の日本本社。グローバル貿易事業の中心として、世界各国との商品取引を統括しています。
              </p>
              <Link href="/about/japan" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-lg">
                詳細を見る
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* 恒栄ベトナム */}
          <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-green-600 to-green-700 p-8">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">恒栄ベトナム</h3>
              <p className="text-green-100 text-lg">(Kouei Vietnam Trading Co., Ltd.)</p>
              <p className="text-green-200 text-sm mt-2">ベトナム拠点 - ホーチミン</p>
            </div>
            <div className="p-8">
              <p className="text-gray-600 mb-6 leading-relaxed">
                ベトナムの急成長する製造業市場において、現地に根ざした事業展開を行う重要拠点です。
              </p>
              <Link href="/about/vietnam" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-lg">
                詳細を見る
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* 恒栄ミャンマー */}
          <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-8">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">恒栄ミャンマー</h3>
              <p className="text-purple-100 text-lg">(Kouei Japan Trading Co., Ltd. Myanmar Branch)</p>
              <p className="text-purple-200 text-sm mt-2">ミャンマー支社 - ヤンゴン</p>
            </div>
            <div className="p-8">
              <p className="text-gray-600 mb-6 leading-relaxed">
                ミャンマーの新興市場において戦略的な事業展開を図る成長拠点です。
              </p>
              <Link href="/about/myanmar" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-lg">
                詳細を見る
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

        </div>

        {/* グループ概要セクション */}
        <section className="bg-gray-50 rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">KOUEIグループについて</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">グループビジョン</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                {company.vision}
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">グループミッション</h3>
              <p className="text-gray-700 leading-relaxed">
                {company.mission}
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">グループ実績</h3>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-600">700+</div>
                  <p className="text-gray-600">取引企業数</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-600">50+</div>
                  <p className="text-gray-600">展開国数</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-600">30+</div>
                  <p className="text-gray-600">年の実績</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 沿革セクション */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">沿革</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {company.history.map((event, index) => (
                <div key={index} className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-20 text-right">
                    <span className="text-xl font-bold text-cyan-600">{event.year}</span>
                  </div>
                  <div className="flex-shrink-0 w-4 h-4 bg-cyan-500 rounded-full mt-1"></div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{event.event}</h3>
                    <p className="text-gray-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">企業理念</h2>
          <div className="bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-cyan-600 mb-6 text-center">Vision</h3>
            <p className="text-gray-700 text-xl mb-8 text-center leading-relaxed">{company.vision}</p>
            
            <h3 className="text-2xl font-semibold text-cyan-600 mb-6 text-center">Mission</h3>
            <p className="text-gray-700 text-xl mb-8 text-center leading-relaxed">{company.mission}</p>
            
            <p className="text-gray-700 text-lg leading-relaxed text-center">
              {company.business_description}
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">企業価値</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {company.values.map((value, index) => (
              <div key={index} className="country-card bg-white p-8 rounded-lg border transition-all hover:shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{value}</h3>
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-cyan-600 mb-6"></div>
                <p className="text-gray-600 leading-relaxed">
                  {value === '信頼と誠実' && '長期的な信頼関係の構築を最優先に、誠実な取引を心がけています。'}
                  {value === '品質への責任' && '高品質な製品とサービスの提供に責任を持ち、継続的な改善に取り組みます。'}
                  {value === '革新と挑戦' && '新しい技術と市場機会への挑戦を通じて、持続的な成長を実現します。'}
                  {value === 'グローバル視点' && '世界市場での競争力向上と地域社会への貢献を両立させます。'}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">会社情報</h2>
          <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-100">
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 px-8 py-6">
              <h3 className="text-2xl font-semibold text-white text-center">基本情報</h3>
            </div>
            <div className="grid md:grid-cols-2">
              <div className="p-8 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-cyan-600 mb-2">会社名</h3>
                  <p className="text-gray-800 text-lg font-semibold">{company.name}</p>
                  <p className="text-gray-600">{company.name_en}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-cyan-600 mb-2">設立年</h3>
                  <p className="text-gray-800 text-lg">{company.established}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-cyan-600 mb-2">資本金</h3>
                  <p className="text-gray-800 text-lg">{company.capital}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-cyan-600 mb-2">従業員数</h3>
                  <p className="text-gray-800 text-lg">{company.employees}名</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-cyan-600 mb-2">代表者</h3>
                  <p className="text-gray-800 text-lg">{company.president}</p>
                </div>
              </div>
              
              <div className="p-8 bg-gray-50">
                <h3 className="text-sm font-medium text-cyan-600 mb-4">本社所在地</h3>
                <div className="space-y-3 text-gray-800">
                  <p className="text-lg">〒{company.address.postal_code}</p>
                  <p className="text-lg">{company.address.prefecture}{company.address.city}{company.address.street}</p>
                  <p className="text-lg">{company.address.building}</p>
                  <div className="pt-4 space-y-2">
                    {company.address.phone && (
                      <p>
                        <span className="text-cyan-600 font-medium">TEL:</span> {company.address.phone}
                      </p>
                    )}
                    {company.address.fax && (
                      <p>
                        <span className="text-cyan-600 font-medium">FAX:</span> {company.address.fax}
                      </p>
                    )}
                    <p>
                      <span className="text-cyan-600 font-medium">Email:</span> 
                      <a href={`mailto:${company.address.email}`} className="text-cyan-600 hover:text-cyan-700 transition-colors">
                        {company.address.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">事業内容</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {company.services.map((service, index) => (
              <div key={index} className="country-card bg-gradient-to-r from-cyan-50 to-cyan-100 p-8 rounded-lg border transition-all hover:shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{service.name}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">グローバルオフィス</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {company.offices.map((office, index) => (
              <div key={index} className="country-card bg-white p-8 rounded-lg border transition-all hover:shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{office.name}</h3>
                  <span className="text-sm text-cyan-600 bg-cyan-100 px-3 py-1 rounded font-medium">
                    {office.established}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3 text-lg font-medium">{office.location}</p>
                {office.address && (
                  <p className="text-gray-500 mb-3">{office.address}</p>
                )}
                {office.phone && (
                  <p className="text-gray-500 mb-3"><span className="text-cyan-600 font-medium">TEL:</span> {office.phone}</p>
                )}
                {office.description && (
                  <p className="text-gray-600 leading-relaxed">{office.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">沿革</h2>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-px bg-cyan-200"></div>
            <div className="space-y-8">
              {company.history.map((event, index) => (
                <div key={index} className="relative pl-12">
                  <div className="absolute left-0 w-8 h-8 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="country-card bg-white p-6 rounded-lg border transition-all hover:shadow-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-gray-800">{event.event}</h3>
                      <span className="text-sm font-medium text-cyan-600 bg-cyan-50 px-3 py-2 rounded">
                        {event.year}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">認証・資格</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {company.certifications.map((cert, index) => (
              <div key={index} className="country-card bg-gradient-to-r from-green-50 to-green-100 border border-green-200 p-8 rounded-lg transition-all hover:shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-green-800">{cert.name}</h3>
                  <span className="text-sm text-green-600 bg-green-100 px-3 py-2 rounded font-medium">
                    {cert.acquired}
                  </span>
                </div>
                <p className="text-green-700 leading-relaxed">{cert.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA セクション */}
        <section className="text-center bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">お問い合わせ</h2>
          <p className="text-xl mb-8 text-indigo-100">各拠点の詳細情報やビジネスに関するご相談はお気軽にどうぞ</p>
          <Link 
            href="/contact" 
            className="inline-block bg-white text-indigo-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
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

      {/* 組織案内AIチャット */}
      <OrganizationChat />
    </div>
  )
}