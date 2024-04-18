import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  DropdownButton,
  DropdownContent,
  DropdownContainer,
  ButtonContainer,
  Input,
  RadioContainer,
  Checkmark,
} from './DropDown';

function FilterSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFilter = searchParams.get('category');
  const selectedFilterDesigner = searchParams.get('designer');
  const selectedFilterMaterial = searchParams.get('material');
  const selectSort = searchParams.get('sortBy') || '';
  const [dropdownStates, setDropdownStates] = useState({
    showDropdownCategory: false,
    showDropdownDesigner: false,
    showDropdownMaterial: false,
    showDropdownSort: false,
  });

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

  function handleShowDropdown(value) {
    setDropdownStates((prevStates) => ({
      ...prevStates,
      [`showDropdown${value}`]: !prevStates[`showDropdown${value}`],
    }));

    Object.keys(dropdownStates).forEach((key) => {
      if (`showDropdown${value}` !== key) {
        setDropdownStates((prevStates) => ({
          ...prevStates,
          [key]: false,
        }));
      }
    });
  }

  return (
    <>
      <DropdownContainer>
        <ButtonContainer>
          <DropdownButton onClick={() => handleShowDropdown('Category')}>
            Category
          </DropdownButton>
          <DropdownButton onClick={() => handleShowDropdown('Designer')}>
            Designer
          </DropdownButton>
          <DropdownButton onClick={() => handleShowDropdown('Material')}>
            Material
          </DropdownButton>
          <DropdownButton onClick={() => handleShowDropdown('Sort')}>
            Sort
          </DropdownButton>
        </ButtonContainer>

        {dropdownStates.showDropdownCategory && (
          <DropdownContent>
            <RadioContainer>
              <Input
                type='radio'
                name='category'
                onChange={() => handleFilterCategory('all')}
              />
              <Checkmark />
              All
            </RadioContainer>
            <RadioContainer>
              <Input
                className='checkmark'
                type='radio'
                name='category'
                onChange={() => handleFilterCategory('Chair')}
              />
              <Checkmark />
              Chairs
            </RadioContainer>
            <RadioContainer>
              <Input
                className='checkmark'
                type='radio'
                name='category'
                onChange={() => handleFilterCategory('Table')}
              />
              <Checkmark />
              Tables
            </RadioContainer>
            <RadioContainer>
              <Input
                className='checkmark'
                type='radio'
                name='category'
                onChange={() => handleFilterCategory('Sofa')}
              />
              <Checkmark />
              Sofas
            </RadioContainer>
          </DropdownContent>
        )}

        {dropdownStates.showDropdownDesigner && (
          <DropdownContent>
            <p onClick={() => handleFilterDesigner('all')}>All</p>
            <p onClick={() => handleFilterDesigner('Konstantin Grcic')}>
              Konstantin Grcic
            </p>
            <p onClick={() => handleFilterDesigner('Jasper Morrison')}>
              Jasper Morrison
            </p>
            <p onClick={() => handleFilterDesigner('Marcel Wanders')}>
              Marcel Wanders
            </p>
            <p onClick={() => handleFilterDesigner('Ronan & Erwan Bouroullec')}>
              Ronan & Erwan Bouroullec
            </p>
          </DropdownContent>
        )}

        {dropdownStates.showDropdownMaterial && (
          <DropdownContent>
            <p onClick={() => handleFilterMaterial('all')}>All</p>
            <p onClick={() => handleFilterMaterial('polypropylene')}>
              Polypropylene
            </p>
            <p onClick={() => handleFilterMaterial('glass')}>Glass</p>
            <p onClick={() => handleFilterMaterial('polycarbonate')}>
              Polycarbonate
            </p>
            <p onClick={() => handleFilterMaterial('fabric')}>Fabric</p>
            <p onClick={() => handleFilterMaterial('marble')}>Marble</p>
            <p onClick={() => handleFilterMaterial('aluminium')}>Aluminium</p>
          </DropdownContent>
        )}

        {dropdownStates.showDropdownSort && (
          <DropdownContent>
            <p onClick={() => handleSort('name-asc')}>
              Sort by product name (A-Z)
            </p>
            <p onClick={() => handleSort('name-desc')}>
              Sort by product name (Z-A)
            </p>
            <p onClick={() => handleSort('unitPrice-asc')}>
              Sort by price (low-high)
            </p>
            <p onClick={() => handleSort('unitPrice-desc')}>
              Sort by price (high-low)
            </p>
            <p onClick={() => handleSort('designer-asc')}>
              Sort by designer (A-Z)
            </p>
            <p onClick={() => handleSort('designer-desc')}>
              Sort by designer (Z-A)
            </p>
          </DropdownContent>
        )}
      </DropdownContainer>
    </>
  );
}

export default FilterSort;
