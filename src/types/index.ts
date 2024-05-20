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
  capacity?: any;
  color: any;
  packaging: any;
  thumbnail?: any;
  images: {
    id: number;
    name: string;
    url: string;
  }[];
}

export interface ExProduct {
  packaging: string;
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
  weight?: number;
  order: string | number;
  evaluate?: number;
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
export interface IListOrder {
  id: number;
  created_time: Date | string;
  modified_time: Date | string;
  id_order: string;
  payment_id: string;
  status: string;
  user_name: string;
  company_name: string;
  dif_company_name: string;
  first_name: string;
  dif_first_name: string;
  last_name: string;
  dif_last_name: string;
  phone_number: string;
  dif_phone_number: string;
  country: string;
  dif_country: string;
  province: string;
  dif_province: string;
  district: string;
  dif_district: string;
  ward: string;
  dif_ward: string;
  address: string;
  real_price: number;
  fee_ship: number;
  total_weight: number;
  total: number;
  total_price_cart: number;
  total_price_payment: number;
  sub_total: number;
  zip_code: number;
  dif_zip_code: number;
  note: string;
  email: string;
  dif_email: string;
  applied_voucher: string;
  user: number;
}
