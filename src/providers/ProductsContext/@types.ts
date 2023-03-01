export interface IProducts {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

export interface IResponseProducts {
  product: IProducts;
}

export interface IProductsContext {
  products: IProducts[];
  setProducts: React.Dispatch<React.SetStateAction<IProducts[]>>;
  isOpened: boolean;
  setIsOpened: React.Dispatch<React.SetStateAction<boolean>>;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  searchProduct: IProducts[];
}
