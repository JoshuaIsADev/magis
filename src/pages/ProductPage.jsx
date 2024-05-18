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
import ImageGallery from '../ui/ImageGallery';
import Img from '../ui/Img.jsx';

const StyledProductPage = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: var(--grid-gap);
`;

const Empty = styled.div`
  grid-area: span 1;
`;

const ColumnShowcase = styled.article`
  grid-column: 1 / span 3;
  height: 85vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10% 0;
  /* padding: var(--cell); */
`;

const ColumnConfigure = styled.article`
  grid-column: 5 / span 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

const ColorContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const QuantityContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const ColumnInfo = styled.article`
  grid-column: 5 / span 1;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

const GalleryContainer = styled.article`
  grid-area: gallery;
  display: flex;
  flex-direction: column;
  padding: var(--cell);
`;

const GalleryHeading = styled.div`
  padding-bottom: 2rem;
  gap: 2rem;
`;

const MaterialsHeadingContainer = styled.article`
  grid-area: materialsHeading;
  display: flex;
  padding: var(--cell);
`;

const MaterialsContainer = styled.article`
  grid-area: materials;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: var(--cell);
  padding-bottom: 20rem;
`;

const MeasurementsHeadingContainer = styled.article`
  grid-area: measurementsHeading;
  display: flex;
  padding: var(--cell);
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
      image: variants[color].image,
    };

    handleAddCartItems(newCartItem);
    setQuantity(1);
    toast.success('Added to cart');
  }

  const disabled = !color || !quantity || quantity === 0;

  const aboutParagraphs = product.description.split('\n');

  const variants = product.variants;
  return (
    <>
      <StyledProductPage>
        <HeadingContainer text={`Shop / ${product.name}`} />
        <ColumnShowcase>
          <Img src={imageVariant || defaultImage} />
        </ColumnShowcase>
        <Empty />
        <form onSubmit={handleSubmit(onSubmit)}>
          <ColumnConfigure>
            <Heading as='h3'>{product.name}</Heading>
            <p>{product.designer}</p>
            <p>${product.unitPrice}</p>
            <ColorContainer>
              {errors?.color?.message && (
                <Errors>{errors.color.message}</Errors>
              )}
              {variants.map((variant, index) => (
                <Input
                  key={index}
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
              ))}
            </ColorContainer>
            <SubmitContainer>
              <QuantityContainer>
                <Button type='button' onClick={handleSubtract}>
                  <VscRemove />
                </Button>
                <Input
                  $variation='order'
                  type='number'
                  name='quantity'
                  min='1'
                  max='100'
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
            </SubmitContainer>
          </ColumnConfigure>
        </form>
      </StyledProductPage>
      <StyledProductPage>
        <HeadingContainer text='Info' />
        <ColumnInfo>
          <AboutContainer>
            {aboutParagraphs.map((description, index) => (
              <p key={index}>{description}</p>
            ))}
          </AboutContainer>
          <p>{product.material}</p>
          <MeasurementsContainer>
            {product.totalHeight && (
              <MeasurementsRow>
                <Heading as='h3'>Total height</Heading>
                <p>{product.totalHeight}</p>
              </MeasurementsRow>
            )}
            {product.seatingHeight && (
              <MeasurementsRow>
                <Heading as='h3'>Seating height</Heading>
                <p>{product.seatingHeight}</p>
              </MeasurementsRow>
            )}
            {product.height && (
              <MeasurementsRow>
                <Heading as='h3'>Height</Heading>
                <p>{product.height}</p>
              </MeasurementsRow>
            )}
            {product.width && (
              <MeasurementsRow>
                <Heading as='h3'>Width</Heading>
                <p>{product.width}</p>
              </MeasurementsRow>
            )}
            {product.length && (
              <MeasurementsRow>
                <Heading as='h3'>Length</Heading>
                <p>{product.length}</p>
              </MeasurementsRow>
            )}
            {product.depth && (
              <MeasurementsRow>
                <Heading as='h3'>Depth</Heading>
                <p>{product.depth}</p>
              </MeasurementsRow>
            )}
          </MeasurementsContainer>
        </ColumnInfo>
        {/* <AboutHeadingContainer>
        <Heading as='h3'>About</Heading>
      </AboutHeadingContainer>
      <ColumnInfo>
        {aboutParagraphs.map((description, index) => (
          <p key={index}>{description}</p>
        ))}
      </ColumnInfo>

      <GalleryContainer>
        <GalleryHeading>
          <Heading as='h3'>Gallery</Heading>
        </GalleryHeading>
        <ImageGallery images={product.image}></ImageGallery>
      </GalleryContainer>
      <MaterialsHeadingContainer>
        <Heading as='h3'>Materials</Heading>
      </MaterialsHeadingContainer>
      <MaterialsContainer>
        <p>{product.material}</p>
      </MaterialsContainer>
      <MeasurementsHeadingContainer>
        <Heading as='h3'>Measurements</Heading>
      </MeasurementsHeadingContainer>
      <MeasurementsContainer>
        {product.totalHeight && <p>Total height: {product.totalHeight}</p>}
        {product.seatingHeight && (
          <p>Seating height: {product.seatingHeight}</p>
        )}
        {product.height && <p>Height: {product.height}</p>}
        {product.width && <p>Width: {product.width}</p>}
        {product.length && <p>Length: {product.length}</p>}
        {product.depth && <p>Depth: {product.depth}</p>}
      </MeasurementsContainer> */}
      </StyledProductPage>
    </>
  );
}

export default ProductPage;
