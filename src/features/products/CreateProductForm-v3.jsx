import { useForm } from 'react-hook-form';
import { useCreateProduct } from './useCreateProduct';
import { useEditProduct } from './useEditProduct';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import Label from '../../ui/Label';
import Errors from '../../ui/Errors';
import FileInput from '../../ui/FileInput';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import { useMainImage } from './useMainImage';
import styled from 'styled-components';
import Img from '../../ui/Img';
import Heading from '../../ui/Heading';
import { useState } from 'react';

const StyledCreateProductForm = styled.form`
  grid-column: span 1;
  display: grid;
  grid-template-columns: 1fr;
  background-color: var(--color-grey-0);
  padding: var(--cell);
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 3rem;
  gap: 0.5rem;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
`;
const Ul = styled.ul`
  display: flex;
  gap: 2rem;
`;

function CreateProductForm({ productToEdit = {} }) {
  const { isCreating, createProduct } = useCreateProduct();
  const { isEditing, editProduct } = useEditProduct();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = productToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const [variantsTest, setVariantsTest] = useState({
    variantId: '',
    colorName: '',
    colorHex: '',
    inStock: '',
    image: '',
  });
  const [combinedVariants, setCombinedVariants] = useState([]);

  //   [
  //   {
  //     variantId: '',
  //     colorName: '',
  //     colorHex: '',
  //     inStock: '',
  //     image: '',
  //   },
  // ]
  // console.log({ productToEdit });

  // const mainImage = productToEdit.variants[0].image;

  function handleVariantInputChange(e) {
    const { id, value } = e.target;
    setVariantsTest((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  }

  function handleAddVariant(e) {
    e.preventDefault();

    setCombinedVariants([...combinedVariants, variantsTest]);
    // console.log(`ok: ${JSON.stringify(combinedVariants)}`);

    // if (variantsTest.trim() !== '') {
    //   setCombinedVariants([...combinedVariants, variantsTest]);
    //   console.log(`ok: ${combinedVariants}`);
    // }
  }

  function onSubmit(data) {
    console.log(data);
    // const image = typeof data.image === 'string' ? data.image : data.image;
    // if (isEditSession)
    //   editProduct(
    //     { newProductData: { ...data, image }, id: editId },
    //     { onSuccess: (data) => reset() }
    //   );
    // else
    //   createProduct(
    //     { ...data, image: image },
    //     { onSuccess: (data) => reset() }
    //   );
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <>
      <StyledCreateProductForm onSubmit={handleSubmit(onSubmit, onError)}>
        <InputContainer>
          {/* {productToEdit ? (
            <Img src={mainImage} $variation='productCard' alt='product' />
          ) : (
            ''
          )} */}

          <Label htmlFor='name'>Product name</Label>
          <Input
            type='text'
            id='name'
            name='name'
            autoComplete='false'
            disabled={isWorking}
            {...register('name', { required: 'This field is required' })}
          />
          {errors?.name?.message && <Errors>{errors.name.message}</Errors>}
        </InputContainer>
        <InputContainer>
          <Heading as='h4'>Category</Heading>
          <Ul>
            <Li>
              <Input
                type='radio'
                name='category'
                id='chair'
                value='Chair'
                disabled={isWorking}
                {...register('category')}
              />

              <Label htmlFor='chair'>Chair</Label>
            </Li>
            <Li>
              <Input
                type='radio'
                name='category'
                id='table'
                value='Table'
                disabled={isWorking}
                {...register('category')}
              />
              <Label htmlFor='table'>Table</Label>
            </Li>
            <Li>
              <Input
                type='radio'
                name='category'
                id='sofa'
                value='Sofa'
                disabled={isWorking}
                {...register('category')}
              />
              <Label htmlFor='sofa'>Sofa</Label>
            </Li>
          </Ul>
        </InputContainer>

        <InputContainer>
          <Label htmlFor='tags'>Tags</Label>
          <Input
            type='text'
            id='tags'
            defaultValue='{"tag1", "tag2"}'
            placeholder='{"tag1", "tag2"}'
            disabled={isWorking}
            {...register('tags')}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor='unitPrice'>Unit Price</Label>
          <Input
            type='number'
            id='unitPrice'
            disabled={isWorking}
            {...register('unitPrice', { required: 'This field is required' })}
          />
          {errors?.unitPrice?.message && (
            <Errors>{errors.unitPrice.message}</Errors>
          )}
        </InputContainer>
        <InputContainer>
          <Label htmlFor='inStock'>In stock</Label>
          <Input
            type='number'
            id='inStock'
            disabled={isWorking}
            {...register('inStock', { required: 'This field is required' })}
          />
          {errors?.unitPrice?.message && (
            <Errors>{errors.unitPrice.message}</Errors>
          )}
        </InputContainer>
        <InputContainer>
          <Label htmlFor='designer'>Designer</Label>
          <Input
            type='text'
            id='designer'
            disabled={isWorking}
            {...register('designer')}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor='material'>Material</Label>
          <TextArea
            id='material'
            name='material'
            rows='6'
            disabled={isWorking}
            {...register('material', { required: 'This field is required' })}
          />
          {errors?.material?.message && (
            <Errors>{errors.material.message}</Errors>
          )}
        </InputContainer>
        <InputContainer>
          <Label htmlFor='description'>Description</Label>
          <TextArea
            id='description'
            name='description'
            rows='6'
            disabled={isWorking}
            {...register('description', {
              required: 'This field is required',
            })}
          />
          {errors?.description?.message && (
            <Errors>{errors.description.message}</Errors>
          )}
        </InputContainer>
        <InputContainer>
          <Label htmlFor='totalHeight'>Total height</Label>
          <Input
            type='number'
            step='0.01'
            id='totalHeight'
            disabled={isWorking}
            {...register('totalHeight')}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor='seatingHeight'>Seating height</Label>
          <Input
            type='number'
            step='0.01'
            id='seatingHeight'
            disabled={isWorking}
            {...register('seatingHeight')}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor='height'>Height</Label>
          <Input
            type='number'
            step='0.01'
            id='height'
            disabled={isWorking}
            {...register('height')}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor='width'>Width</Label>
          <Input
            type='number'
            step='0.01'
            id='width'
            disabled={isWorking}
            {...register('width')}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor='depth'>Depth</Label>
          <Input
            type='number'
            step='0.01'
            id='depth'
            disabled={isWorking}
            {...register('depth')}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor='length'>Length</Label>
          <Input
            type='number'
            step='0.01'
            id='length'
            disabled={isWorking}
            {...register('length')}
          />
        </InputContainer>

        <InputContainer>
          <Label htmlFor='image'>Images</Label>
          <FileInput
            id='image'
            type='file'
            accept='image/*'
            disabled={isWorking}
            multiple
            {...register('image', {
              required: isEditSession ? false : 'This field is required',
            })}
          />
        </InputContainer>
        <InputContainer>
          <Heading as='h3'>Variants</Heading>
          {/* <Ul>
            {combinedVariants.map((variant, index) => (
              <li key={index}>{variant}</li>
            ))}
          </Ul> */}

          <Label htmlFor='variantId'>Variant id</Label>
          <Input
            type='text'
            id='variantId'
            disabled={isWorking}
            value={variantsTest.variantId}
            onChange={handleVariantInputChange}
          />
          <Label htmlFor='colorName'>Color name</Label>
          <Input
            type='text'
            id='colorName'
            disabled={isWorking}
            value={variantsTest.colorName}
            onChange={handleVariantInputChange}
          />
          <Label htmlFor='colorHex'>Color hex</Label>
          <Input
            type='text'
            id='colorHex'
            disabled={isWorking}
            value={variantsTest.colorHex}
            onChange={handleVariantInputChange}
          />
          <Label htmlFor='inStock'>In stock</Label>
          <Input
            type='number'
            step='1'
            id='inStock'
            disabled={isWorking}
            value={variantsTest.inStock}
            onChange={handleVariantInputChange}
          />
          {/* <Label htmlFor='image'>Image</Label>
          <Input
            type='text'
            id='image'
            disabled={isWorking}
            value={variantsTest.image}
            onChange={handleVariantInputChange}
          /> */}
          <Label htmlFor='combinedVariants'>Variants</Label>
          <Input
            type='text'
            id='combinedVariants'
            disabled={isWorking}
            value={combinedVariants}
            // onChange={(e) => setVariantsTest(e.target.value)}
            {...register('variantsTest')}
          />
          <Button onClick={handleAddVariant}>Add variant</Button>
        </InputContainer>
        <InputContainer>
          {isWorking && <Spinner />}
          <Button type='reset' disabled={isWorking}>
            Cancel
          </Button>
          <Button $variation='primary' disabled={isWorking}>
            {isEditSession ? 'Update product' : 'Add product'}
          </Button>
        </InputContainer>
      </StyledCreateProductForm>
      {/* <StyledCreateProductForm>
        <InputContainer>
          <Heading as='h3'>Variants</Heading>
          <Ul>
            {combinedVariants.map((variant, index) => (
              <li key={index}>{variant}</li>
            ))}
          </Ul>
          <Label htmlFor='variantsTest'>Variants Test</Label>
          <Input
            type='text'
            id='variantsTest'
            disabled={isWorking}
            value={variantsTest}
            onChange={(e) => setVariantsTest(e.target.value)}
            // {...register('variantsTest')}
          />
          <Button onClick={handleAddVariant}>Add variant</Button>
        </InputContainer>
      </StyledCreateProductForm> */}
    </>
  );
}

export default CreateProductForm;
