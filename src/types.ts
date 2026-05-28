export interface SubCategory {
  id: string;
  name: string;
  icon: string;
}

export interface Category {
  id: string;
  label: string;
  icon?: string;
  sub?: SubCategory[];
}

export interface Seller {
  id: string;
  name: string;
  level: 'level-2' | 'level-top' | string;
  cat: string;
  subcategory?: string;
  price: number;
  rating: string;
  reviews: number;
  delivery: string;
  response: string;
  orders?: string;
  title: string;
  desc: string;
  img: string;
  skills: string[];
  link: string;
  clicks?: number;
}
