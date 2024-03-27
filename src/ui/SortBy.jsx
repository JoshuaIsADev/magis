import { useSearchParams } from 'react-router-dom';

function SortBy() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectSort = searchParams.get('sortBy') || '';
  // const selectedSort = searchParams.get('sort');
  function handleSort(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <>
      <select onChange={handleSort} value={selectSort}>
        {/* <option value='null'>Sort</option> */}
        <option value='name-asc'>Sort by product name (A-Z)</option>
        <option value='name-desc'>Sort by product name (Z-A)</option>
        <option value='unitPrice-asc'>Sort by price (low-high)</option>
        <option value='unitPrice-desc'>Sort by price (high-low)</option>
        <option value='designer-asc'>Sort by designer (A-Z)</option>
        <option value='designer-desc'>Sort by designer (Z-A)</option>
      </select>
    </>
  );
}

export default SortBy;
