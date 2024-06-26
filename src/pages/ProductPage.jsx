import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useProducts } from '../features/products/useProducts';
import toast from 'react-hot-toast';
import { VscRemove, VscAdd } from 'react-icons/vsc';
import Spinner from '../ui/Spinner';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { CartContext } from '../context/cartContext';
import { Heading, HeadingContainer } from '../ui/Heading.jsx';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Errors from '../ui/Errors';
import Img from '../ui/Img.jsx';

const StyledProductPage = styled.section`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
  padding: 0 var(--padding-body) var(--bottom);
`;

const OrderContainer = styled.form`
  grid-column: 1 / span 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 1200px) {
    grid-column: 5 / span 2;
  }
  @media (max-width: 800px) {
    grid-column: 1 / span 6;
    grid-row: 3 / span 1;
    padding-bottom: 4rem;
  }
`;

const ProductHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5rem;
  border-bottom: var(--border);
`;

const InfoContainer = styled.div`
  grid-column: 6 / span 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 1200px) {
    grid-column: 5 / span 2;
    grid-row: 3;
  }
  @media (max-width: 800px) {
    grid-column: 1 / span 6;
    grid-row: 4 / span 1;
  }
`;
const MainImageContainer = styled.div`
  grid-column: 2 / span 4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85vh;
  @media (max-width: 1200px) {
    grid-column: 1 / span 4;
    grid-row: 2 / span 2;
  }
  @media (max-width: 800px) {
    grid-column: 1 / span 6;
    grid-row: 2 / span 1;
    height: 35vh;
  }
`;

const Ul = styled.ul`
  display: flex;
  gap: 0.5rem;
  padding-top: 4rem;
  align-items: center;
  @media (max-width: 800px) {
    padding-top: 2rem;
  }
`;

const Li = styled.li`
  display: flex;
  align-items: center;
`;

const QuantityContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 1rem;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 6rem;
  @media (max-width: 1200px) {
    padding-top: 4rem;
  }
  @media (max-width: 800px) {
    padding-top: 2rem;
  }
`;

const MeasurementsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MeasurementsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GalleryContainer = styled.div`
  grid-column: 2 / span 4;
  max-height: 85vh;
  margin: 10rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 1200px) {
    margin: 4rem 0;
  }
  @media (max-width: 800px) {
    grid-column: 1 / span 6;
    margin: 1rem 0;
    max-height: 100vh;
  }
`;

function ProductPage() {
  const [color, setColor] = useState('null');
  const [quantity, setQuantity] = useState(1);
  const { cartItems, setCartItems } = useContext(CartContext);
  const { isPending, products } = useProducts();
  const [imageVariant, setImageVariant] = useState('');
  const { id: productId } = useParams();
  const { register, formState, handleSubmit } = useForm();
  const { errors } = formState;

  if (isPending) return <Spinner />;
  const product = products.find((p) => p.id === Number(productId));
  const defaultImage = product.variants[0].variantImage;

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
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  function handleColorChange(e) {
    setColor(e.target.value);
    setImageVariant(variants[e.target.value].variantImage);
  }

  function handleAddCartItems(cartItem) {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.selectedVariantId === cartItem.selectedVariantId
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

  function onSubmit(data) {
    const newCartItem = {
      selectedProductId,
      selectedVariantId: `${selectedProductId}-${variants[color].colorName}`,
      name: product.name,
      quantity,
      unitPrice: product.unitPrice,
      color: variants[color].colorName,
      image: variants[color].variantImage,
    };
    handleAddCartItems(newCartItem);
    setQuantity(1);
    toast.success('Added to cart');
  }

  const disabled = !color || !quantity || quantity === 0;

  const aboutParagraphs = product.description.split('\n');

  const variants = product.variants;
  return (
    <StyledProductPage>
      <HeadingContainer text='Shop' />

      <OrderContainer onSubmit={handleSubmit(onSubmit)}>
        <ProductHeadingContainer>
          <Heading as='h2' $variation='bold'>
            {product.name}
          </Heading>
          <p>{product.designer}</p>
          <p>${product.unitPrice}</p>
        </ProductHeadingContainer>

        <Ul>
          {variants.map((variant, index) => (
            <Li key={index}>
              <Input
                $variation='product'
                id='color'
                type='radio'
                name='color'
                $color={variant.colorHex}
                $image={variant.variantImage}
                value={index}
                {...register('color', {
                  required: 'Please choose a color',
                })}
                onChange={handleColorChange}
                onKeyDown={handleKeyDown}
              ></Input>
            </Li>
          ))}
          {errors?.color?.message && <Errors>{errors.color.message}</Errors>}
        </Ul>
        <QuantityContainer>
          <Button type='button' onClick={handleSubtract}>
            <VscRemove />
          </Button>
          <Input
            $variation='order'
            type='number'
            name='quantity'
            min='1'
            max='99'
            step='1'
            value={Number(quantity)}
            {...register('quantity')}
            onChange={handleQuantityChange}
            onKeyDown={handleKeyDown}
          />
          <Button type='button' onClick={handleAdd}>
            <VscAdd />
          </Button>
          {errors?.quantity?.message && (
            <Errors>{errors.quantity.message}</Errors>
          )}
        </QuantityContainer>
        <Button $variation='primary' type='submit' disabled={disabled}>
          Add to cart
        </Button>
      </OrderContainer>

      <MainImageContainer>
        <Img src={imageVariant || defaultImage} $variation='productPage' />
      </MainImageContainer>

      <InfoContainer>
        {aboutParagraphs.map((description, index) => (
          <p key={index}>{description}</p>
        ))}
        <DetailContainer>
          <p>{product.material}</p>
          <MeasurementsContainer>
            {product.totalHeight && (
              <MeasurementsRow>
                <p>Total height</p>
                <p>{product.totalHeight}</p>
              </MeasurementsRow>
            )}
            {product.seatingHeight && (
              <MeasurementsRow>
                <p>Seating height</p>
                <p>{product.seatingHeight}</p>
              </MeasurementsRow>
            )}
            {product.height && (
              <MeasurementsRow>
                <p>Height</p>
                <p>{product.height}</p>
              </MeasurementsRow>
            )}
            {product.width && (
              <MeasurementsRow>
                <p>Width</p>
                <p>{product.width}</p>
              </MeasurementsRow>
            )}
            {product.length && (
              <MeasurementsRow>
                <p>Length</p>
                <p>{product.length}</p>
              </MeasurementsRow>
            )}
            {product.depth && (
              <MeasurementsRow>
                <p>Depth</p>
                <p>{product.depth}</p>
              </MeasurementsRow>
            )}
          </MeasurementsContainer>
        </DetailContainer>
      </InfoContainer>

      {product.image.map((image, index) => (
        <GalleryContainer key={index}>
          <Img src={image} alt='gallery' />
        </GalleryContainer>
      ))}

      {/* <ImageGallery images={product.image}></ImageGallery> */}
    </StyledProductPage>
  );
}

export default ProductPage;
