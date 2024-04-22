import { useState } from 'react';
import ProductTable from '../features/products/ProductTable';
import CreateProductForm from '../features/products/CreateProductForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import Spinner from '../ui/Spinner';
import { deleteProduct, getProducts } from '../services/apiProducts';
import styled from 'styled-components';
import Row from '../ui/Row';
import ProductTableOperations from '../features/products/ProductTableOperations';
import { useSearchParams } from 'react-router-dom';

const Table = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Img = styled.img`
  width: 12rem;
  aspect-ratio: 1;
  object-fit: contain;
`;

function ManageProducts() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <h3>Manage products</h3>
      <ProductTableOperations />
      <Table role='table'>
        <ProductTable />
      </Table>
      <button onClick={() => setShowForm((show) => !show)}>
        Add new product
      </button>
      {showForm && <CreateProductForm />}
    </>
  );
}

export default ManageProducts;
