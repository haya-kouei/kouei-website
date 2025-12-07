import Image from 'next/image'
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

      {/* ヒーロー画像 */}
      <div className="relative w-full h-[300px] md:h-[400px]">
        <Image
          src="/myanmar-hero.jpg"
          alt="Myanmar Street"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      <main className="container mx-auto px-4 py-12 max-w-6xl">
        {/* タイトルセクション */}
        <section className="mb-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {myanmar.name}
          </h1>
          <p className="text-lg text-gray-700 mb-6">{myanmar.name_en}</p>
          <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
            <p>恒栄トレーディング（日本）のミャンマー支店です。</p>
            <p>ミャンマーにおける橋梁・土木・港湾等のインフラ案件、現地工場様向けに、機械工具・工場設備・ボルト類の販売をしております。</p>
            <p>USD・MMK支払、CIF Yangon、DDP Yangon、CIF Myawaddy 条件の見積対応可能です。</p>
          </div>
        </section>

        {/* 業務内容セクション */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">業務内容</h2>
          <ul className="space-y-2">
            {myanmar.business_activities.map((activity, index) => (
              <li key={index} className="flex items-start">
                <span className="text-sm text-gray-700">• {activity.title}。</span>
              </li>
            ))}
            <li className="flex items-start">
              <span className="text-sm text-gray-700">• 恒栄トレーディング（日本）のオペレーション委託業務。</span>
            </li>
            <li className="flex items-start">
              <span className="text-sm text-gray-700">• その他ウェブサイト、システムの運用。</span>
            </li>
          </ul>
        </section>

        {/* ミャンマー支店概要セクション */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">ミャンマー支店概要</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 bg-gray-50 text-gray-600 text-sm w-1/4">会社名</td>
                  <td className="px-6 py-3">
                    <p className="text-gray-900 text-sm">{myanmar.name}</p>
                    <p className="text-gray-700 text-sm mt-1">{myanmar.name_en}</p>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 bg-gray-50 text-gray-600 text-sm">代表者</td>
                  <td className="px-6 py-3 text-gray-900 text-sm">{myanmar.overview.representative}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 bg-gray-50 text-gray-600 text-sm">設立日</td>
                  <td className="px-6 py-3 text-gray-900 text-sm">{myanmar.overview.established}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 bg-gray-50 text-gray-600 text-sm">社員数</td>
                  <td className="px-6 py-3 text-gray-900 text-sm">{myanmar.overview.employees}人</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 bg-gray-50 text-gray-600 text-sm">資本金</td>
                  <td className="px-6 py-3 text-gray-900 text-sm">{myanmar.overview.capital}</td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 bg-gray-50 text-gray-600 text-sm">電話番号</td>
                  <td className="px-6 py-3 text-gray-900 text-sm">
                    {myanmar.contact_info.headquarters.phone} (ミャンマー語・英語)
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 bg-gray-50 text-gray-600 text-sm">Email</td>
                  <td className="px-6 py-3 text-sm">
                    <a href={`mailto:${myanmar.contact_info.headquarters.email}`} className="text-blue-600 hover:underline">
                      {myanmar.contact_info.headquarters.email}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}