export interface Product {
  id: string;
  category?: string | undefined;
  subCategory?: string | undefined;
  image?: string | undefined;
  title?: string | undefined;
  price?: string | undefined;
  vote?: string | number | undefined;
  score?: number | undefined;
  shortDescription?: string | undefined;
  description?: string | undefined;
  numberOfReviewers?: number | undefined;
  favorite?: boolean;
  check?: boolean;
  name?: string;
}

export interface ExProduct {
  product: Product;
  quantity: number;
}

export interface MemberComment {
  id: string;
  text?: string;
  member?: string;
}
export interface cartProps {
  id: number;
  image: string;
  quantity?: number;
  price: number;
  totalPrice: number;
  detail: string;
  title: string;
}

export interface BlogProps {
  id: number;
  image: string;
  title: string;
  subTitle: string;
  date: string;
}
