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
│   ├── Header.tsx         # 共通ヘッダーコンポーネント
│   ├── Footer.tsx         # 共通フッターコンポーネント
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
          link: https://www.daia-net.co.jp/
          display: true  # 表示/非表示管理
```

**表示管理システム:**
- `display: true` - ページに表示
- `display: false` - データは保持するが非表示
- 全358社に明示的に設定済み

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

## 共通コンポーネント

### Header コンポーネント
**ファイル**: `components/Header.tsx`

**特徴**:
- 全8ページで共通使用
- ロゴ画像とナビゲーションリンク
- 現在ページのハイライト機能
- レスポンシブ対応（モバイルではナビ非表示）

**使用方法**:
```tsx
import Header from '@/components/Header'

<Header currentPage="sales" />
// currentPage: 'home' | 'sales' | 'manufacturers' | 'about' | 'contact'
```

**適用ページ**:
- トップページ (home)
- 販売事業 (sales)
- 取扱メーカー (manufacturers)
- 会社概要 (about)
- お問い合わせ (contact)
- 日本本社 (about)
- ベトナム拠点 (about)
- ミャンマー支店 (about)

### Footer コンポーネント
**ファイル**: `components/Footer.tsx`

**特徴**:
- 全8ページで共通使用
- 3カラムレイアウト（事業内容、グローバルオフィス、お問い合わせ）
- メールアイコン付きお問い合わせ情報
- Copyright表記（2025年）

**使用方法**:
```tsx
import Footer from '@/components/Footer'

<Footer />
```

**内容**:
- 事業内容リンク（販売事業、取扱メーカー）
- グローバルオフィス一覧
- お問い合わせ先（kouei.contact@kjt.co.jp）
- お問い合わせフォームリンク

**メリット**:
- 1ファイル編集で全ページに即座に反映
- デザイン統一性の確保
- メンテナンス性の向上

## 頻出パターン・コンポーネント

### 1. ページヘッダー（非推奨：共通Headerコンポーネントを使用）
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
  - [x] メーカーデータ管理（358社、20カテゴリ）
  - [x] 海外販売先データ管理（63カ国、9地域、851社）
- [x] **取扱メーカーページ完全実装**
  - [x] シンプルリストレイアウト（5列グリッド）
  - [x] 表示/非表示管理システム（display: true/false）
  - [x] ホバーエフェクト（ブランドカラー #0095d2）
  - [x] 取引先バッジ表示（オレンジ色タグ）
  - [x] レスポンシブ対応（xl:5列, lg:4列, md:3列, sm:2列）
  - [x] 全358社のデータ管理（表示292社、非表示66社）
- [x] **共通コンポーネントシステム**
  - [x] Header コンポーネント（全8ページ共通）
  - [x] Footer コンポーネント（全8ページ共通）
  - [x] 現在ページハイライト機能
  - [x] 1ファイル編集で全ページ一括更新

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

**最終更新**: 2025年12月8日
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

### データ統計（最終更新: 2025年12月7日）
- **メーカー**: 358社（全社）、19カテゴリ
  - 292社表示 / 66社非表示
  - 全19カテゴリに表示管理設定済み
  - 空カテゴリは自動非表示機能実装済み
- **海外販売先**: 63カ国、9地域、851社

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
- **取扱メーカーページ実装完了（2025年12月7日）**
  - 全358社のデータ管理（CSV完全取得）
  - display: true/false による表示/非表示管理
  - カード型レイアウトから5列シンプルリストに変更
  - 作業工具・荷役運搬機器・測定機器の表示順序を現行サイトに合わせて調整
- **共通コンポーネント実装（2025年12月7日）**
  - Header/Footerコンポーネントを全8ページで共通化
  - 1ファイル編集で全ページに自動反映
  - デザイン統一性とメンテナンス性の大幅向上
  - aboutページのKOUEIグループについてセクション削除（重複コンテンツ除去）

## 取扱メーカーページ実装詳細

### デザイン仕様
- **レイアウト**: 5列グリッド（xl）、4列（lg）、3列（md）、2列（sm）、1列（mobile）
- **ホバーエフェクト**:
  - 会社名: gray-900 → kouei-blue (#0095d2)
  - 英語名: gray-400 → gray-600
  - トランジション: 200ms
- **取引先バッジ**:
  - 背景: orange-100
  - 文字: orange-600
  - サイズ: 10px
  - テキスト: "取引"

### データ管理
- **ソース**: `data/Makers_from_webflow_20251206.csv`
- **変換**: Python script `perfect_csv_to_yaml.py`
- **出力**: `content/manufacturers.yaml`
- **管理方式**:
  - 全358社のデータを保持
  - `display: true` で表示する会社を管理
  - `display: false` で非表示（データは削除しない）

### カテゴリ別表示設定（全19カテゴリ）
1. **作業工具**: 19社表示 / 10社非表示
2. **荷役運搬機器**: 20社表示 / 7社非表示
3. **測定機器**: 30社表示 / 6社非表示
4. **油空圧・液体機器**: 51社表示 / 5社非表示
5. **電気**: 15社表示 / 2社非表示
6. **安全具**: 8社表示 / 1社非表示
7. **切削工具**: 9社表示 / 3社非表示
8. **溶接関連**: 4社表示 / 0社非表示
9. **仮設機器**: 3社表示 / 0社非表示
10. **塗装**: 12社表示 / 1社非表示
11. **油圧・空圧機器**: 3社表示 / 2社非表示
12. **ケミカル品**: 9社表示 / 2社非表示
13. **環境機器**: 6社表示 / 2社非表示
14. **ボルト・ナット**: 36社表示 / 7社非表示
15. **橋梁・土木**: 25社表示 / 1社非表示
16. **軸受（ベアリング）**: 2社表示 / 3社非表示
17. **ゴム製品**: 5社表示 / 0社非表示
18. **金属加工品**: 8社表示 / 0社非表示
19. **海外メーカー**: 27社表示 / 12社非表示

**合計**: 292社表示 / 66社非表示 / 全358社

### 空カテゴリ非表示機能
表示する会社が0社のカテゴリは、見出しごと自動的に非表示になります。

**実装方法**:
```tsx
{manufacturers.categories?.filter(category =>
  category.companies.some(company => company.display !== false)
).map((category, categoryIndex) => (
  // カテゴリと会社を表示
))}
```

**メリット**:
- 「その他」などの空カテゴリが表示されない
- データは保持されたまま（将来的に表示可能）
- ページが整理されて見やすくなる
## 最新の更新履歴（2025年12月8日）

### 組織詳細ページのデザイン刷新

#### ベトナム・ミャンマー・日本ページの統一デザイン実装
- **シンプルレイアウト**: カード型から表形式に変更
- **ボックス型デザイン**: 会社概要セクションを境界線付きテーブルに変更
- **ホバーエフェクト**: テーブル行に `hover:bg-gray-50 transition-colors` を追加
- **フォントサイズ縮小**: 全体的に小さく読みやすいサイズに調整
  - h1: `text-3xl md:text-4xl` → `text-2xl`
  - h2: `text-2xl` または `text-3xl` → `text-xl`
  - 本文: `text-base` → `text-sm`
  - テーブルセル: `py-4` → `py-3`

#### ベトナムページ (/about/vietnam)
- 2カラムレイアウト: 左側にテキスト、右側にチーム写真
- 業務内容: カードから箇条書きに変更
- 会社概要: ボックス型テーブルデザイン
- Instagram連携を会社概要テーブル内に統合

#### ミャンマーページ (/about/myanmar)
- ヒーロー画像: ミャンマーの街並み（myanmar-hero.jpg）
- 業務内容: シンプルな箇条書きリスト
- 会社概要: ボックス型テーブルデザイン
- 会社名に日本語・英語の両方を表示

#### 日本ページ (/about/japan)
- 全体的なフォントサイズを縮小
- Vision/Mission セクションのテキストサイズ調整
- 弊社の強みセクションのアイコンとテキストサイズ縮小
- テーブルデザインを統一

### トップページのメインビジュアル実装

#### 背景画像の設定
- **画像ソース**: `data/main_images/main_image.jpg` → `/public/main-image.jpg`
- **画像サイズ**: オリジナルサイズを維持（1440x800想定）
- **トリミング**: `clipPath: 'inset(0% 0 15% 0)'`
  - 上部: 0%カット
  - 下部: 15%カット
  - 表示範囲: 85%
- **実装方法**: 通常の `<img>` タグを使用（Next.js Image最適化を回避し画質維持）

#### スペーシング調整
- **メインイメージ下部マージン**: 0px
- **バナーセクション**:
  - 上部パディング: 0px (`pt-0`)
  - 下部パディング: 20px (`pb-[20px]`)
- **海外販売先セクション**:
  - 上部パディング: 30px (`pt-[30px]`)
  - 下部パディング: 64px (`pb-16`)

### 全ページ背景画像実装（2025年12月8日 追加実装）

#### 実装対象ページと画像
全5ページにヘッダー背景画像を実装しました。すべての画像はオリジナルサイズを維持し、品質劣化なく表示されます。

- **日本本社ページ** (/about/japan)
  - 画像: `/public/main-image.jpg` (235KB)
  - テキストオーバーレイ: 会社名（日本語・英語）

- **ベトナム拠点ページ** (/about/vietnam)
  - 画像: `/public/vietnam-bg.png` (1.2MB)
  - テキストオーバーレイ: 会社名（日本語・英語）
  - 白色テキスト表示

- **ミャンマー支店ページ** (/about/myanmar)
  - 画像: `/public/myanmar-bg.jpg` (485KB)
  - テキストオーバーレイ: 会社名（日本語・英語）
  - 白色テキスト表示
  - 従来のヒーロー画像セクションを置き換え

- **お問い合わせページ** (/contact)
  - 画像: `/public/contact-bg.jpg` (389KB)
  - テキストオーバーレイ: ページタイトルと説明文
  - 白色テキスト表示

- **取扱メーカーページ** (/manufacturers)
  - 画像: `/public/supplier-bg.jpg` (263KB)
  - テキストオーバーレイ: ページタイトル
  - 白色テキスト表示

#### 実装パターン
すべてのページで統一された実装パターンを使用:

```tsx
{/* ヘッダー画像 */}
<section className="relative w-full flex items-center justify-center bg-white">
  <div className="relative overflow-hidden" style={{ width: '100%' }}>
    <img
      src="/[image-name].jpg"
      alt="KOUEI [Page] Background"
      className="block w-full"
    />
    {/* テキストオーバーレイ */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
          {pageTitle}
        </h1>
      </div>
    </div>
  </div>
</section>
```

#### 技術的特徴
- **画像品質**: 通常の `<img>` タグを使用し、Next.js Image最適化を回避
- **サイズ指定なし**: width/height属性を設定せず、オリジナルサイズを維持
- **レスポンシブ**: `w-full` でコンテナ幅100%、高さは自動調整
- **オーバーレイ**: `absolute inset-0` で画像全体にテキストを中央配置
- **統一デザイン**: 全ページで同じHTML構造とクラス名を使用

#### ファイルコピー
画像ソースから公開フォルダへのコピー:
```bash
cp data/main_images/image_vn001.png public/vietnam-bg.png
cp data/main_images/image_myanmar001.jpg public/myanmar-bg.jpg
cp data/main_images/image_contact.jpg public/contact-bg.jpg
cp data/main_images/image_supplier.jpg public/supplier-bg.jpg
# main_image.jpg は既にコピー済み
```

### 技術的な実装詳細

#### CSSクラス使用パターン
- **カスタムパディング**: `pt-[10px]`, `pb-[20px]`, `pt-[30px]` など
- **clip-path**: `clipPath: 'inset(0% 0 15% 0)'` で画像トリミング
- **ホバーエフェクト**: `hover:bg-gray-50 transition-colors` で統一

#### レスポンシブ対応
- 小さい画面でも読みやすいフォントサイズ
- テーブルは `md:grid-cols-4` で適切に分割
- 画像は幅100%で表示、高さは自動調整

### ファイル変更一覧
- `app/page.tsx`: トップページのメインビジュアルとスペーシング調整
- `app/about/vietnam/page.tsx`: デザイン刷新、フォントサイズ縮小、背景画像追加
- `app/about/myanmar/page.tsx`: デザイン刷新、フォントサイズ縮小、背景画像置き換え
- `app/about/japan/page.tsx`: フォントサイズ縮小、背景画像追加
- `app/contact/page.tsx`: 背景画像追加
- `app/manufacturers/page.tsx`: 背景画像追加
- `public/main-image.jpg`: トップページ・日本ページ背景画像（235KB）
- `public/vietnam-bg.png`: ベトナムページ背景画像（1.2MB）
- `public/myanmar-bg.jpg`: ミャンマーページ背景画像（485KB）
- `public/contact-bg.jpg`: お問い合わせページ背景画像（389KB）
- `public/supplier-bg.jpg`: 取扱メーカーページ背景画像（263KB）
- `CLAUDE.md`: ドキュメント更新

### 今後の改善検討事項
- [ ] ベトナムページのチーム写真追加 (`/public/vietnam-team.jpg`)
- [ ] モバイル表示の最適化確認
- [ ] ページ読み込みパフォーマンスの測定
- [ ] 背景画像のalt属性多言語対応

