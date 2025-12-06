const fs = require('fs');
const yaml = require('js-yaml');
const csv = require('csv-parser');

const manufacturersByCategory = {};
const results = [];

// CSVファイルを読み込む
fs.createReadStream('data/Makers_from_webflow_20251206.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Display=falseの場合はスキップ
    if (row['Display']?.toLowerCase() !== 'true') {
      return;
    }

    const makerName = row['Maker Name'];
    const makerNameEn = row['Maker Name (EN)'];
    const hasPartnership = row['Trade'] === '取引';
    const link = row['Link'] || null;

    // KindsとKinds2を統合してカテゴリを決定
    const categories = [];
    if (row['Kinds'] && row['Kinds'] !== '取引' && row['Kinds'] !== '' && !row['Kinds'].startsWith('http')) {
      categories.push(row['Kinds']);
    }

    if (row['Kinds2'] && row['Kinds2'] !== '取引' && row['Kinds2'] !== '' && !row['Kinds2'].startsWith('http')) {
      categories.push(row['Kinds2']);
    }

    // カテゴリがない場合は「その他」
    if (categories.length === 0) {
      categories.push('その他');
    }

    // 油圧・空圧機器と油空圧・液体機器を統合
    const normalizedCategories = categories.map(cat =>
      (cat === '油圧・空圧機器' || cat === '油空圧・液体機器') ? '油空圧・液体機器' : cat
    );

    // 各カテゴリに追加
    normalizedCategories.forEach(category => {
      if (!manufacturersByCategory[category]) {
        manufacturersByCategory[category] = [];
      }

      const manufacturer = {
        name: makerName,
        name_en: makerNameEn,
        has_partnership: hasPartnership
      };

      if (link) {
        manufacturer.link = link;
      }

      manufacturersByCategory[category].push(manufacturer);
    });
  })
  .on('end', () => {
    // カテゴリ順序を定義
    const categoryOrder = [
      '作業工具',
      '荷役運搬機器',
      '測定機器',
      '切削工具',
      '溶接関連',
      '塗装',
      '油空圧・液体機器',
      'ボルト・ナット',
      '安全具',
      '仮設機器',
      'ケミカル品',
      '電気',
      '橋梁・土木',
      '環境機器',
      '軸受（ベアリング）',
      '海外メーカー',
      'その他'
    ];

    // YAML出力用のデータ構造
    const outputData = {
      manufacturers: {
        categories: []
      }
    };

    // カテゴリ順に並べる
    categoryOrder.forEach(categoryName => {
      if (manufacturersByCategory[categoryName]) {
        const companies = manufacturersByCategory[categoryName];
        // 会社名でソート
        companies.sort((a, b) => a.name_en.localeCompare(b.name_en));

        outputData.manufacturers.categories.push({
          name: categoryName,
          companies: companies
        });
      }
    });

    // YAMLファイルに出力
    const yamlStr = yaml.dump(outputData, {
      noRefs: true,
      lineWidth: -1,
      sortKeys: false
    });

    fs.writeFileSync('content/manufacturers_new.yaml', yamlStr, 'utf8');

    console.log('✅ YAMLファイルを生成しました: content/manufacturers_new.yaml');
    console.log(`📊 カテゴリ数: ${outputData.manufacturers.categories.length}`);
    const totalCompanies = outputData.manufacturers.categories.reduce((sum, cat) => sum + cat.companies.length, 0);
    console.log(`📊 メーカー数: ${totalCompanies}`);
  });
