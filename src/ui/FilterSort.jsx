import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { VscDebugBreakpointFunction } from 'react-icons/vsc';
import {
  Button,
  DropdownContent,
  DropdownContainer,
  DropdownRow,
  Column,
} from './DropDown';
import Heading from './Heading';
import Hr from './Hr';

function FilterSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFilter = searchParams.get('category');
  const selectedFilterDesigner = searchParams.get('designer');
  const selectedFilterMaterial = searchParams.get('material');
  const selectSort = searchParams.get('sortBy') || '';

  const [showDropdown, setShowDropdown] = useState(false);

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
    <>
      <DropdownContainer>
        <DropdownRow $variation='menu'>
          <Heading as='h3'>Shop</Heading>

          <Button
            $variation='menu'
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Filter / Sort
          </Button>
          <VscDebugBreakpointFunction
            transform={showDropdown && 'rotate(180)'}
            className={showDropdown ? 'downArrow' : 'arrow'}
          />
        </DropdownRow>
        <Hr />
        {/* {showDropdown && ( */}
        <DropdownContent className={showDropdown ? 'show' : ''}>
          <DropdownRow>
            <Column>
              <Heading as='h4' $variation='dropdown'>
                Category
              </Heading>
            </Column>
            <Column>
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
                onClick={() => handleFilterCategory('Sofa')}
                className={
                  searchParams.get('category') === 'Sofa' ? 'selected' : ''
                }
              >
                Sofa
              </Button>
            </Column>
          </DropdownRow>
          <DropdownRow>
            <Column>
              <Heading as='h4' $variation='dropdown'>
                Designer
              </Heading>
            </Column>
            <Column>
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
            </Column>
          </DropdownRow>
          <DropdownRow>
            <Column>
              <Heading as='h4' $variation='dropdown'>
                Material
              </Heading>
            </Column>
            <Column>
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
            </Column>
          </DropdownRow>
          <DropdownRow>
            <Column>
              <Heading as='h4' $variation='dropdown'>
                Sort
              </Heading>
            </Column>
            <Column>
              <Button
                onClick={() => handleSort('name-asc')}
                className={
                  searchParams.get('sortBy') === 'name-asc' ? 'selected' : ''
                }
              >
                Sort by product name (A-Z)
              </Button>
              <Button
                onClick={() => handleSort('name-desc')}
                className={
                  searchParams.get('sortBy') === 'name-desc' ? 'selected' : ''
                }
              >
                Sort by product name (Z-A)
              </Button>
              <Button
                onClick={() => handleSort('unitPrice-asc')}
                className={
                  searchParams.get('sortBy') === 'unitPrice-asc'
                    ? 'selected'
                    : ''
                }
              >
                Sort by price (low-high)
              </Button>
              <Button
                onClick={() => handleSort('unitPrice-desc')}
                className={
                  searchParams.get('sortBy') === 'unitPrice-desc'
                    ? 'selected'
                    : ''
                }
              >
                Sort by price (high-low)
              </Button>
              <Button
                onClick={() => handleSort('designer-asc')}
                className={
                  searchParams.get('sortBy') === 'designer-asc'
                    ? 'selected'
                    : ''
                }
              >
                Sort by designer (A-Z)
              </Button>
              <Button
                onClick={() => handleSort('designer-desc')}
                className={
                  searchParams.get('sortBy') === 'designer-desc'
                    ? 'selected'
                    : ''
                }
              >
                Sort by designer (Z-A)
              </Button>
            </Column>
          </DropdownRow>
          <DropdownRow>
            <Button onClick={() => setShowDropdown(false)}>Apply</Button>
          </DropdownRow>
          {/* <Hr /> */}
        </DropdownContent>
        {/* ) } */}
      </DropdownContainer>
    </>
  );
}

export default FilterSort;
