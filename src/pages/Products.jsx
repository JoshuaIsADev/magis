import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/apiProducts';
import Spinner from '../ui/Spinner';
import ProductCard from '../ui/ProductCard';

function Products() {
  const {
    isLoading,
    data: products,
    error,
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  });
  if (isLoading) return <Spinner />;

  // console.log(products);
  return (
    <>
      <p>Filter / Sort</p>
      <div>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}

export default Products;
