import ProductTable from '../features/products/ProductTable';
import styled from 'styled-components';
import { VscDebugBreakpointFunction } from 'react-icons/vsc';
import Hero from '../ui/Hero.jsx';
import FilterSort from '../ui/FilterSort.jsx';
import { Heading, HeadingContainer } from '../ui/Heading.jsx';
import Banner from '../ui/Banner.jsx';
import Ticker from '../ui/Ticker.jsx';
import Button from '../ui/Button.jsx';
import { useState } from 'react';

const StyledProducts = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
  padding: 0 var(--padding-body);
`;

const MenuContainer = styled.div`
  grid-column: 1 / span 6;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
`;

const FilterSortContainer = styled.div`
  grid-column: 1 / span 6;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function Products() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <StyledProducts>
      {/* <Ticker />
      <Hero
        text='Since 1976 Magis produces experimental, aesthetic and functional
            Italian-made furniture'
      /> */}
      <HeadingContainer text='Shop the collections' />
      <MenuContainer>
        <FilterSortContainer>
          <Button
            $variation='secondary'
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Filter / Sort
          </Button>

          <VscDebugBreakpointFunction
            transform={showDropdown ? 'rotate(180)' : 'rotate(0)'}
            className={showDropdown ? 'downArrow' : 'arrow'}
          />
        </FilterSortContainer>
      </MenuContainer>
      <FilterSort showDropdown={showDropdown} />
      <ProductTable />
      {/* <Banner
        text='Creating beautiful spaces indoors and outdoors. '
        size='h1'
      /> */}
    </StyledProducts>
  );
}

export default Products;
