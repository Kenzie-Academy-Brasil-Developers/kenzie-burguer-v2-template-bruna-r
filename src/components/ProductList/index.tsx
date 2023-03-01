import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { ProductsContext } from '../../providers/ProductsContext/Products.Context';

const ProductList = () => {
  const { searchProduct } = useContext(ProductsContext);

  return (
    <StyledProductList>
      {searchProduct.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
