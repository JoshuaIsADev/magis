import { useParams } from 'react-router-dom';
import { useProducts } from '../features/products/useProducts';
import { VscRemove, VscAdd } from 'react-icons/vsc';
import Spinner from '../ui/Spinner';
import Section from '../ui/Section';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { CartContext } from '../context/cartContext';
import { useMainImage } from '../features/products/useMainImage';
import Heading from '../ui/Heading';
import Button from '../ui/Button';
import Input from '../ui/Input';

const StyledProductPage = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    'heading heading heading heading'
    'showcase showcase configure configure'
    'aboutHeading . about .'
    'gallery gallery gallery gallery'
    'materials materials measurements measurements';
  padding-top: var(--top);
`;

const HeadingContainer = styled.div`
  grid-area: heading;
  padding: var(--cell);
  border-bottom: var(--border);
  border-left: var(--border);
`;

const ShowcaseContainer = styled.article`
  grid-area: showcase;
  min-height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: var(--border);
  padding: var(--cell);
  border-bottom: var(--border);
`;

const ConfigureContainer = styled.article`
  grid-area: configure;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: var(--border);
`;

const Name = styled.div`
  padding: var(--cell);
  border-bottom: var(--border);
`;

const ConfigureOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 10rem;
`;

const ConfigureOptions = styled.div`
  display: flex;
  justify-content: space-between;
  padding: var(--cell);
  border-top: var(--border);
  &:last-child {
    border-bottom: var(--border);
  }
`;

const ColorContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const QuantityContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const AboutHeadingContainer = styled.div`
  grid-area: aboutHeading;
  padding: var(--cell);
`;

const ParagraphContainer = styled.div`
  grid-area: about;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: var(--cell);
`;

const GalleryContainer = styled.article`
  grid-area: gallery;
  display: flex;
  flex-direction: column;
  padding: var(--cell);
  border-top: var(--border);
  border-bottom: var(--border);
`;

const GalleryHeading = styled.div`
  padding-bottom: 2rem;
  gap: 2rem;
`;

const MaterialsContainer = styled.article`
  grid-area: materials;
  display: flex;
  justify-content: space-between;
  padding: var(--cell);
  border-left: var(--border);
  border-right: var(--border);
  border-bottom: var(--border);
  height: 40rem;
`;

const MeasurementsContainer = styled.article`
  grid-area: measurements;
  display: flex;
  justify-content: space-between;
  padding: var(--cell);
  border-right: var(--border);
  border-bottom: var(--border);
  height: 40rem;
`;

const Img = styled.img`
  object-fit: contain;
  max-width: 30rem;
`;

const ImgGallery = styled.img`
  width: 100%;
  height: 100rem;
  object-fit: cover;
  object-position: center;
`;

const InfoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-bottom: var(--pading-m);
`;

function ProductPage() {
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { cartItems, setCartItems } = useContext(CartContext);
  const { isPending, products } = useProducts();
  const { id: productId } = useParams();

  if (isPending) return <Spinner />;
  const product = products.find((p) => p.id === Number(productId));

  const selectedProductId = productId;
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

  console.log(product);

  return (
    <StyledProductPage>
      <HeadingContainer>
        <Heading as='h3'>Shop</Heading>
      </HeadingContainer>
      <ShowcaseContainer>
        <Img src={product.image[0]} />
      </ShowcaseContainer>
      <ConfigureContainer>
        <Name>
          <Heading as='h2'>{product.name}</Heading>
        </Name>
        <ConfigureOptionsContainer>
          <ConfigureOptions>
            <Heading as='h3'>Designed by</Heading>
            <p className='upper'>{product.designer}</p>
          </ConfigureOptions>
          <ConfigureOptions>
            <Heading as='h3'>Unit price</Heading>
            <p className='upper'>${product.unitPrice}</p>
          </ConfigureOptions>
          <form onSubmit={handleSubmit}>
            <ConfigureOptions>
              <Heading as='h3'>Colors</Heading>
              <ColorContainer>
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
              </ColorContainer>
            </ConfigureOptions>
            <ConfigureOptions>
              <Heading as='h3'>Quantity</Heading>
              <QuantityContainer>
                <Button type='button' onClick={handleSubtract}>
                  <VscRemove />
                </Button>
                <Input
                  $variation='order'
                  type='number'
                  name='quantity'
                  min='0'
                  max='100'
                  step='1'
                  value={Number(quantity)}
                  onChange={handleQuantityChange}
                  onKeyDown={handleKeyDown}
                />
                <Button type='button' onClick={handleAdd}>
                  <VscAdd />
                </Button>
              </QuantityContainer>
            </ConfigureOptions>
            <ConfigureOptions>
              <Button $variation='primary' type='submit' disabled={disabled}>
                Add to cart
              </Button>
            </ConfigureOptions>
          </form>
        </ConfigureOptionsContainer>
      </ConfigureContainer>
      <AboutHeadingContainer>
        <Heading as='h3'>About</Heading>
      </AboutHeadingContainer>

      <ParagraphContainer>
        <p>{product.description1}</p>
        {product.description2 ? <p>{product.description2}</p> : ''}
        {product.description ? <p>{product.description3}</p> : ''}
      </ParagraphContainer>
      <GalleryContainer>
        <GalleryHeading>
          <Heading as='h3'>Gallery</Heading>
        </GalleryHeading>
        <ImgGallery src={product.image[8]}></ImgGallery>
      </GalleryContainer>
      <MaterialsContainer>
        <Heading as='h3'>Materials</Heading>
        <p>{product.material}</p>
      </MaterialsContainer>
      <MeasurementsContainer>
        <Heading as='h3'>Measurements</Heading>
        <p>{product.measurements}</p>
      </MeasurementsContainer>
    </StyledProductPage>
  );
}

export default ProductPage;
