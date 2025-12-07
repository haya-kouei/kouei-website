#!/usr/bin/env python3
"""
Convert CSV manufacturer data to YAML format
Filters by Display=true and groups by Kinds and Kinds2 categories
"""

import csv
import json
from collections import defaultdict
from pathlib import Path

def convert_csv_to_yaml(csv_path, yaml_path):
    # Read CSV file
    manufacturers_by_category = defaultdict(list)

    with open(csv_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)

        for row in reader:
            # Filter: Only Display=true
            if row['Display'].strip().lower() != 'true':
                continue

            # Determine category (Kinds2 takes priority, then Kinds)
            category = row['Kinds2'].strip() if row['Kinds2'].strip() else row['Kinds'].strip()

            if not category:
                print(f"Warning: No category for {row['Maker Name']}")
                continue

            # Create manufacturer entry
            manufacturer = {
                'name': row['Maker Name'].strip(),
                'name_en': row['Maker Name (EN)'].strip(),
                'link': row['Link'].strip() if row['Link'].strip() else '',
                'has_partnership': row['Trade'].strip() == '取引'
            }

            manufacturers_by_category[category].append(manufacturer)

    # Sort categories and manufacturers
    categories = []
    for category_name in sorted(manufacturers_by_category.keys()):
        companies = manufacturers_by_category[category_name]
        # Sort companies by name
        companies.sort(key=lambda x: x['name'])

        categories.append({
            'name': category_name,
            'companies': companies
        })

    # Write YAML file manually
    with open(yaml_path, 'w', encoding='utf-8') as f:
        f.write('manufacturers:\n')
        f.write('  categories:\n')
        
        for category in categories:
            f.write(f'    - name: {category["name"]}\n')
            f.write('      companies:\n')
            
            for company in category['companies']:
                f.write(f'        - name: {company["name"]}\n')
                f.write(f'          name_en: {company["name_en"]}\n')
                f.write(f'          has_partnership: {str(company["has_partnership"]).lower()}\n')
                if company['link']:
                    f.write(f'          link: {company["link"]}\n')

    # Print summary
    total_manufacturers = sum(len(cat['companies']) for cat in categories)
    print(f"Successfully converted {total_manufacturers} manufacturers into {len(categories)} categories")
    print(f"Output written to: {yaml_path}")

    # Print category summary
    print("\nCategories:")
    for cat in categories:
        print(f"  - {cat['name']}: {len(cat['companies'])} companies")

if __name__ == '__main__':
    csv_path = Path(__file__).parent.parent / 'data' / 'Makers_from_webflow_20251206.csv'
    yaml_path = Path(__file__).parent.parent / 'content' / 'manufacturers.yaml'

    convert_csv_to_yaml(csv_path, yaml_path)
