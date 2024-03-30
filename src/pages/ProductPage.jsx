import { useParams } from 'react-router-dom';
import { useProducts } from '../features/products/useProducts';
import Spinner from '../ui/Spinner';
import Section from '../ui/Section';
import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr;
  gap: 10rem;
  justify-content: center;
`;

const ImageContainer = styled.div`
  position: static;
  top: 0;
  /* height: 100%; */
  align-items: center;
  justify-content: center;
  background-color: gray;
`;

const Img = styled.img`
  object-fit: contain;
  width: 100%;
`;

const Article = styled.article`
  /* min-width: 1000px; */
`;

const InfoContainer = styled.div`
  display: grid;
  grid-template-columns: 20rem auto;
  gap: 4rem;
`;

const DataContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--pading-m);
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.button`
  width: 3rem;
  height: 3rem;
  border-radius: 3rem;
  border: none;
  cursor: pointer;
  outline: ${(props) =>
    props.$active ? '1px solid var(--color-grey-300)' : 'none'};
  outline-offset: 0.4rem;
  &:hover {
    outline: 1px solid var(--color-grey-300);
    outline-offset: 0.4rem;
  }
`;

function ProductPage() {
  const [color, setColor] = useState('');
  const { isPending, products } = useProducts();
  const { id: productId } = useParams();
  if (isPending) return <Spinner />;
  const product = products.find((p) => p.id === Number(productId));

  function handleColorClick(clickedColor) {
    setColor(clickedColor);
    console.log(clickedColor);
  }

  return (
    <>
      <Section>
        <Container>
          <ImageContainer>
            <Img src={product.image[0]} />
          </ImageContainer>
          <Article>
            <header>
              <h1 className='productHeading'>{product.name}</h1>
            </header>
            <InfoContainer>
              <h3>Designed by</h3>
              <DataContainer>
                <p>{product.designer}</p>
              </DataContainer>
              <h3>Description</h3>
              <DataContainer>
                <p>{product.description1}</p>
                {product.description2 ? <p>{product.description2}</p> : ''}
                {product.description ? <p>{product.description3}</p> : ''}
              </DataContainer>
              <h3>Unit price</h3>
              <DataContainer>
                <p>${product.unitPrice}</p>
              </DataContainer>
              <h3>Shop colors and quantity</h3>
              <DataContainer>
                <ButtonContainer>
                  <Button
                    color='black'
                    $active={color === 'black'}
                    onClick={() => handleColorClick('black')}
                  ></Button>
                  <Button
                    color='green'
                    $active={color === 'green'}
                    onClick={() => handleColorClick('green')}
                  ></Button>
                  <Button
                    color='red'
                    $active={color === 'red'}
                    onClick={() => handleColorClick('red')}
                  ></Button>
                </ButtonContainer>
              </DataContainer>
            </InfoContainer>
          </Article>
        </Container>
      </Section>
    </>
  );
}

export default ProductPage;
