import { useState } from 'react';
import ProductTable from '../features/products/ProductTable';
import CreateProductForm from '../features/products/CreateProductForm';
import { useMutation, useQuery } from '@tanstack/react-query';
import Spinner from '../ui/Spinner';
import { deleteProduct, getProducts } from '../services/apiProducts';
import styled from 'styled-components';
import { VscChromeClose } from 'react-icons/vsc';
import Row from '../ui/Row';
import ProductTableOperations from '../features/products/ProductTableOperations';
import { useSearchParams } from 'react-router-dom';
import SectionHeading from '../ui/SectionHeading';
import Section from '../ui/Section';
import Hr from '../ui/Hr';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

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
    <Section>
      <SectionHeading text='Manage products' />
      <Hr />
      <ProductTableOperations />
      <ProductTable />
      <Hr />
      <Row $variation='formButtons'>
        {/* <Table role='table'>
        <ProductTable />
      </Table> */}
        <Button
          $variation='primary'
          onClick={() => setShowForm((show) => !show)}
        >
          Add new product
        </Button>
      </Row>

      {/* {showForm && <CreateProductForm />} */}
      {showForm && (
        <Modal>
          <Section>
            <Row>
              <Button onClick={() => setShowForm((show) => !show)}>
                <VscChromeClose />
              </Button>
            </Row>
            <SectionHeading text='Create a new product' />
            <Hr />
            <CreateProductForm />
          </Section>
        </Modal>
      )}
    </Section>
  );
}

export default ManageProducts;
