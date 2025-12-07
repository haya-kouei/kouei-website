import Link from 'next/link'
import Image from 'next/image'
import { getTopics, getSalesCountries, getOverseasSales } from '@/lib/content-loader'
import OrganizationChat from '@/components/OrganizationChat'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

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
      <Header currentPage="home" />

      {/* メインビジュアル */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white min-h-[40vh] flex items-center justify-center overflow-hidden">
        {/* アニメーション背景 */}
        <div className="absolute inset-0">
          {/* 動く円形グラデーション */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 50%, rgba(0, 149, 210, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 50%, rgba(0, 149, 210, 0.06) 0%, transparent 50%),
                radial-gradient(circle at 50% 30%, rgba(0, 149, 210, 0.05) 0%, transparent 40%)
              `,
              animation: 'pulseBackground 6s ease-in-out infinite'
            }}
          />
          {/* 動くグリッド */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent,
                  transparent 40px,
                  rgba(0, 149, 210, 0.08) 40px,
                  rgba(0, 149, 210, 0.08) 41px
                ),
                repeating-linear-gradient(
                  90deg,
                  transparent,
                  transparent 40px,
                  rgba(0, 149, 210, 0.08) 40px,
                  rgba(0, 149, 210, 0.08) 41px
                )
              `,
              animation: 'slideGrid 15s linear infinite'
            }}
          />
          {/* 動く点 */}
          <div
            className="absolute w-3 h-3 bg-kouei-blue rounded-full opacity-40"
            style={{
              top: '30%',
              left: '20%',
              animation: 'float 8s ease-in-out infinite'
            }}
          />
          <div
            className="absolute w-2 h-2 bg-kouei-blue rounded-full opacity-30"
            style={{
              top: '60%',
              left: '70%',
              animation: 'float 6s ease-in-out infinite 1s'
            }}
          />
          <div
            className="absolute w-2.5 h-2.5 bg-kouei-blue-light rounded-full opacity-35"
            style={{
              top: '45%',
              left: '85%',
              animation: 'float 7s ease-in-out infinite 2s'
            }}
          />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl font-normal text-gray-800 mb-6 leading-tight">
            KOUEI は鉄鋼製品・機械工具・設備の商社です。
          </h1>
          <h2 className="text-lg md:text-xl font-bold text-kouei-blue">
            グローバル調達と販売を通じて世界の発展に貢献します。
          </h2>
        </div>
      </section>

      {/* バナーセクション */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-6 items-start">
            {/* Request Quotation バナー */}
            <Link href="/contact" className="transform transition-all hover:scale-105">
              <Image
                src="/request-quotation-banner.png"
                alt="Request Quotation - English Support Available"
                width={200}
                height={94}
                className="w-[200px] h-[94px] rounded-lg shadow-lg"
              />
            </Link>

            {/* 輸出相談バナー */}
            <Link href="/contact" className="block">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-3 w-[200px] h-[94px] flex flex-col justify-center transform transition-all hover:scale-105">
                <h3 className="text-xs font-bold text-white mb-1 leading-tight">
                  海外から輸出の依頼があった場合は、お気軽にご相談ください！
                </h3>
                <p className="text-blue-100" style={{fontSize: '10px'}}>
                  豊富な海外取引実績でサポート
                </p>
              </div>
            </Link>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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

      <Footer />

      {/* 組織案内AIチャット */}
      <OrganizationChat />
    </div>
  )
}