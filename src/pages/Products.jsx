import ProductTable from '../features/products/ProductTable';
import styled from 'styled-components';
import Hero from '../ui/Hero.jsx';
import FilterSort from '../ui/FilterSort.jsx';
import Heading from '../ui/Heading.jsx';
import Banner from '../ui/Banner.jsx';
import Ticker from '../ui/Ticker.jsx';

const StyledProducts = styled.section`
  display: grid;
  /* grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'ticker ticker'
    'hero hero'
    'heading menuButton'
    'filterSort filterSort'
    'productTable productTable'
    'banner banner'; */
  padding-top: var(--top);
`;

const HeadingContainer = styled.div`
  /* padding: var(--cell); */
  padding-bottom: 0.5rem;
  border-bottom: var(--border);
`;

function Products() {
  return (
    <StyledProducts>
      {/* <Ticker />
      <Hero
        text='Since 1976 Magis produces experimental, aesthetic and functional
            Italian-made furniture'
      /> */}
      <HeadingContainer>
        <Heading as='h3'>Shop the collection</Heading>
      </HeadingContainer>
      <FilterSort />
      {/* <ProductTable />
      <Banner
        text='Creating beautiful spaces indoors and outdoors. '
        size='h1'
      /> */}
    </StyledProducts>
  );
}

export default Products;
