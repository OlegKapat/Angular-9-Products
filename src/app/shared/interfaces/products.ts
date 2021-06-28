export interface Features {
  features: string;
}
export interface Plans {
  id: number;
  paymentInterval: string;
  priceCents: number;
  currency: string;
}
export interface Product {
  id: number;
  name: string;
  feature: Features[];
  plans: Plans[];
}
