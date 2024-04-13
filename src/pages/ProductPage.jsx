import { useParams } from 'react-router-dom';
import { useProducts } from '../features/products/useProducts';
import Spinner from '../ui/Spinner';
import Section from '../ui/Section';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { CartContext } from '../context/cartContext';
import { useMainImage } from '../features/products/useMainImage';

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
  const [quantity, setQuantity] = useState(1);
  const { cartItems, setCartItems } = useContext(CartContext);
  const { isPending, products } = useProducts();
  const { id: productId } = useParams();
  // const mainImage = useMainImage(product.image);

  if (isPending) return <Spinner />;
  const product = products.find((p) => p.id === Number(productId));

  const selectedProductId = color + '-' + productId;
  //  + '-' + product.unitPrice
  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  const handleAdd = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleSubtract = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  function handleColorChange(e) {
    setColor(e.target.value);
  }

  function handleAddCartItems(cartItem) {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.selectedProductId === cartItem.selectedProductId
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += cartItem.quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
    }
  }

  function handleQuantityChange(e) {
    setQuantity(Number(e.target.value));
  }

  function handleSubmit(e) {
    const mainImage = product.image.find((img) => img.includes('main'));
    e.preventDefault();
    // const newCartItem = { color, quantity, productId };
    const newCartItem = {
      selectedProductId,
      quantity,
      unitPrice: product.unitPrice,
      color,
      mainImage,
    };
    handleAddCartItems(newCartItem);
    // checkIsItemInCart(newCartItem);
    setQuantity(1);
  }

  const disabled = !color || !quantity || quantity === 0;

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
              <form onSubmit={handleSubmit}>
                <InfoRow>
                  <div>
                    {product.color.map((color, index) => (
                      <input
                        key={index}
                        type='radio'
                        name='color'
                        value={color.colorName}
                        onChange={handleColorChange}
                        onKeyDown={handleKeyDown}
                      />
                    ))}
                  </div>
                  <div>
                    <button type='button' onClick={handleSubtract}>
                      -
                    </button>
                    <input
                      type='number'
                      name='quantity'
                      min='0'
                      max='100'
                      step='1'
                      value={Number(quantity)}
                      onChange={handleQuantityChange}
                      onKeyDown={handleKeyDown}
                    />
                    <button type='button' onClick={handleAdd}>
                      +
                    </button>
                  </div>
                </InfoRow>
                <InfoRow>
                  <button type='submit' disabled={disabled}>
                    Add to cart
                  </button>
                </InfoRow>
              </form>
            </InfoContainer>
          </Article>
        </Container>
      </Section>
    </>
  );
}

export default ProductPage;
