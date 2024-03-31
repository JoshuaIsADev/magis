import { useParams } from 'react-router-dom';
import { useProducts } from '../features/products/useProducts';
import Spinner from '../ui/Spinner';
import Section from '../ui/Section';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

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

const InfoRow = styled.div`
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

const QuantityContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

function ProductPage() {
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [addToCart, setAddToCart] = useState();
  const { isPending, products } = useProducts();
  const { id: productId } = useParams();

  useEffect(() => {
    console.log(addToCart);
  }, [addToCart]);

  if (isPending) return <Spinner />;
  const product = products.find((p) => p.id === Number(productId));

  function handleColorClick(clickedColor) {
    setColor(clickedColor);
  }

  function handleQuantityAdd() {
    setQuantity((quantity) => quantity + 1);
  }

  function handleQuantitySubtract() {
    if (quantity > 0) setQuantity((quantity) => quantity - 1);
  }

  function handleAddToCart() {
    setAddToCart((prevCart) => {
      if (!Array.isArray(prevCart)) {
        return [{ color, quantity }];
      }
      return [...prevCart, { color, quantity }];
    });
    setColor('');
    setQuantity(0);
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
              <InfoRow>
                <p>{product.designer}</p>
              </InfoRow>
              <h3>Description</h3>
              <InfoRow>
                <p>{product.description1}</p>
                {product.description2 ? <p>{product.description2}</p> : ''}
                {product.description ? <p>{product.description3}</p> : ''}
              </InfoRow>
              <h3>Unit price</h3>
              <InfoRow>
                <p>${product.unitPrice}</p>
              </InfoRow>
              <h3>Shop colors and quantity</h3>
              <InfoRow>
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
                <QuantityContainer>
                  <Button
                    $variation='quantity'
                    onClick={handleQuantitySubtract}
                  >
                    -
                  </Button>
                  <p>{quantity}</p>
                  <Button $variation='quantity' onClick={handleQuantityAdd}>
                    +
                  </Button>
                </QuantityContainer>
              </InfoRow>
              <InfoRow>
                <Button $variation='addToCart' onClick={handleAddToCart}>
                  Add to cart
                </Button>
              </InfoRow>
            </InfoContainer>
          </Article>
        </Container>
      </Section>
    </>
  );
}

export default ProductPage;
