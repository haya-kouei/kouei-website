#!/usr/bin/env python3
"""
完璧なCSV→YAML変換スクリプト
Displayフィールドを無視し、全てのメーカーを抽出
PyYAMLを使わず、手動でYAML形式を出力
"""

import csv
from collections import defaultdict
from pathlib import Path

def escape_yaml_string(s):
    """YAML文字列をエスケープ"""
    if ':' in s or '#' in s or s.startswith(' ') or s.endswith(' '):
        return f'"{s}"'
    return s

def write_yaml_company(f, company, indent='        '):
    """メーカー情報をYAML形式で書き込み"""
    f.write(f"{indent}- name: {escape_yaml_string(company['name'])}\n")
    f.write(f"{indent}  name_en: {escape_yaml_string(company['name_en'])}\n")
    f.write(f"{indent}  has_partnership: {'true' if company['has_partnership'] else 'false'}\n")
    if 'link' in company:
        f.write(f"{indent}  link: {company['link']}\n")

def main():
    # ファイルパス
    csv_path = Path(__file__).parent.parent / 'data' / 'Makers_from_webflow_20251206.csv'
    yaml_path = Path(__file__).parent.parent / 'content' / 'manufacturers.yaml'

    # カテゴリ別にメーカーを格納
    categories = defaultdict(list)

    # CSVを読み込み
    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)

        for row in reader:
            # メーカー情報を抽出
            manufacturer = {
                'name': row['Maker Name'].strip(),
                'name_en': row['Maker Name (EN)'].strip(),
                'has_partnership': row['Trade'].strip() == '取引',
            }

            # リンクがある場合のみ追加
            if row['Link'].strip():
                manufacturer['link'] = row['Link'].strip()

            # Kindsカテゴリに追加
            if row['Kinds'].strip():
                categories[row['Kinds'].strip()].append(manufacturer.copy())

            # Kinds2カテゴリにも追加
            if row['Kinds2'].strip():
                kind2 = row['Kinds2'].strip()
                # 同じメーカーが同じカテゴリに重複しないようチェック
                if kind2 != row['Kinds'].strip():
                    categories[kind2].append(manufacturer.copy())

    # カテゴリの優先順序
    category_order = [
        '作業工具',
        '荷役運搬機器',
        '測定機器',
        '油空圧・液体機器',
        '電気',
        '安全具',
        '切削工具',
        '溶接関連',
        '仮設機器',
        '塗装',
        '油圧・空圧機器',
        'ケミカル品',
        '環境機器',
        'ボルト・ナット',
        '橋梁・土木',
        '軸受（ベアリング）',
        'ゴム製品',
        '金属加工品',
        '海外メーカー',
    ]

    # YAMLファイルに書き込み
    total_companies = 0
    partnership_count = 0
    category_count = 0

    with open(yaml_path, 'w', encoding='utf-8') as f:
        f.write("manufacturers:\n")
        f.write("  categories:\n")

        # 優先順序に従ってカテゴリを追加
        for cat_name in category_order:
            if cat_name in categories and categories[cat_name]:
                category_count += 1
                # メーカー名でソート
                sorted_companies = sorted(
                    categories[cat_name],
                    key=lambda x: x['name']
                )

                f.write(f"    - name: {cat_name}\n")
                f.write(f"      companies:\n")

                for company in sorted_companies:
                    write_yaml_company(f, company)
                    total_companies += 1
                    if company['has_partnership']:
                        partnership_count += 1

        # 優先順序にない残りのカテゴリも追加
        for cat_name in sorted(categories.keys()):
            if cat_name not in category_order and categories[cat_name]:
                category_count += 1
                sorted_companies = sorted(
                    categories[cat_name],
                    key=lambda x: x['name']
                )

                f.write(f"    - name: {cat_name}\n")
                f.write(f"      companies:\n")

                for company in sorted_companies:
                    write_yaml_company(f, company)
                    total_companies += 1
                    if company['has_partnership']:
                        partnership_count += 1

    # 統計情報を表示
    print("=" * 60)
    print("CSV → YAML 変換完了（全メーカー抽出）")
    print("=" * 60)
    print(f"\n総カテゴリ数: {category_count}")
    print("\nカテゴリ別メーカー数:")

    for cat_name in category_order:
        if cat_name in categories and categories[cat_name]:
            count = len(categories[cat_name])
            partnerships = sum(1 for c in categories[cat_name] if c['has_partnership'])
            partnership_info = f" ({partnerships}社が取引提携)" if partnerships > 0 else ""
            print(f"  {cat_name}: {count}社{partnership_info}")

    # 残りのカテゴリ
    for cat_name in sorted(categories.keys()):
        if cat_name not in category_order and categories[cat_name]:
            count = len(categories[cat_name])
            partnerships = sum(1 for c in categories[cat_name] if c['has_partnership'])
            partnership_info = f" ({partnerships}社が取引提携)" if partnerships > 0 else ""
            print(f"  {cat_name}: {count}社{partnership_info}")

    print(f"\n総メーカー数: {total_companies}社")
    print(f"取引提携メーカー: {partnership_count}社")
    print(f"\n出力先: {yaml_path}")

if __name__ == '__main__':
    main()
