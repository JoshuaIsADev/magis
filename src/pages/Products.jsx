import ProductTable from '../features/products/ProductTable';
import { useContext, useEffect } from 'react';
import { HeadingContext } from '../context/headingContext.jsx';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Hero from '../ui/Hero.jsx';
import FilterSort from '../ui/FilterSort.jsx';
import Heading from '../ui/Heading.jsx';
import Banner from '../ui/Banner.jsx';
import Ticker from '../ui/Ticker.jsx';

const StyledProducts = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'ticker ticker'
    'hero hero'
    'heading menuButton'
    'filterSort filterSort'
    'productTable productTable'
    'banner banner';
  padding-top: var(--top);
`;

const HeadingContainer = styled.div`
  grid-area: heading;
  padding: var(--cell);
  border-bottom: var(--border);
  border-left: var(--border);
`;

function Products() {
  const { headingColor, setHeadingColor, ref, inView } =
    useContext(HeadingContext);
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === '/products' &&
      headingColor === 'var(--color-grey-900)' &&
      inView
    ) {
      setHeadingColor('var(--color-brand)');
    }
  }, [location, headingColor, setHeadingColor, inView]);

  useEffect(() => {
    return () => {
      setHeadingColor('var(--color-grey-900)');
    };
  }, [setHeadingColor]);

  return (
    <>
      <StyledProducts>
        <Ticker />
        <Hero
          text='Since 1976 Magis produces experimental, aesthetic and functional
            Italian-made furniture'
        />
        <HeadingContainer>
          <Heading as='h3'>Shop the collection</Heading>
        </HeadingContainer>
        <FilterSort />
        <ProductTable />
        <Banner
          text='Creating beautiful spaces indoors and outdoors. '
          size='h1'
        />
      </StyledProducts>
    </>
  );
}

export default Products;
