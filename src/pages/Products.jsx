import ProductTable from '../features/products/ProductTable';
import styled from 'styled-components';
import Hero from '../ui/Hero.jsx';
import FilterSort from '../ui/FilterSort.jsx';
import { Heading, HeadingContainer } from '../ui/Heading.jsx';
import Banner from '../ui/Banner.jsx';
import Ticker from '../ui/Ticker.jsx';

const StyledProducts = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  padding-bottom: var(--bottom);
`;

function Products() {
  return (
    <StyledProducts>
      {/* <Ticker />
      <Hero
        text='Since 1976 Magis produces experimental, aesthetic and functional
            Italian-made furniture'
      /> */}
      <HeadingContainer text='Shop the collectionss' />
      <FilterSort />
      <ProductTable />
      {/* <Banner
        text='Creating beautiful spaces indoors and outdoors. '
        size='h1'
      /> */}
    </StyledProducts>
  );
}

export default Products;
