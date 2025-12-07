import Link from 'next/link'
import { getManufacturers } from '@/lib/content-loader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function ManufacturersPage() {
  const manufacturers = await getManufacturers()
  
  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="manufacturers" />

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

      <Footer />
    </div>
  )
}