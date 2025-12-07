import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="footer-bg text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="font-bold mb-4 text-kouei-blue-light">事業内容</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li><Link href="/sales" className="hover:text-kouei-blue-light transition-colors">販売事業</Link></li>
              <li><Link href="/manufacturers" className="hover:text-kouei-blue-light transition-colors">取扱メーカー</Link></li>
              <li>鉄鋼製品・機械工具</li>
              <li>設備・プラント機器</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-kouei-blue-light">グローバルオフィス</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>日本本社</li>
              <li>ベトナム拠点</li>
              <li>ミャンマー拠点</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-kouei-blue-light">お問い合わせ</h4>
            <div className="text-gray-300 text-sm space-y-1">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>kouei.contact@kjt.co.jp</span>
              </div>
              <Link href="/contact" className="inline-block mt-3 text-kouei-blue-light hover:opacity-80 transition-opacity">
                お問い合わせフォーム →
              </Link>
            </div>
          </div>
        </div>

        <hr className="border-gray-600 mb-6" />
        <div className="text-center text-gray-400 text-sm">
          <p>&copy; 2025 株式会社恒栄トレーディング All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
