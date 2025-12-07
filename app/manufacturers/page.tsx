import Link from 'next/link'
import { getManufacturers } from '@/lib/content-loader'

export default async function ManufacturersPage() {
  const manufacturers = await getManufacturers()
  
  return (
    <div className="min-h-screen bg-white">
      {/* ヘッダー */}
      <header className="bg-gray-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="brand-logo text-3xl">KOUEI</Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/sales" className="text-gray-700 hover:text-cyan-500 font-medium transition-colors">販売事業</Link>
              <Link href="/manufacturers" className="text-cyan-500 hover:text-cyan-500 font-medium transition-colors">取扱メーカー</Link>
              <Link href="/about" className="text-gray-700 hover:text-cyan-500 font-medium transition-colors">会社概要</Link>
              <Link href="/contact" className="text-gray-700 hover:text-cyan-500 font-medium transition-colors">お問い合わせ</Link>
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
        {manufacturers.categories?.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">{category.name}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {category.companies.map((company, companyIndex) => {
                const CardWrapper = company.link ? 'a' : 'div';
                const cardProps = company.link ? { href: company.link, target: '_blank', rel: 'noopener noreferrer' } : {};

                return (
                  <CardWrapper
                    key={companyIndex}
                    {...cardProps}
                    className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-left block"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-gray-900 font-bold text-base mb-1 leading-tight">{company.name}</h3>
                        <p className="text-gray-500 text-xs leading-relaxed">{company.name_en}</p>
                      </div>
                      {company.has_partnership && (
                        <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded font-medium ml-2 flex-shrink-0">
                          取引
                        </span>
                      )}
                    </div>
                  </CardWrapper>
                );
              })}
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