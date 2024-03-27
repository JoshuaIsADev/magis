import Filter from '../../ui/Filter';
import FilterDesigner from '../../ui/FilterDesigner';
import TableOperations from '../../ui/TableOperations';

function ProductTableOperations() {
  return (
    <TableOperations>
      <Filter />
      {/* <FilterDesigner /> */}
    </TableOperations>
  );
}

export default ProductTableOperations;
