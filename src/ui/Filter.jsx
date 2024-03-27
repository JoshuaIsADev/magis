import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledFilter = styled.select``;

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFilter = searchParams.get('category');
  const selectedFilterDesigner = searchParams.get('designer');

  function handleFilter(category, designer) {
    setSearchParams({ category: category, designer: designer });
  }

  return (
    <>
      <select
        onChange={(e) => handleFilter(e.target.value, selectedFilterDesigner)}
        value={selectedFilter || 'all'}
      >
        <option value='all'>Category</option>
        <option value='Chair'>Chairs</option>
        <option value='Table'>Tables</option>
        <option value='Sofa'>Sofas</option>
      </select>
      <select
        onChange={(e) => handleFilter(selectedFilter, e.target.value)}
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
    </>
  );
}

export default Filter;
