export interface Product {
  createdAt: string; // ISO date string
  productName: string;
  img: string;
  price: number;
  detail: string;
  category: string[]; // Assuming array of strings
  infDetail?: infDetail; // Assuming object with unknown structure
  rating: number | 0;
  id: string;
}

interface infDetail {
  productName: string;
  img: string;
  price: number;
  detail: string;
  rating: number | 0;
  category: string[];
}
