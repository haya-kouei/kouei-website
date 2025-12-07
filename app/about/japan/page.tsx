import Link from 'next/link'
import { getOrganization } from '@/lib/content-loader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function JapanPage() {
  const japan = await getOrganization('japan')

  if (!japan) {
    return <div>組織情報が見つかりません</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="about" />

      {/* ヘッダー画像 */}
      <section className="relative w-full flex items-center justify-center bg-white">
        <div className="relative overflow-hidden" style={{ width: '100%' }}>
          <img
            src="/main-image.jpg"
            alt="KOUEI Japan Background"
            className="block w-full"
          />
          {/* テキストオーバーレイ */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-2xl font-bold text-kouei-blue mb-2">{japan.name}</h1>
              <p className="text-lg text-kouei-blue">{japan.name_en}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        {/* Vision & Mission セクション */}
        {(japan.vision || japan.mission) && (
          <section className="mb-12 bg-white">
            <div className="text-center mb-8">
              {japan.vision && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold text-cyan-600 mb-3">Vision</h2>
                  <p className="text-xl text-gray-800 leading-relaxed">{japan.vision}</p>
                </div>
              )}
              {japan.mission && (
                <div>
                  <h2 className="text-lg font-semibold text-cyan-600 mb-3">Mission</h2>
                  <p className="text-xl text-gray-800 leading-relaxed">{japan.mission}</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 企業概要セクション */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">株式会社恒栄トレーディング (Kouei Japan Trading Co., Ltd.)</h2>
          <div className="bg-white rounded-lg p-8">
            <p className="text-sm text-gray-700 leading-relaxed">
              {japan.description}
            </p>
          </div>
        </section>

        {/* 弊社の強みセクション */}
        {japan.strengths && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">弊社の強み</h2>
            <div className="bg-blue-50 rounded-lg p-8">
              <div className="space-y-3">
                {japan.strengths.map((strength, index) => (
                  <div key={index} className="flex items-start">
                    <span className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <p className="text-sm text-gray-700 leading-relaxed">{strength}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 会社概要セクション */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">会社概要</h2>
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-600 text-sm bg-gray-50 w-1/3">会社名</td>
                  <td className="px-6 py-3 text-gray-800 text-sm">
                    {japan.name}<br />
                    <span className="text-xs text-gray-600">（ 英文名：{japan.name_en} ）</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-600 text-sm bg-gray-50">代表取締役 社長</td>
                  <td className="px-6 py-3 text-gray-800 text-sm">{japan.overview.representative}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-600 text-sm bg-gray-50">資本金</td>
                  <td className="px-6 py-3 text-gray-800 text-sm">{japan.overview.capital}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-600 text-sm bg-gray-50">設立日</td>
                  <td className="px-6 py-3 text-gray-800 text-sm">{japan.overview.established}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-600 text-sm bg-gray-50">全体人数（海外拠点含む）</td>
                  <td className="px-6 py-3 text-gray-800 text-sm">{japan.overview.employees}人</td>
                </tr>
                {japan.company_info && (
                  <>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 text-gray-600 text-sm bg-gray-50">法人番号</td>
                      <td className="px-6 py-3 text-gray-800 text-sm">{japan.company_info.corporate_number}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 text-gray-600 text-sm bg-gray-50">適格請求書発行事業者登録番号</td>
                      <td className="px-6 py-3 text-gray-800 text-sm">{japan.company_info.qualified_invoice_number}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 text-gray-600 text-sm bg-gray-50">古物商許可証</td>
                      <td className="px-6 py-3 text-gray-800 text-sm">{japan.company_info.antique_dealer_license}</td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 text-gray-600 text-sm bg-gray-50">主要銀行</td>
                      <td className="px-6 py-3 text-gray-800 text-sm">
                        {japan.company_info.main_banks.join('　')}
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-3 text-gray-600 text-sm bg-gray-50">関連会社</td>
                      <td className="px-6 py-3 text-gray-800 text-sm">
                        {japan.company_info.related_companies.join('、')}
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* 住所セクション */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-800 mb-8 text-center">住所</h2>

          {/* Google Map */}
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200 mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3281.8887648!2d135.6987!3d34.5438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60013b0e8c8c8c8d%3A0x1!2z44CSNjM5LTAyMjMg5aWI6Imv55yM6aaZ6Iqd5biC55yf576O44O25LiYMe-8jTEz4oiSMzU!5e0!3m2!1sja!2sjp!4v1234567890!5m2!1sja!2sjp"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* 住所情報テーブル */}
          <div className="bg-white rounded-lg overflow-hidden border border-gray-200">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-600 text-sm bg-gray-50 w-1/3">住所</td>
                  <td className="px-6 py-3 text-gray-800 text-sm">{japan.contact_info.headquarters.address}</td>
                </tr>
                {japan.contact_info.headquarters.website && (
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 text-gray-600 text-sm bg-gray-50">ウェブサイト</td>
                    <td className="px-6 py-3 text-gray-800 text-sm">
                      <a href={japan.contact_info.headquarters.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 transition-colors underline">
                        {japan.contact_info.headquarters.website}
                      </a>
                    </td>
                  </tr>
                )}
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-600 text-sm bg-gray-50">連絡先</td>
                  <td className="px-6 py-3 text-gray-800 text-sm">
                    <a href={`mailto:${japan.contact_info.headquarters.email}`} className="text-blue-600 hover:text-blue-700 transition-colors">
                      {japan.contact_info.headquarters.email}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
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
      <Footer />
    </div>
  )
}