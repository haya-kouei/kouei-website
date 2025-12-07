import Link from 'next/link'
import Image from 'next/image'

type HeaderProps = {
  currentPage?: 'home' | 'sales' | 'manufacturers' | 'about' | 'contact'
}

export default function Header({ currentPage = 'home' }: HeaderProps) {
  const getLinkClassName = (page: string) => {
    if (currentPage === page) {
      return "text-kouei-blue hover:text-kouei-blue font-bold transition-colors"
    }
    return "text-gray-700 hover:text-kouei-blue font-bold transition-colors"
  }

  return (
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
          <nav className="hidden md:flex space-x-8 items-center">
            {/* 販売事業 - ドロップダウン */}
            <div className="relative group">
              <Link href="/sales" className={getLinkClassName('sales')}>
                販売事業
              </Link>

              {/* ドロップダウンメニュー */}
              <div className="absolute top-full left-0 mt-2 w-72 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
                <div className="py-2">
                  <Link
                    href="/sales#domestic"
                    className="block px-6 py-3 text-gray-700 hover:bg-kouei-blue hover:text-white transition-colors"
                  >
                    <div className="font-bold">日本国内販売</div>
                  </Link>

                  <Link
                    href="/sales#vietnam"
                    className="block px-6 py-3 text-gray-700 hover:bg-kouei-blue hover:text-white transition-colors"
                  >
                    <div className="font-bold">ベトナム事業</div>
                  </Link>

                  <Link
                    href="/sales#myanmar"
                    className="block px-6 py-3 text-gray-700 hover:bg-kouei-blue hover:text-white transition-colors"
                  >
                    <div className="font-bold">ミャンマー事業</div>
                  </Link>

                  <Link
                    href="/sales#projects"
                    className="block px-6 py-3 text-gray-700 hover:bg-kouei-blue hover:text-white transition-colors"
                  >
                    <div className="font-bold">海外プロジェクト向け輸出</div>
                  </Link>

                  <Link
                    href="/sales#factory-export"
                    className="block px-6 py-3 text-gray-700 hover:bg-kouei-blue hover:text-white transition-colors"
                  >
                    <div className="font-bold">海外工場向け輸出</div>
                  </Link>

                  <Link
                    href="/sales#track-record"
                    className="block px-6 py-3 text-gray-700 hover:bg-kouei-blue hover:text-white transition-colors"
                  >
                    <div className="font-bold">輸出入実績</div>
                  </Link>

                  <Link
                    href="/sales#support"
                    className="block px-6 py-3 text-gray-700 hover:bg-kouei-blue hover:text-white transition-colors"
                  >
                    <div className="font-bold">海外取引支援</div>
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/manufacturers" className={getLinkClassName('manufacturers')}>
              取扱メーカー
            </Link>

            {/* 会社概要 - ドロップダウン */}
            <div className="relative group">
              <Link href="/about" className={getLinkClassName('about')}>
                会社概要
              </Link>

              {/* ドロップダウンメニュー */}
              <div className="absolute top-full right-0 mt-2 w-96 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-gray-200">
                <div className="py-2">
                  <Link
                    href="/about/japan"
                    className="block px-6 py-3 text-gray-700 hover:bg-kouei-blue transition-colors group/item"
                  >
                    <div className="font-bold group-hover/item:text-white">恒栄トレーディング</div>
                    <div className="text-sm text-gray-500 group-hover/item:text-white">Kouei Japan Trading Co., Ltd.</div>
                  </Link>

                  <Link
                    href="/about/vietnam"
                    className="block px-6 py-3 text-gray-700 hover:bg-kouei-blue transition-colors group/item"
                  >
                    <div className="font-bold group-hover/item:text-white">恒栄ベトナム</div>
                    <div className="text-sm text-gray-500 group-hover/item:text-white">Kouei Vietnam Trading Co., Ltd.</div>
                  </Link>

                  <Link
                    href="/about/myanmar"
                    className="block px-6 py-3 text-gray-700 hover:bg-kouei-blue transition-colors group/item"
                  >
                    <div className="font-bold group-hover/item:text-white">恒栄ミャンマー</div>
                    <div className="text-sm text-gray-500 group-hover/item:text-white">Kouei Japan Trading Co., Ltd. Myanmar Branch</div>
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/contact" className={getLinkClassName('contact')}>
              お問い合わせ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
