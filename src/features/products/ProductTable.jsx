import styled from 'styled-components';
import { Row } from '../../ui/Row';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../ui/Spinner';
import { getProducts } from '../../services/apiProducts';
import ProductRow from './ProductRow';

function ProductTable() {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
  if (isLoading) return <Spinner />;
  // console.log(products[0].imageUrl);

  return (
    <>
      {products.map((product) => (
        <ProductRow key={product.id} role='row' product={product} />
      ))}
    </>
  );
}

export default ProductTable;
