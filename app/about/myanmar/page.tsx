import Link from 'next/link'
import { getOrganization } from '@/lib/content-loader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function MyanmarPage() {
  const myanmar = await getOrganization('myanmar')

  if (!myanmar) {
    return <div>組織情報が見つかりません</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="about" />

      {/* ヘッダー画像 */}
      <div className="h-48 bg-gradient-to-r from-purple-100 to-purple-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{myanmar.name}</h1>
            <p className="text-lg text-gray-700">{myanmar.name_en}</p>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        {/* 企業概要セクション */}
        <section className="mb-12">
          <div className="bg-purple-50 rounded-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">企業概要</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {myanmar.description}
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-600 mb-2">設立</h3>
                <p className="text-gray-800 text-lg font-semibold">{myanmar.overview.established}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-600 mb-2">代表者</h3>
                <p className="text-gray-800 text-lg font-semibold">{myanmar.overview.representative}</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-600 mb-2">従業員数</h3>
                <p className="text-gray-800 text-lg font-semibold">{myanmar.overview.employees}名</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h3 className="text-sm font-medium text-purple-600 mb-2">資本金</h3>
                <p className="text-gray-800 text-lg font-semibold">{myanmar.overview.capital}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 業務内容セクション */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">業務内容</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {myanmar.business_activities.map((activity, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
                  <h3 className="text-lg font-bold text-white">{activity.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 取引条件セクション */}
        {myanmar.payment_conditions && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">取引条件</h2>
            <div className="bg-purple-50 rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {myanmar.payment_conditions.map((condition, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg text-center shadow-sm">
                    <p className="text-gray-800 font-medium">{condition}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 強みセクション */}
        {myanmar.strengths && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">KOUEIミャンマー支店の強み</h2>
            <div className="bg-purple-50 rounded-lg p-8">
              <div className="space-y-4">
                {myanmar.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-4">
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
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-6">
              <h3 className="text-2xl font-semibold text-white text-center">{myanmar.contact_info.headquarters.name}</h3>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium text-purple-600 mb-2">所在地</h4>
                  <p className="text-gray-800 text-lg leading-relaxed">
                    {myanmar.contact_info.headquarters.address}
                  </p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-purple-600 mb-2">電話番号</h4>
                  <p className="text-gray-800 text-lg">{myanmar.contact_info.headquarters.phone}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-purple-600 mb-2">Email</h4>
                  <p className="text-gray-800 text-lg">
                    <a href={`mailto:${myanmar.contact_info.headquarters.email}`} className="text-purple-600 hover:text-purple-700 transition-colors">
                      {myanmar.contact_info.headquarters.email}
                    </a>
                  </p>
                </div>

                {myanmar.contact_info.headquarters.website && (
                  <div>
                    <h4 className="text-sm font-medium text-purple-600 mb-2">ウェブサイト</h4>
                    <p className="text-gray-800 text-lg">
                      <a href={`https://${myanmar.contact_info.headquarters.website}`} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 transition-colors">
                        {myanmar.contact_info.headquarters.website}
                      </a>
                    </p>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium text-purple-600 mb-2">対応言語</h4>
                  <div className="flex flex-wrap gap-2">
                    {myanmar.contact_info.headquarters.languages.map((language, index) => (
                      <span key={index} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
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
        {myanmar.social_media?.facebook && (
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">SNS</h2>
            <div className="text-center">
              <a 
                href={`https://facebook.com/${myanmar.social_media.facebook.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook: {myanmar.social_media.facebook}
              </a>
            </div>
          </section>
        )}

        {/* CTA セクション */}
        <section className="text-center bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">お問い合わせ</h2>
          <p className="text-xl mb-8 text-purple-100">ミャンマーでの事業に関するご相談はお気軽にどうぞ</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors transform hover:scale-105"
            >
              お問い合わせフォーム
            </Link>
            <Link 
              href="/about" 
              className="inline-block bg-purple-400 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-500 transition-colors transform hover:scale-105"
            >
              会社概要に戻る
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}