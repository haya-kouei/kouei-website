import Link from 'next/link'
import Image from 'next/image'
import { getManufacturers } from '@/lib/content-loader'

export default async function ManufacturersPage() {
  const manufacturers = await getManufacturers()
  
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Image
                src="/kouei-logo.png"
                alt="KOUEI"
                width={320}
                height={90}
                priority
                className="w-auto"
              />
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/sales" className="text-gray-700 hover:text-kouei-blue font-bold transition-colors">販売事業</Link>
              <Link href="/manufacturers" className="text-kouei-blue hover:text-kouei-blue font-bold transition-colors">取扱メーカー</Link>
              <Link href="/about" className="text-gray-700 hover:text-kouei-blue font-bold transition-colors">会社概要</Link>
              <Link href="/contact" className="text-gray-700 hover:text-kouei-blue font-bold transition-colors">お問い合わせ</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* ヘッダー画像 */}
      <div className="h-48 bg-gradient-to-r from-amber-100 to-amber-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <h1 className="text-4xl font-bold text-gray-800">取扱メーカー</h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {manufacturers.categories?.filter(category =>
          category.companies.some(company => company.display !== false)
        ).map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">{category.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-5">
              {category.companies.filter(company => company.display !== false).map((company, companyIndex) => (
                <div key={companyIndex}>
                  {company.link ? (
                    <a
                      href={company.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-900 group-hover:text-kouei-blue leading-tight transition-colors duration-200">{company.name}</span>
                        {company.has_partnership && (
                          <span className="inline-block bg-orange-100 text-orange-600 text-[10px] px-1.5 py-0.5 rounded">
                            取引
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-gray-400 group-hover:text-gray-600 leading-tight transition-colors duration-200">{company.name_en}</div>
                    </a>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-gray-900 leading-tight">{company.name}</span>
                        {company.has_partnership && (
                          <span className="inline-block bg-orange-100 text-orange-600 text-[10px] px-1.5 py-0.5 rounded">
                            取引
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-gray-400 leading-tight">{company.name_en}</div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
        
        {(!manufacturers.categories || manufacturers.categories.length === 0) && (
          <div className="text-center py-12">
            <p className="text-gray-600">取扱メーカー情報を読み込んでいます...</p>
          </div>
        )}

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