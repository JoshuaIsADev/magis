import { useSearchParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import ProductRow from './ProductRow';
import { useProducts } from './useProducts';

function ProductTable() {
  const { isPending, products } = useProducts();
  const [searchParams] = useSearchParams();

  if (isPending) return <Spinner />;
  const filterValueCategory = searchParams.get('category') || 'all';
  const filterValueDesigner = searchParams.get('designer') || 'all';
  const filterValueMaterial = searchParams.get('material') || 'all';
  // console.log(filterValueMaterial);

  //Filter
  let filteredProducts;
  if (filterValueCategory === 'all') filteredProducts = products;
  if (filterValueDesigner === 'all') filteredProducts = products;
  if (filterValueMaterial === 'all') filteredProducts = products;

  if (filterValueCategory !== 'all' && filterValueCategory !== 'null')
    filteredProducts = products.filter(
      (product) => product.category === filterValueCategory
    );
  if (filterValueDesigner !== 'all' && filterValueDesigner !== 'null')
    filteredProducts = products.filter(
      (product) => product.designer === filterValueDesigner
    );
  if (filterValueMaterial !== 'all' && filterValueMaterial !== 'null')
    filteredProducts = products.filter((product) =>
      product.material.includes(filterValueMaterial)
    );

  if (
    filterValueCategory !== 'all' &&
    filterValueCategory !== 'null' &&
    filterValueDesigner !== 'all' &&
    filterValueDesigner !== 'null'
  )
    filteredProducts = products.filter(
      (product) =>
        product.category === filterValueCategory &&
        product.designer === filterValueDesigner
    );
  if (
    filterValueCategory !== 'all' &&
    filterValueCategory !== 'null' &&
    filterValueMaterial !== 'all' &&
    filterValueMaterial !== 'null'
  )
    filteredProducts = products.filter(
      (product) =>
        product.category === filterValueCategory &&
        product.material.includes(filterValueMaterial)
    );
  if (
    filterValueDesigner !== 'all' &&
    filterValueDesigner !== 'null' &&
    filterValueMaterial !== 'all' &&
    filterValueMaterial !== 'null'
  )
    filteredProducts = products.filter(
      (product) =>
        product.designer === filterValueDesigner &&
        product.material.includes(filterValueMaterial)
    );
  if (
    filterValueCategory !== 'all' &&
    filterValueCategory !== 'null' &&
    filterValueDesigner !== 'all' &&
    filterValueDesigner !== 'null' &&
    filterValueMaterial !== 'all' &&
    filterValueMaterial !== 'null'
  )
    filteredProducts = products.filter(
      (product) =>
        product.category === filterValueCategory &&
        product.designer === filterValueDesigner &&
        product.material.includes(filterValueMaterial)
    );

  if (filteredProducts.length === 0) {
    console.log('No products match your search criteria.');
  }

  console.log(filteredProducts);

  //Sort
  const selectedSort = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = selectedSort.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (typeof a[field] === 'string') {
      return a[field].localeCompare(b[field]) * modifier;
    } else {
      return (a[field] - b[field]) * modifier;
    }
  });
  // console.log(field, direction, modifier);

  return (
    <>
      {/* {filteredProducts.map((product) => (
        <ProductRow key={product.id} role='row' product={product} />
      ))} */}
      {sortedProducts.map((product) => (
        <ProductRow key={product.id} role='row' product={product} />
      ))}
      {filteredProducts.length === 0 ? (
        <p>No products match your search criteria.</p>
      ) : (
        ''
      )}
    </>
  );
}

export default ProductTable;
