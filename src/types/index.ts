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
  evaluate?: number | undefined;
  url_image?: string | undefined;
  weight?: number;
}

export interface ExProduct {
  id?: number;
  orderId: number;
  product: Product;
  quantity: number;
  packageName?: string;
  price?: any;
  color?: any;
  capacity?: any;
  order_id?: number;
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
