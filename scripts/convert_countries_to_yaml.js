const fs = require('fs');
const yaml = require('js-yaml');
const csv = require('csv-parser');

// 国名から国旗絵文字を取得するマッピング
const countryFlags = {
  'Algeria': '🇩🇿',
  'Angola': '🇦🇴',
  'Australia': '🇦🇺',
  'Austria': '🇦🇹',
  'Azerbaijan': '🇦🇿',
  'Bahrain': '🇧🇭',
  'Bangladesh': '🇧🇩',
  'Belgium': '🇧🇪',
  'Brazil': '🇧🇷',
  'Bulgaria': '🇧🇬',
  'Cambodia': '🇰🇭',
  'Canada': '🇨🇦',
  'Chile': '🇨🇱',
  'China': '🇨🇳',
  'Colombia': '🇨🇴',
  'Cyprus': '🇨🇾',
  'Czech': '🇨🇿',
  'Ecuador': '🇪🇨',
  'Egypt': '🇪🇬',
  'Estonia': '🇪🇪',
  'France': '🇫🇷',
  'Georgia': '🇬🇪',
  'Germany': '🇩🇪',
  'Ghana': '🇬🇭',
  'Greece': '🇬🇷',
  'Hong Kong': '🇭🇰',
  'Hungary': '🇭🇺',
  'India': '🇮🇳',
  'Indonesia': '🇮🇩',
  'Iran': '🇮🇷',
  'Iraq': '🇮🇶',
  'Ireland': '🇮🇪',
  'Israel': '🇮🇱',
  'Italy': '🇮🇹',
  'Japan': '🇯🇵',
  'Jordan': '🇯🇴',
  'Kazakhstan': '🇰🇿',
  'Kenya': '🇰🇪',
  'Kuwait': '🇰🇼',
  'Kyrgyzstan': '🇰🇬',
  'Laos': '🇱🇦',
  'Latvia': '🇱🇻',
  'Libya': '🇱🇾',
  'Malaysia': '🇲🇾',
  'Mexico': '🇲🇽',
  'Mongolia': '🇲🇳',
  'Morocco': '🇲🇦',
  'Myanmar': '🇲🇲',
  'Nepal': '🇳🇵',
  'Netherlands': '🇳🇱',
  'New Zealand': '🇳🇿',
  'Nigeria': '🇳🇬',
  'Oman': '🇴🇲',
  'Pakistan': '🇵🇰',
  'Palestine': '🇵🇸',
  'Papua New Guinea': '🇵🇬',
  'Peru': '🇵🇪',
  'Philippines': '🇵🇭',
  'Poland': '🇵🇱',
  'Portugal': '🇵🇹',
  'Qatar': '🇶🇦',
  'Romania': '🇷🇴',
  'Saudi Arabia': '🇸🇦',
  'Singapore': '🇸🇬',
  'South Africa': '🇿🇦',
  'South Korea': '🇰🇷',
  'Spain': '🇪🇸',
  'Sri Lanka': '🇱🇰',
  'Sweden': '🇸🇪',
  'Taiwan': '🇹🇼',
  'Tanzania': '🇹🇿',
  'Thailand': '🇹🇭',
  'Turkey': '🇹🇷',
  'Uganda': '🇺🇬',
  'UAE': '🇦🇪',
  'UK': '🇬🇧',
  'USA': '🇺🇸',
  'Uzbekistan': '🇺🇿',
  'Vietnam': '🇻🇳',
};

// エリア名の日本語マッピング
const areaNames = {
  'South East Asia': '東南アジア',
  'South Asia': '南アジア・オセアニア',
  'West Asia': '中東',
  'East Asia': '東アジア・中央アジア',
  'Europe': 'ヨーロッパ・南米',
  'Africa': 'アフリカ'
};

const countriesByArea = {};

// CSVファイルを読み込む
fs.createReadStream('data/Countries_from_webflow_20251206.csv')
  .pipe(csv())
  .on('data', (row) => {
    // show=falseの場合はスキップ
    if (row['show']?.toLowerCase() !== 'true') {
      return;
    }

    const name = row['Name'];
    const japanese = row['Japanese'] || name;
    const area = row['area'] || 'Other';
    const companies = parseInt(row['Number of Customer']) || 0;
    const flag = countryFlags[name] || '🏳️';

    if (!countriesByArea[area]) {
      countriesByArea[area] = [];
    }

    countriesByArea[area].push({
      name: japanese,
      flag: flag,
      companies: companies
    });
  })
  .on('end', () => {
    // エリア順序を定義
    const areaOrder = [
      'South East Asia',
      'South Asia',
      'West Asia',
      'East Asia',
      'Europe',
      'Africa'
    ];

    // YAML出力用のデータ構造
    const outputData = {
      overseas_sales: {
        header: {
          title: '海外販売先',
          subtitle: '※顧客登録（社内システム）と連動'
        },
        regions: []
      }
    };

    // エリア順に並べる
    areaOrder.forEach(area => {
      if (countriesByArea[area]) {
        const countries = countriesByArea[area];
        // 国名でソート
        countries.sort((a, b) => a.name.localeCompare(b.name, 'ja'));

        outputData.overseas_sales.regions.push({
          name: areaNames[area] || area,
          countries: countries
        });
      }
    });

    // YAMLファイルに出力
    const yamlStr = yaml.dump(outputData, {
      noRefs: true,
      lineWidth: -1,
      sortKeys: false
    });

    fs.writeFileSync('content/overseas-sales_new.yaml', yamlStr, 'utf8');

    console.log('✅ YAMLファイルを生成しました: content/overseas-sales_new.yaml');
    console.log(`📊 地域数: ${outputData.overseas_sales.regions.length}`);
    const totalCountries = outputData.overseas_sales.regions.reduce((sum, region) => sum + region.countries.length, 0);
    console.log(`📊 国数: ${totalCountries}`);
    const totalCompanies = outputData.overseas_sales.regions.reduce((sum, region) =>
      sum + region.countries.reduce((s, c) => s + c.companies, 0), 0);
    console.log(`📊 取引企業数: ${totalCompanies}`);
  });
