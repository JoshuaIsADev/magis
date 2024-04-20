import Section from '../ui/Section';
import ProductTableOperations from '../features/products/ProductTableOperations';
import ProductTable from '../features/products/ProductTable';
import Heading from '../ui/Heading';
import { spreadText, spreadTextSection } from '../utils/spreadText.jsx';
import { useContext, useEffect } from 'react';
import { HeadingContext } from '../context/headingContext.jsx';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { HeroText, SectionHeading } from '../ui/HeroText.jsx';

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
  }, [setHeadingColor]);

  return (
    <>
      <Section $variation='hero' ref={ref}>
        <Heading as='h2' $variation='hero' $color={headingColor}>
          Since 1976 Magis produces experimental, aesthetic and functional
          Italian-made furniture
        </Heading>
        <HeroText>{spreadText('Magis', 'hero')}</HeroText>
      </Section>

      <Section>
        <SectionHeading>
          {spreadTextSection('Shop the collection', 'hero')}
        </SectionHeading>
        <ProductTableOperations />
        <ProductTable />
      </Section>
    </>
  );
}

export default Products;
