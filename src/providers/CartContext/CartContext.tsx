import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ICartContext, ICartProduct } from './@types';
import { IDefaultProviderProps } from '../UserContext/@types';

export const CartContext = createContext<ICartContext>({} as ICartContext);

export const CartProvider = ({ children }: IDefaultProviderProps) => {
  const localStorageSale = localStorage.getItem('@KENZIEBURGUER');
  const [currentSale, setCurrentSale] = useState<ICartProduct[]>(
    localStorageSale ? JSON.parse(localStorageSale) : []
  );

  useEffect(() => {
    localStorage.setItem('@KENZIEBURGUER', JSON.stringify(currentSale));
  }, [currentSale]);

  const removeProductToCart = (productId: number) => {
    const newcurrentSale = currentSale.filter(
      (product) => product.id !== productId
    );
    setCurrentSale(newcurrentSale);
  };

  const cartTotal = currentSale.reduce(
    (acumulador, currentProduct) => (acumulador += currentProduct.price),
    0
  );

  const addProductToCart = (currentProduct: ICartProduct) => {
    if (!currentSale.some((product) => product.id === currentProduct.id)) {
      setCurrentSale([...currentSale, currentProduct]);
      toast.success('Produto adicionado ao carrinho');
    } else {
      toast.error('Não é possível adicionar item iguais ao carrinho');
    }
  };

  return (
    <CartContext.Provider
      value={{
        addProductToCart,
        currentSale,
        setCurrentSale,
        cartTotal,
        removeProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
