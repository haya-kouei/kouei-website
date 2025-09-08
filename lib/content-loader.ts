import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'

const contentDirectory = path.join(process.cwd(), 'content')

export interface Topic {
  id: number
  date: string
  title: string
  description: string
  published: boolean
}

export interface Country {
  name: string
  flag: string
  companies: number
  code: string
  description?: string
}

export interface SalesRegion {
  region: string
  countries: Country[]
}

export interface Manufacturer {
  name: string
  logo: string
  category: string
  description: string
  products: string[]
  established: string
  website: string
}

export interface Office {
  name: string
  location: string
  established: string
  address?: string
  phone?: string
  description?: string
}

export interface Service {
  name: string
  description: string
}

export interface Certification {
  name: string
  description: string
  acquired: string
}

export interface HistoryEvent {
  year: string
  event: string
  description: string
}

export interface OverseasCountry {
  name: string
  flag: string
  companies: number
}

export interface OverseasRegion {
  name: string
  countries: OverseasCountry[]
}

export interface OverseasSales {
  header: {
    title: string
    subtitle: string
  }
  regions: OverseasRegion[]
}

export interface BusinessActivity {
  title: string
  description: string
}

export interface ContactInfo {
  name: string
  address: string
  phone: string | string[]
  email: string
  languages: string[]
}

export interface OrganizationOverview {
  type: string
  location: string
  coverage: string
  established: string
  representative: string
  employees: number | string
  capital?: string
  languages: string[]
}

export interface ExhibitionSupport {
  event: string
  description: string
  year: string
}

export interface CompanyAdditionalInfo {
  corporate_number: string
  qualified_invoice_number: string
  antique_dealer_license: string
  main_banks: string[]
  related_companies: string[]
}

export interface OrganizationInfo {
  name: string
  name_en: string
  name_local: string
  description: string
  overview: OrganizationOverview
  business_activities: BusinessActivity[]
  partner_manufacturers?: string[]
  exhibition_support?: ExhibitionSupport[]
  payment_conditions?: string[]
  sales_performance?: string[]
  company_info?: CompanyAdditionalInfo
  contact_info: {
    headquarters: ContactInfo & { website?: string }
  }
  social_media?: {
    instagram?: string
    facebook?: string
  }
  strengths?: string[]
}

export interface Organizations {
  vietnam: OrganizationInfo
  japan: OrganizationInfo
  myanmar: OrganizationInfo
  bangladesh: OrganizationInfo
}

export interface CompanyInfo {
  name: string
  name_en: string
  established: string
  capital: string
  employees: number
  president: string
  address: {
    postal_code: string
    prefecture: string
    city: string
    street: string
    building: string
    phone: string
    fax: string
    email: string
    website?: string
  }
  business_description: string
  mission: string
  vision: string
  values: string[]
  services: Service[]
  offices: Office[]
  history: HistoryEvent[]
  certifications: Certification[]
  additional_info?: {
    corporate_number: string
    qualified_invoice_number: string
    antique_dealer_license: string
    main_banks: string[]
    related_companies: string[]
  }
}

export async function getTopics(): Promise<Topic[]> {
  try {
    const filePath = path.join(contentDirectory, 'topics.yaml')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = yaml.load(fileContents) as { topics: Topic[] }
    return data.topics.filter(topic => topic.published).sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    )
  } catch (error) {
    console.error('Error loading topics:', error)
    return []
  }
}

export async function getSalesCountries(): Promise<SalesRegion[]> {
  try {
    const filePath = path.join(contentDirectory, 'sales-countries.yaml')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = yaml.load(fileContents) as { sales_countries: SalesRegion[] }
    return data.sales_countries
  } catch (error) {
    console.error('Error loading sales countries:', error)
    return []
  }
}

export async function getManufacturers(): Promise<Manufacturer[]> {
  try {
    const filePath = path.join(contentDirectory, 'manufacturers.yaml')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = yaml.load(fileContents) as { manufacturers: Manufacturer[] }
    return data.manufacturers
  } catch (error) {
    console.error('Error loading manufacturers:', error)
    return []
  }
}

export async function getCompanyInfo(): Promise<CompanyInfo | null> {
  try {
    const filePath = path.join(contentDirectory, 'company-info.yaml')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = yaml.load(fileContents) as { company: CompanyInfo }
    return data.company
  } catch (error) {
    console.error('Error loading company info:', error)
    return null
  }
}

export async function getOverseasSales(): Promise<OverseasSales | null> {
  try {
    const filePath = path.join(contentDirectory, 'overseas-sales.yaml')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = yaml.load(fileContents) as { overseas_sales: OverseasSales }
    return data.overseas_sales
  } catch (error) {
    console.error('Error loading overseas sales:', error)
    return null
  }
}

export async function getOrganizations(): Promise<Organizations | null> {
  try {
    const filePath = path.join(contentDirectory, 'organizations.yaml')
    const fileContents = fs.readFileSync(filePath, 'utf8')
    const data = yaml.load(fileContents) as { organizations: Organizations }
    return data.organizations
  } catch (error) {
    console.error('Error loading organizations:', error)
    return null
  }
}

export async function getOrganization(orgKey: keyof Organizations): Promise<OrganizationInfo | null> {
  try {
    const organizations = await getOrganizations()
    return organizations?.[orgKey] || null
  } catch (error) {
    console.error(`Error loading organization ${orgKey}:`, error)
    return null
  }
}