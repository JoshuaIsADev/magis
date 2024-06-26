import { useSearchParams } from 'react-router-dom';
import { Heading } from './Heading.jsx';
import Button from './Button';
import styled, { keyframes } from 'styled-components';

const StyledFilterSort = styled.div`
  grid-column: span 6;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: var(--grid-gap);
  padding-bottom: 6rem;
`;

const DropdownAnimation = keyframes`
  0% {
    opacity: 0;
    transform: translateY(0rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
  `;

const FilterSortDropdown = styled.nav`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
  opacity: 1;
  &.show {
    position: relative;
    opacity: 1;
    animation: ${DropdownAnimation} 0.5s ease-in-out forwards;
    z-index: 2;
  }
`;

const ColumnFilterSort = styled.div`
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  @media (max-width: 1000px) {
    grid-column: span 3;
  }
  @media (max-width: 500px) {
    grid-column: span 6;
  }
`;

function FilterSort({ showDropdown }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFilter = searchParams.get('category');
  const selectedFilterDesigner = searchParams.get('designer');
  const selectedFilterMaterial = searchParams.get('material');
  const selectSort = searchParams.get('sortBy') || '';

  // const [showDropdown, setShowDropdown] = useState(false);

  function handleSort(sortValue) {
    searchParams.set('sortBy', sortValue);
    setSearchParams(searchParams);
  }

  function handleFilterCategory(category) {
    searchParams.set('category', category);
    setSearchParams(searchParams);
  }

  function handleFilterDesigner(designer) {
    searchParams.set('designer', designer);
    setSearchParams(searchParams);
  }

  function handleFilterMaterial(material) {
    searchParams.set('material', material);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilterSort>
      {showDropdown && (
        <FilterSortDropdown>
          <ColumnFilterSort>
            <Heading as='h1' $variation='filterSort'>
              Category
            </Heading>
            <Button
              onClick={() => handleFilterCategory('all')}
              className={
                searchParams.get('category') === 'all' ? 'selected' : ''
              }
            >
              All
            </Button>
            <Button
              onClick={() => handleFilterCategory('Chair')}
              className={
                searchParams.get('category') === 'Chair' ? 'selected' : ''
              }
            >
              Chairs
            </Button>
            <Button
              onClick={() => handleFilterCategory('Table')}
              className={
                searchParams.get('category') === 'Table' ? 'selected' : ''
              }
            >
              Tables
            </Button>
            <Button
              onClick={() => handleFilterCategory('Lounge')}
              className={
                searchParams.get('category') === 'Lounge' ? 'selected' : ''
              }
            >
              Lounge
            </Button>
          </ColumnFilterSort>

          <ColumnFilterSort>
            <Heading as='h1' $variation='filterSort'>
              Designer
            </Heading>
            <Button
              onClick={() => handleFilterDesigner('all')}
              className={
                searchParams.get('designer') === 'all' ? 'selected' : ''
              }
            >
              All
            </Button>
            <Button
              onClick={() => handleFilterDesigner('Konstantin Grcic')}
              className={
                searchParams.get('designer') === 'Konstantin Grcic'
                  ? 'selected'
                  : ''
              }
            >
              Konstantin Grcic
            </Button>
            <Button
              onClick={() => handleFilterDesigner('Jasper Morrison')}
              className={
                searchParams.get('designer') === 'Jasper Morrison'
                  ? 'selected'
                  : ''
              }
            >
              Jasper Morrison
            </Button>
            <Button
              onClick={() => handleFilterDesigner('Marcel Wanders')}
              className={
                searchParams.get('designer') === 'Marcel Wanders'
                  ? 'selected'
                  : ''
              }
            >
              Marcel Wanders
            </Button>
            <Button
              onClick={() => handleFilterDesigner('Ronan & Erwan Bouroullec')}
            >
              Ronan & Erwan Bouroullec
            </Button>
          </ColumnFilterSort>
          <ColumnFilterSort>
            <Heading as='h1' $variation='filterSort'>
              Material
            </Heading>
            <Button
              onClick={() => handleFilterMaterial('all')}
              className={
                searchParams.get('material') === 'all' ? 'selected' : ''
              }
            >
              All
            </Button>
            <Button
              onClick={() => handleFilterMaterial('polypropylene')}
              className={
                searchParams.get('material') === 'polypropylene'
                  ? 'selected'
                  : ''
              }
            >
              Polypropylene
            </Button>
            <Button
              onClick={() => handleFilterMaterial('glass')}
              className={
                searchParams.get('material') === 'glass' ? 'selected' : ''
              }
            >
              Glass
            </Button>
            <Button
              onClick={() => handleFilterMaterial('polycarbonate')}
              className={
                searchParams.get('material') === 'polycarbonate'
                  ? 'selected'
                  : ''
              }
            >
              Polycarbonate
            </Button>
            <Button
              onClick={() => handleFilterMaterial('fabric')}
              className={
                searchParams.get('material') === 'fabric' ? 'selected' : ''
              }
            >
              Fabric
            </Button>
            <Button
              onClick={() => handleFilterMaterial('marble')}
              className={
                searchParams.get('material') === 'marble' ? 'selected' : ''
              }
            >
              Marble
            </Button>
            <Button
              onClick={() => handleFilterMaterial('aluminium')}
              className={
                searchParams.get('material') === 'aluminium' ? 'selected' : ''
              }
            >
              Aluminium
            </Button>
          </ColumnFilterSort>
          <ColumnFilterSort>
            <Heading as='h1' $variation='filterSort'>
              Sort
            </Heading>
            <Button
              onClick={() => handleSort('name-asc')}
              className={
                searchParams.get('sortBy') === 'name-asc' ? 'selected' : ''
              }
            >
              Product name (A-Z)
            </Button>
            <Button
              onClick={() => handleSort('name-desc')}
              className={
                searchParams.get('sortBy') === 'name-desc' ? 'selected' : ''
              }
            >
              Product name (Z-A)
            </Button>
            <Button
              onClick={() => handleSort('unitPrice-asc')}
              className={
                searchParams.get('sortBy') === 'unitPrice-asc' ? 'selected' : ''
              }
            >
              Price (low-high)
            </Button>
            <Button
              onClick={() => handleSort('unitPrice-desc')}
              className={
                searchParams.get('sortBy') === 'unitPrice-desc'
                  ? 'selected'
                  : ''
              }
            >
              Price (high-low)
            </Button>
            <Button
              onClick={() => handleSort('designer-asc')}
              className={
                searchParams.get('sortBy') === 'designer-asc' ? 'selected' : ''
              }
            >
              Designer (A-Z)
            </Button>
            <Button
              onClick={() => handleSort('designer-desc')}
              className={
                searchParams.get('sortBy') === 'designer-desc' ? 'selected' : ''
              }
            >
              Designer (Z-A)
            </Button>
          </ColumnFilterSort>
        </FilterSortDropdown>
      )}
    </StyledFilterSort>
  );
}

export default FilterSort;
