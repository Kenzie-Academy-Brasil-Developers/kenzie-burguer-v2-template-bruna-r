export interface ICartProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}
export interface ICartContext {
  addProductToCart: (currentProduct: ICartProduct) => void;
  currentSale: ICartProduct[];
  setCurrentSale: React.Dispatch<React.SetStateAction<ICartProduct[]>>;
  cartTotal: number;
  removeProductToCart: (productId: number) => void;
}
