#!/usr/bin/env python3
import csv
import yaml
from collections import defaultdict

# CSVファイルを読み込む
csv_file = 'data/Makers_from_webflow_20251206.csv'
manufacturers_by_category = defaultdict(list)

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)

    for row in reader:
        # Display=falseの場合はスキップ
        if row['Display'].lower() != 'true':
            continue

        maker_name = row['Maker Name']
        maker_name_en = row['Maker Name (EN)']
        has_partnership = row['Trade'] == '取引'
        link = row['Link'] if row['Link'] else None

        # KindsとKinds2を統合してカテゴリを決定
        categories = []
        if row['Kinds'] and row['Kinds'] not in ['取引', '']:
            # URLでない場合のみカテゴリとして扱う
            if not row['Kinds'].startswith('http'):
                categories.append(row['Kinds'])

        if row['Kinds2'] and row['Kinds2'] not in ['取引', '']:
            # URLでない場合のみカテゴリとして扱う
            if not row['Kinds2'].startswith('http'):
                categories.append(row['Kinds2'])

        # カテゴリがない場合は「その他」
        if not categories:
            categories = ['その他']

        # 油圧・空圧機器と油空圧・液体機器を統合
        categories = [
            '油空圧・液体機器' if cat in ['油圧・空圧機器', '油空圧・液体機器'] else cat
            for cat in categories
        ]

        # 各カテゴリに追加
        for category in categories:
            manufacturer = {
                'name': maker_name,
                'name_en': maker_name_en,
                'has_partnership': has_partnership
            }
            if link:
                manufacturer['link'] = link

            manufacturers_by_category[category].append(manufacturer)

# カテゴリ順序を定義
category_order = [
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
]

# YAML出力用のデータ構造
output_data = {
    'manufacturers': {
        'categories': []
    }
}

# カテゴリ順に並べる
for category_name in category_order:
    if category_name in manufacturers_by_category:
        companies = manufacturers_by_category[category_name]
        # 会社名でソート
        companies.sort(key=lambda x: x['name_en'])

        output_data['manufacturers']['categories'].append({
            'name': category_name,
            'companies': companies
        })

# YAMLファイルに出力
output_file = 'content/manufacturers_new.yaml'
with open(output_file, 'w', encoding='utf-8') as f:
    yaml.dump(output_data, f, allow_unicode=True, default_flow_style=False, sort_keys=False)

print(f"✅ YAMLファイルを生成しました: {output_file}")
print(f"📊 カテゴリ数: {len(output_data['manufacturers']['categories'])}")
total_companies = sum(len(cat['companies']) for cat in output_data['manufacturers']['categories'])
print(f"📊 メーカー数: {total_companies}")
