export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  size: string;
  image: string;
  notes: string[];
  origin: string;
  idealFor: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type CheckoutLineItem = {
  id: string;
  quantity: number;
};
