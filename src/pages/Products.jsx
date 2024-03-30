import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../services/apiProducts';
import Spinner from '../ui/Spinner';
import ProductCard from '../ui/ProductCard-v1';
import Hr from '../ui/Hr';
import Section from '../ui/Section';
import ProductTableOperations from '../features/products/ProductTableOperations';
import ProductTable from '../features/products/ProductTable';

function Products() {
  // const {
  //   isLoading,
  //   data: products,
  //   error,
  // } = useQuery({
  //   queryKey: ['products'],
  //   queryFn: getProducts,
  // });
  // if (isLoading) return <Spinner />;

  // console.log(products);
  return (
    <>
      <Section>
        <header>
          <h1 className='homeHeading'>
            An idea must not only be “good”, it must also satisfy the criteria
            of aesthetics and functionality, now and in the future. And it must
            tell a story. The story of Magis. This is why Magis produces in
            Italy. To preserve the local tradition of craftsmanship and meet the
            most exacting standards with Italian-made quality.
          </h1>
        </header>
        <h2>Shop</h2>
      </Section>
      <Hr></Hr>
      <ProductTableOperations />
      <Hr></Hr>
      <Section>
        <ProductTable />
      </Section>
    </>
  );
}

export default Products;
