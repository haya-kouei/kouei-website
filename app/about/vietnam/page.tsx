import Image from 'next/image'
import { getOrganization } from '@/lib/content-loader'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default async function VietnamPage() {
  const vietnam = await getOrganization('vietnam')

  if (!vietnam) {
    return <div>組織情報が見つかりません</div>
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="about" />

      {/* ヘッダー画像 */}
      <section className="relative w-full flex items-center justify-center bg-white">
        <div className="relative overflow-hidden" style={{ width: '100%' }}>
          <img
            src="/vietnam-bg.png"
            alt="KOUEI Vietnam Background"
            className="block w-full"
          />
          {/* テキストオーバーレイ */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-2xl font-bold text-white mb-2">{vietnam.name}</h1>
              <p className="text-lg text-white">{vietnam.name_en}</p>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* 概要セクション - 2カラムレイアウト */}
        <section className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-sm text-gray-700 leading-relaxed mb-6">
                {vietnam.description}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                ホーチミンの拠点からベトナム全域を営業しています。
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/vietnam-team.jpg"
                alt="KOUEI Vietnam Team"
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* 業務内容セクション */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">業務内容</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <ul className="space-y-2">
              {vietnam.business_activities.slice(0, 3).map((activity, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-sm text-gray-700">• {activity.title}。</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {vietnam.business_activities.slice(3).map((activity, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-sm text-gray-700">• {activity.title}。</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* 会社概要セクション */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">会社概要</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 bg-gray-50 text-gray-600 text-sm w-1/4">会社名</td>
                  <td className="px-6 py-3 text-gray-900 text-sm">{vietnam.name_en}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 bg-gray-50 text-gray-600 text-sm">代表者</td>
                  <td className="px-6 py-3 text-gray-900 text-sm">{vietnam.overview.representative}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 bg-gray-50 text-gray-600 text-sm">設立日</td>
                  <td className="px-6 py-3 text-gray-900 text-sm">{vietnam.overview.established}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 bg-gray-50 text-gray-600 text-sm">社員数</td>
                  <td className="px-6 py-3 text-gray-900 text-sm">{vietnam.overview.employees}人</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 bg-gray-50 text-gray-600 text-sm">電話番号</td>
                  <td className="px-6 py-3 text-gray-900 text-sm">
                    {Array.isArray(vietnam.contact_info.headquarters.phone) ? (
                      vietnam.contact_info.headquarters.phone.join(' / ')
                    ) : (
                      vietnam.contact_info.headquarters.phone
                    )} (英語・ベトナム語)
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 bg-gray-50 text-gray-600 text-sm">Email</td>
                  <td className="px-6 py-3 text-sm">
                    <a href={`mailto:${vietnam.contact_info.headquarters.email}`} className="text-kouei-blue hover:underline">
                      {vietnam.contact_info.headquarters.email}
                    </a>
                  </td>
                </tr>
                {vietnam.social_media?.instagram && (
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-3 bg-gray-50 text-gray-600 text-sm">SNS</td>
                    <td className="px-6 py-3">
                      <a
                        href={`https://instagram.com/${vietnam.social_media.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2"
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="url(#instagram-gradient)">
                          <defs>
                            <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
                              <stop offset="0%" style={{stopColor: '#f09433'}} />
                              <stop offset="25%" style={{stopColor: '#e6683c'}} />
                              <stop offset="50%" style={{stopColor: '#dc2743'}} />
                              <stop offset="75%" style={{stopColor: '#cc2366'}} />
                              <stop offset="100%" style={{stopColor: '#bc1888'}} />
                            </linearGradient>
                          </defs>
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}