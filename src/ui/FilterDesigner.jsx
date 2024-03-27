import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledFilter = styled.select``;

function FilterDesigner() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedFilterDesigner = searchParams.get('designer');

  function handleFilterDesigner(value) {
    setSearchParams({ designer: value });
  }

  return (
    <>
      <select
        onChange={(e) => handleFilterDesigner(e.target.value)}
        value={selectedFilterDesigner || 'all'}
      >
        <option value='all'>All</option>
        <option value='Konstantin Grcic'>Konstantin Grcic</option>
        <option value='Jasper Morrison'>Jasper Morrison</option>
        <option value='Marcel Wanders'>Marcel Wanders</option>
        <option value='Ronan & Erwan Bouroullec'>
          Ronan & Erwan Bouroullec
        </option>
        {/* <option value='benches'>Benches</option> */}
      </select>
    </>
  );
}

export default FilterDesigner;
