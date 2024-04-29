import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import Spinner from '../../ui/Spinner';
import { useProducts } from './useProducts';
import ProductCard from './ProductCard';
import Row from '../../ui/Row';
import ProductCardManage from './ProductCardManage';
import styled from 'styled-components';

const StyledProductTable = styled.div`
  grid-area: productTable;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1px;
  background-color: var(--color-grey-200);
  &::after {
    content: '';
    background-color: var(--color-grey-0);
    grid-column: span 1;
  }
  border-bottom: var(--border);
  border-right: var(--border);
  border-left: var(--border);
`;

function ProductTable() {
  const { isPending, products } = useProducts();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const pathIsManage = location.pathname.includes('manage');

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
    <StyledProductTable>
      {pathIsManage ? (
        sortedProducts.map((product) => (
          <ProductCardManage key={product.id} role='row' product={product} />
        ))
      ) : (
        <>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </>
      )}
    </StyledProductTable>
    // <Row $variation='productCard'>
    //   {pathIsManage ? (
    //     sortedProducts.map((product) => (
    //       <ProductCardManage key={product.id} role='row' product={product} />
    //     ))
    //   ) : (
    //     <>
    //       {sortedProducts.map((product) => (
    //         <ProductCard key={product.id} product={product} />
    //       ))}
    //     </>
    //   )}
    // </Row>
  );
}

export default ProductTable;
