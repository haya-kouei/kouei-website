# CLAUDE.md - Claude Code AI Assistant 設定・コマンド集

## プロジェクト概要
このプロジェクトは株式会社恒栄トレーディングのコーポレートウェブサイトを Next.js + TypeScript + Tailwind CSS で構築したものです。

## 開発環境

### 技術スタック
- **Frontend**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v3
- **CMS**: YAML-based file system (CSV連携対応)
- **AI**: Anthropic Claude API (組織案内チャットボット)
- **Deployment**: Vercel
- **AI Assistant**: Claude Code

### ディレクトリ構成
```
kouei-website/
├── app/                    # Next.js 14 App Router
│   ├── page.tsx           # トップページ
│   ├── sales/page.tsx     # 販売事業ページ
│   ├── manufacturers/page.tsx # 取扱メーカーページ
│   ├── about/page.tsx     # 会社概要ページ
│   ├── contact/page.tsx   # お問い合わせページ
│   └── api/               # API Routes
│       ├── contact/       # お問い合わせAPI
│       └── organization-ai/ # 組織案内AI API
├── components/            # React コンポーネント
│   └── OrganizationChat.tsx # 組織案内チャットUI
├── content/               # YAML CMS データ
│   ├── company-info.yaml
│   ├── manufacturers.yaml    # CSV連携（68社、14カテゴリ）
│   ├── organizations.yaml    # 組織詳細データ（3拠点）
│   ├── overseas-sales.yaml   # CSV連携（63カ国、851社）
│   ├── sales-countries.yaml
│   └── topics.yaml
├── data/                  # CSVデータソース（Webflow CMS）
│   ├── Makers_from_webflow_20251206.csv
│   └── Countries_from_webflow_20251206.csv
├── scripts/               # データ変換スクリプト
│   ├── convert_csv_to_yaml.js      # メーカーCSV→YAML
│   └── convert_countries_to_yaml.js # 国CSV→YAML
├── lib/                   # ユーティリティ
│   └── content-loader.ts  # YAML データローダー
├── styles/                # グローバルスタイル
│   └── globals.css
└── public/                # 静的アセット
```

## よく使うコマンド

### 開発サーバー起動
```bash
npm run dev
```
→ http://localhost:3000 でアクセス

### ビルド
```bash
npm run build
```

### 型チェック
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## YAML CMS 管理

### コンテンツ更新手順
1. 該当YAMLファイルを編集
2. 変更をコミット・プッシュ
3. Vercel自動デプロイ

### 主要データファイル

#### 1. 会社情報 (`content/company-info.yaml`)
```yaml
company:
  name: "株式会社恒栄トレーディング"
  name_en: "Kouei Japan Trading Co., Ltd."
  established: "1994年"
  # ...その他企業情報
```

#### 2. 取扱メーカー (`content/manufacturers.yaml`)
```yaml
manufacturers:
  categories:
    - name: "作業工具"
      companies:
        - name: "株式会社ダイア"
          name_en: "DAIA CORPORATION"
          has_partnership: true
```

#### 3. 海外販売先 (`content/overseas-sales.yaml`)
```yaml
overseas_sales:
  regions:
    - name: "東南アジア"
      countries:
        - name: "ベトナム"
          flag: "🇻🇳"
          companies: 366
```

#### 4. 組織詳細データ (`content/organizations.yaml`)
```yaml
organizations:
  vietnam:
    name: "恒栄ベトナムトレーディング"
    name_en: "Kouei Vietnam Trading Co., Ltd."
    description: "KOUEIベトナムはベトナムローカルの法人です..."
    business_activities:
      - title: "ベトナム工場様向け輸入販売"
        description: "ベトナムの製造業向けに各種工具・機械の輸入販売..."
    partner_manufacturers: ["TONE", "KITO", "EXEN"]
    strengths: ["ベトナム現地法人として多様な輸入販売が可能"]
```

## デザインシステム

### カラーパレット
- **Primary**: `text-cyan-500` / `bg-cyan-500`
- **Secondary**: `text-gray-700` / `bg-gray-50`
- **Accent Colors**: 各セクション別（青・緑・紫・オレンジ等）

### よく使うTailwindクラス
```css
/* カードコンポーネント */
.card-hover {
  @apply hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2;
}

/* ブランドロゴ */
.brand-logo {
  @apply font-bold tracking-wider;
}

/* 統計数値 */
.stat-number {
  @apply text-4xl font-bold text-cyan-600;
}
```

## 頻出パターン・コンポーネント

### 1. ページヘッダー
```tsx
{/* ヘッダー */}
<header className="bg-gray-50 shadow-sm">
  <div className="container mx-auto px-4 py-4">
    <div className="flex justify-between items-center">
      <Link href="/" className="brand-logo text-3xl">KOUEI</Link>
      <nav className="hidden md:flex space-x-8">
        {/* ナビゲーションリンク */}
      </nav>
    </div>
  </div>
</header>
```

### 2. ヘッダー画像
```tsx
{/* ヘッダー画像 */}
<div className="h-48 bg-gradient-to-r from-cyan-100 to-cyan-200 relative overflow-hidden">
  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
  <div className="container mx-auto px-4 h-full flex items-center relative z-10">
    <h1 className="text-4xl font-bold text-gray-800">ページタイトル</h1>
  </div>
</div>
```

### 3. カード型コンポーネント
```tsx
<div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6">
    {/* アイコン */}
    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
      <svg className="w-6 h-6 text-white">...</svg>
    </div>
    <h3 className="text-xl font-bold text-white mb-2">タイトル</h3>
  </div>
  <div className="p-6">
    <p className="text-gray-600 mb-4">説明文</p>
    <Link href="#" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
      詳細を見る
      <svg className="w-4 h-4 ml-1">...</svg>
    </Link>
  </div>
</div>
```

## Git ワークフロー

### コミットメッセージ形式
```
feat: 新機能の追加
fix: バグ修正  
docs: ドキュメント更新
style: スタイル調整
refactor: リファクタリング
```

### よく使うGitコマンド
```bash
# ステージング
git add .

# コミット
git commit -m "feat: 新しい機能を追加"

# プッシュ
git push origin main

# ステータス確認
git status

# 差分確認
git diff
```

## トラブルシューティング

### 1. 開発サーバーが起動しない
```bash
# ポート確認
lsof -ti:3000

# プロセス終了
kill -9 <PID>

# 再起動
npm run dev
```

### 2. TypeScriptエラー
```bash
# 型チェック
npm run type-check

# TypeScript再起動 (VS Code)
Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### 3. YAMLデータが読み込まれない
- ファイルパス確認: `/content/*.yaml`
- YAML構文確認: インデント・コロンの記述
- content-loader.tsの型定義確認

## パフォーマンス最適化

### 1. 画像最適化
```tsx
import Image from 'next/image'

<Image
  src="/path/to/image.jpg"
  alt="説明"
  width={800}
  height={600}
  priority // 重要な画像のみ
/>
```

### 2. 動的インポート
```tsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
})
```

## デプロイ

### Vercel自動デプロイ
- GitHubプッシュで自動デプロイ
- プレビューURL自動生成
- 本番URL: https://kouei-website.vercel.app

### 手動デプロイ
```bash
vercel --prod
```

## 実装済み機能

### 完了した機能 ✅
- [x] **組織詳細ページ（3拠点）**
  - [x] ベトナム拠点詳細ページ (/about/vietnam)
  - [x] ミャンマー支店詳細ページ (/about/myanmar)
  - [x] 日本本社詳細ページ (/about/japan)
- [x] **YAML-based組織管理システム**
  - [x] organizations.yaml による3組織の詳細データ管理
  - [x] TypeScript型定義による型安全性確保
  - [x] 動的ページ生成とデータバインディング
- [x] **各組織カラーテーマ**
  - [x] ベトナム: 緑色テーマ
  - [x] ミャンマー: 紫色テーマ
  - [x] 日本本社: 青色テーマ
- [x] **組織案内AIチャットボット**
  - [x] Claude API統合による自然言語対応
  - [x] 3拠点（ベトナム・ミャンマー・日本）の詳細案内
  - [x] リアルタイムチャットUI
  - [x] フローティングチャットボタン
- [x] **CSV連携データ管理システム**
  - [x] Webflow CMSからCSVエクスポート
  - [x] 自動変換スクリプト（CSV→YAML）
  - [x] メーカーデータ管理（68社、14カテゴリ）
  - [x] 海外販売先データ管理（63カ国、851社）

## 今後の拡張予定

### 予定機能
- [ ] お問い合わせフォーム実装
- [ ] 多言語対応 (日/英)
- [ ] 検索機能
- [ ] サイトマップ生成

### 技術的改善
- [ ] パフォーマンス最適化
- [ ] SEO強化
- [ ] アクセシビリティ改善
- [ ] PWA対応

## 参考リンク

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vercel Docs](https://vercel.com/docs)

## 組織詳細ページ実装詳細

### 各組織の特徴
- **ベトナム拠点** (/about/vietnam)
  - パートナーメーカー: TONE、KITO、EXEN等7社
  - 展示会サポート実績: METALEX VIETNAM 2023
  - Instagram連携: @kouei_vietnam

- **ミャンマー支店** (/about/myanmar)
  - 設立: 2017年5月26日、資本金50,000 USD
  - 取引条件: USD・MMK支払い、CIF/DDP対応
  - Facebook連携: Kouei Trading Myanmar

- **日本本社** (/about/japan)
  - 法人情報: 法人番号、適格請求書番号、古物商許可証
  - 主要銀行: みずほ銀行、りそな銀行
  - 関連会社: 株式会社コニー

### YAML管理による利点
- **データ整合性**: 型安全なTypeScriptインターフェース
- **更新容易性**: YAMLファイル編集のみで即座に反映
- **拡張性**: 新しいフィールド追加が簡単
- **保守性**: Gitによるバージョン管理

---

**最終更新**: 2025年12月
**管理者**: Claude Code AI Assistant
**プロジェクト**: KOUEI Trading Corporate Website

## CSV連携システム

### データソース管理
- **Webflow CMS**: マスターデータ管理
- **CSVエクスポート**: 定期的にデータを更新
- **自動変換**: スクリプトでYAMLに変換

### 変換スクリプト使用方法

#### メーカーデータ更新
```bash
# CSVをdata/ディレクトリに配置
node scripts/convert_csv_to_yaml.js
# → content/manufacturers.yaml が更新される
```

#### 海外販売先データ更新
```bash
# CSVをdata/ディレクトリに配置
node scripts/convert_countries_to_yaml.js
# → content/overseas-sales.yaml が更新される
```

### データ統計（最終更新: 2025年12月）
- **メーカー**: 68社、14カテゴリ
- **海外販売先**: 63カ国、6地域、851社

## 組織案内AI

### 機能概要
- **AIモデル**: Claude 3.5 Sonnet
- **対応拠点**: ベトナム、ミャンマー、日本本社
- **データソース**: organizations.yaml
- **UI**: フローティングチャットボタン

### 使用方法
1. `.env.local` に APIキーを設定
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```
2. 開発サーバー起動
3. ページ右下のチャットボタンをクリック

### 質問例
- 「ベトナム拠点について教えてください」
- 「ミャンマー支店の連絡先を知りたい」
- 「日本本社の事業内容は？」

## 重要な実装ノート
- 全3組織の詳細ページ実装完了（バングラデシュ拠点は削除）
- YAML-based組織管理システム構築済み
- 各組織カラーテーマによる視覚的区別
- レスポンシブデザイン完全対応
- CSV連携による自動データ更新システム
- AI組織案内機能統合