import { useSearchParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import ProductRow from './ProductRow';
import { useProducts } from './useProducts';

function ProductTable() {
  const { isPending, products } = useProducts();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  const filterValue = searchParams.get('category') || 'all';
  const filterValueDesigner = searchParams.get('designer') || 'all';

  let filteredProducts;
  if (filterValue === 'all') filteredProducts = products;
  if (filterValueDesigner === 'all') filteredProducts = products;

  if (filterValueDesigner !== 'all')
    filteredProducts = products.filter(
      (product) => product.designer === filterValueDesigner
    );
  if (filterValue !== 'all')
    filteredProducts = products.filter(
      (product) => product.category === filterValue
    );
  if (filterValue !== 'all' && filterValueDesigner !== 'all')
    filteredProducts = products.filter(
      (product) =>
        product.category === filterValue &&
        product.designer === filterValueDesigner
    );

  // if (filteredProducts.length === 0) {
  //   console.log('No products match your search criteria.');
  // }

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
