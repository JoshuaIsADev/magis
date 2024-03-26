import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledFilter = styled.select``;

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFilterCategory = searchParams.get('category');

  function handleFilterCategory(value) {
    setSearchParams({ category: value });
  }

  return (
    <select
      onChange={(e) => handleFilterCategory(e.target.value)}
      value={selectedFilterCategory || 'all'}
    >
      <option value='all'>All</option>
      <option value='Chair'>Chairs</option>
      <option value='Table'>Tables</option>
      <option value='Sofa'>Sofas</option>
      {/* <option value='benches'>Benches</option> */}
    </select>
  );
}

export default Filter;
