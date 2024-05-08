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
  amount: number;
  favorite?: boolean;
  check?: boolean;
  name?: string;
  evaluate?: number | undefined;
  url_image?: string | undefined;
  weight?: number;
  total_price_item?: string | number;
}

export interface ExProduct {
  id?: number;
  orderId: number;
  product: Product;
  quantity: number;
  amount: number;
  packageName?: string;
  price?: any;
  color?: any;
  capacity?: any;
  order_id?: number;
  total_price_item?: string | number;
  image: string;
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
