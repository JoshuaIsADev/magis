import Section from '../ui/Section';
import ProductTableOperations from '../features/products/ProductTableOperations';
import ProductTable from '../features/products/ProductTable';
import Heading from '../ui/Heading';
import { spreadText } from '../utils/spreadText.jsx';
import { useContext, useEffect } from 'react';
import { HeadingContext } from '../context/headingContext.jsx';
import { useLocation } from 'react-router-dom';

function Products() {
  const { headingColor, setHeadingColor, ref, inView } =
    useContext(HeadingContext);
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname === '/products' &&
      headingColor === 'var(--color-grey-900)' &&
      inView
    ) {
      setHeadingColor('var(--color-brand)');
    }
  }, [location, headingColor, setHeadingColor, inView]);

  useEffect(() => {
    return () => {
      setHeadingColor('var(--color-grey-900)');
    };
  }, []);

  return (
    <>
      <Section $variation='hero' ref={ref}>
        {spreadText('Magis')}
        <Heading as='h3' $variation='hero' $color={headingColor}>
          Since 1976 Magis produces
        </Heading>
        <Heading as='h2' $variation='hero' $color={headingColor}>
          Aesthetic, functional, Italian-made furniture
        </Heading>
      </Section>

      <Section>
        <ProductTableOperations />
        <ProductTable />
      </Section>
    </>
  );
}

export default Products;
