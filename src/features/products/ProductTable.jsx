import { useSearchParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import ProductRow from './ProductRow';
import { useProducts } from './useProducts';

function ProductTable() {
  const { isPending, products } = useProducts();
  const [searchParams] = useSearchParams();
  // console.log(typeof products[0].category);

  if (isPending) return <Spinner />;
  const filterValue = searchParams.get('category') || 'all';
  console.log(filterValue);

  let filteredProducts;
  if (filterValue === 'all') filteredProducts = products;
  if (filterValue === 'Chair')
    filteredProducts = products.filter(
      (product) => product.category === 'Chair'
    );
  // filteredProducts = 'test';
  if (filterValue === 'Table')
    filteredProducts = products.filter(
      (product) => product.category === 'Table'
    );
  if (filterValue === 'Sofa')
    filteredProducts = products.filter(
      (product) => product.category === 'Sofa'
    );

  console.log(filteredProducts);
  return (
    <>
      {/* {products.map((product) => (
        <ProductRow key={product.id} role='row' product={product} />
      ))} */}
      {filteredProducts.map((product) => (
        <ProductRow key={product.id} role='row' product={product} />
      ))}
    </>
  );
}

export default ProductTable;
