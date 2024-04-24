import { useState } from 'react';
import ProductTable from '../features/products/ProductTable';
import CreateProductForm from '../features/products/CreateProductForm';
import { VscChromeClose } from 'react-icons/vsc';
import Row from '../ui/Row';
import ProductTableOperations from '../features/products/ProductTableOperations';
import SectionHeading from '../ui/SectionHeading';
import Section from '../ui/Section';
import Hr from '../ui/Hr';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
// import { useMutation, useQuery } from '@tanstack/react-query';
// import Spinner from '../ui/Spinner';
// import { deleteProduct, getProducts } from '../services/apiProducts';
// import { useSearchParams } from 'react-router-dom';

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
        <Button
          $variation='primary'
          onClick={() => setShowForm((show) => !show)}
        >
          Add new product
        </Button>
      </Row>

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
