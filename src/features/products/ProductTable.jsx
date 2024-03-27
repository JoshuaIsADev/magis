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

  // if (filterValue === 'Chair')
  //   filteredProducts = products.filter(
  //     (product) => product.category === 'Chair'
  //   );
  // if (filterValue === 'Table')
  //   filteredProducts = products.filter(
  //     (product) => product.category === 'Table'
  //   );
  // if (filterValue === 'Sofa')
  //   filteredProducts = products.filter(
  //     (product) => product.category === 'Sofa'
  //   );
  // if (filterValueDesigner === 'Konstantin Grcic')
  //   filteredProducts = products.filter(
  //     (product) => product.designer === 'Konstantin Grcic'
  //   );

  if (filterValue !== 'all' && filterValue !== 'null')
    filteredProducts = products.filter(
      (product) => product.category === filterValue
    );
  if (filterValueDesigner !== 'all' && filterValueDesigner !== 'null')
    filteredProducts = products.filter(
      (product) => product.designer === filterValueDesigner
    );

  console.log(filteredProducts);

  // if (
  //   filterValue === 'Chair' &&
  //   filterValueDesigner === 'Ronan & Erwan Bouroullec'
  // ) {
  //   filteredProducts = products.filter(
  //     (product) =>
  //       product.designer === 'Ronan & Erwan Bouroullec' &&
  //       product.category === 'Chair'
  //   );
  // }

  if (filteredProducts.length === 0) {
    console.log('No products match your search criteria.');
  }

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
