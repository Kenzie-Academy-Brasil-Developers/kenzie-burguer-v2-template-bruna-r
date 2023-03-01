import { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { IProducts, IProductsContext, IResponseProducts } from './@types';
import { api } from '../../services/api';
import { IDefaultError, IDefaultProviderProps } from '../UserContext/@types';

export const ProductsContext = createContext<IProductsContext>(
  {} as IProductsContext
);

export const ProductsProvider = ({ children }: IDefaultProviderProps) => {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [isOpened, setIsOpened] = useState(false);

  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('@TOKEN');
    if (token) {
      const readProducts = async () => {
        try {
          const response = await api.get<IResponseProducts | any>(`/products`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProducts(response.data);
          navigate('/shop');
        } catch (error) {
          const currentError = error as AxiosError<IDefaultError>;
          toast.error(currentError.response?.data.error);
        }
      };
      readProducts();
    }
  }, []);

  // eslint-disable-next-line arrow-body-style
  const searchProduct = products.filter((product) => {
    return search === ''
      ? true
      : product.name.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <ProductsContext.Provider
      value={{
        products,
        setProducts,
        isOpened,
        setIsOpened,
        search,
        setSearch,
        searchProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
