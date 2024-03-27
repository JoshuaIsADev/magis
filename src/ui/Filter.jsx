import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledFilter = styled.select``;

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFilter = searchParams.get('category');
  const selectedFilterDesigner = searchParams.get('designer');
  const selectedFilterMaterial = searchParams.get('material');

  function handleFilter(category, designer, material) {
    setSearchParams({
      category: category,
      designer: designer,
      material: material,
    });
  }

  return (
    <>
      <select
        onChange={(e) =>
          handleFilter(
            e.target.value,
            selectedFilterDesigner,
            selectedFilterMaterial
          )
        }
        value={selectedFilter || 'all'}
      >
        <option value='all'>Category</option>
        <option value='Chair'>Chairs</option>
        <option value='Table'>Tables</option>
        <option value='Sofa'>Sofas</option>
      </select>
      <select
        onChange={(e) =>
          handleFilter(selectedFilter, e.target.value, selectedFilterMaterial)
        }
        value={selectedFilterDesigner || 'all'}
      >
        <option value='all'>Designer</option>
        <option value='Konstantin Grcic'>Konstantin Grcic</option>
        <option value='Jasper Morrison'>Jasper Morrison</option>
        <option value='Marcel Wanders'>Marcel Wanders</option>
        <option value='Ronan & Erwan Bouroullec'>
          Ronan & Erwan Bouroullec
        </option>
      </select>
      <select
        onChange={(e) =>
          handleFilter(selectedFilter, selectedFilterDesigner, e.target.value)
        }
        value={selectedFilterMaterial || 'all'}
      >
        <option value='all'>Material</option>
        <option value='polypropylene'>Polypropylene</option>
        <option value='glass'>Glass</option>
        <option value='polycarbonate'>Polycarbonate</option>
        <option value='fabric'>Fabric</option>
        <option value='aluminium'>Aluminium</option>
        <option value='marble'>marble</option>
      </select>
    </>
  );
}

export default Filter;
