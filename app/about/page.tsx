import Link from 'next/link'
import { getCompanyInfo } from '@/lib/content-loader'

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

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-6">会社概要</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            私たちの歴史、ミッション、そして未来への取り組み
          </p>
        </div>

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

        <section className="py-16 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg">
          <div className="container mx-auto px-4 text-center">
            <div className="bg-white/95 backdrop-blur-sm max-w-md mx-auto p-8 rounded-lg shadow-xl">
              <h3 className="text-2xl font-bold text-cyan-600 mb-4">お問い合わせ</h3>
              <p className="text-gray-700 mb-6">
                事業に関するご質問やご相談がございましたら、お気軽にお問い合わせください。
              </p>
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