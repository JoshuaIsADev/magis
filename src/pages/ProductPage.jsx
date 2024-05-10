import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useProducts } from '../features/products/useProducts';
import toast from 'react-hot-toast';
import { VscRemove, VscAdd } from 'react-icons/vsc';
import Spinner from '../ui/Spinner';
import styled from 'styled-components';
import { useContext, useState } from 'react';
import { CartContext } from '../context/cartContext';
import Heading from '../ui/Heading';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Errors from '../ui/Errors';

const StyledProductPage = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    'heading heading heading heading'
    'showcase showcase configure configure'
    'aboutHeading . about .'
    'gallery gallery gallery gallery'
    'materialsHeading materials measurementsHeading measurements';
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

const AboutParagraphContainer = styled.div`
  grid-area: about;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: var(--cell);
  padding-bottom: 20rem;
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

const MaterialsHeadingContainer = styled.article`
  grid-area: materialsHeading;
  display: flex;
  padding: var(--cell);
  border-bottom: var(--border);
`;

const MaterialsContainer = styled.article`
  grid-area: materials;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: var(--cell);
  padding-bottom: 20rem;
  border-bottom: var(--border);
  border-right: var(--border);
`;

const MeasurementsHeadingContainer = styled.article`
  grid-area: measurementsHeading;
  display: flex;
  padding: var(--cell);
  border-bottom: var(--border);
`;

const MeasurementsContainer = styled.article`
  grid-area: measurements;
  display: flex;
  flex-direction: column;
  padding: var(--cell);
  padding-bottom: 20rem;
  border-bottom: var(--border);
  border-right: var(--border);
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
  const defaultImage = product.variants[0].image;

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
    setImageVariant(variants[e.target.value].image);
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
    <StyledProductPage>
      <HeadingContainer>
        <Heading as='h3'>Shop</Heading>
      </HeadingContainer>
      <ShowcaseContainer>
        <Img src={imageVariant || defaultImage} />
      </ShowcaseContainer>
      <ConfigureContainer>
        <Name>
          <Heading as='h3'>{product.name}</Heading>
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <ConfigureOptions>
              <Heading as='h3'>Colors</Heading>
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
                    $image={variant.image}
                    value={index}
                    {...register('color', {
                      required: 'Please choose a color',
                    })}
                    onChange={handleColorChange}
                    onKeyDown={handleKeyDown}
                  ></Input>
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
      <AboutParagraphContainer>
        {aboutParagraphs.map((description, index) => (
          <p key={index}>{description}</p>
        ))}
      </AboutParagraphContainer>

      <GalleryContainer>
        <GalleryHeading>
          <Heading as='h3'>Gallery</Heading>
        </GalleryHeading>
        <ImgGallery src={product.image[8]}></ImgGallery>
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
      </MeasurementsContainer>
    </StyledProductPage>
  );
}

export default ProductPage;
