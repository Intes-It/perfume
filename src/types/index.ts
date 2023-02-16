export interface Product {
  id: string;
  group?: string | undefined;
  subGroup?: string | undefined;
  image?: string | undefined;
  title?: string | undefined;
  price?: string | undefined;
  vote?: string | number | undefined;
  score?: number | undefined;
  shortDescription?: string | undefined;
  description?: string | undefined;
  numberOfReviewers?: number | undefined;
  name: string;
  check?: boolean;
  name: string;
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
