'use client'

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
          <nav className="hidden md:flex space-x-8">
            <Link href="/sales" className={getLinkClassName('sales')}>
              販売事業
            </Link>
            <Link href="/manufacturers" className={getLinkClassName('manufacturers')}>
              取扱メーカー
            </Link>
            <Link href="/about" className={getLinkClassName('about')}>
              会社概要
            </Link>
            <Link href="/contact" className={getLinkClassName('contact')}>
              お問い合わせ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
