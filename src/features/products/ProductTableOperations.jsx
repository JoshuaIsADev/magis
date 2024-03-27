import Filter from '../../ui/Filter';
import SortBy from '../../ui/SortBy';
import TableOperations from '../../ui/TableOperations';

function ProductTableOperations() {
  return (
    <TableOperations>
      <Filter />
      <SortBy />
    </TableOperations>
  );
}

export default ProductTableOperations;
