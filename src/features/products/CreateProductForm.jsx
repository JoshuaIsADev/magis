import { useFieldArray, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { VscTrash } from 'react-icons/vsc';
import { useCreateProduct } from './useCreateProduct';
import { useEditProduct } from './useEditProduct';

import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import Label from '../../ui/Label';
import Errors from '../../ui/Errors';
import FileInput from '../../ui/FileInput';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import Img from '../../ui/Img';
import { Heading } from '../../ui/Heading.jsx';
import toast from 'react-hot-toast';
import { useState } from 'react';

const StyledCreateProductForm = styled.form`
  grid-column: span 6;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
  background-color: var(--color-grey-0);
  border: var(--border);
  padding: 1rem;
`;

const ColumnProductInfo = styled.div`
  grid-column: 1 / span 3;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 800px) {
    grid-column: span 6;
  }
`;

const ColumnMeasurements = styled.div`
  grid-column: 4 / span 1;
  display: flex;
  flex-direction: column;
  @media (max-width: 800px) {
    grid-column: 1 / span 2;
  }
  @media (max-width: 400px) {
    grid-column: 1 / span 6;
  }
`;

const ColumnImages = styled.div`
  grid-column: 5 / span 2;
  display: grid;
  grid-gap: var(--grid-gap);
  @media (max-width: 800px) {
    grid-column: 3 / span 4;
  }
  @media (max-width: 400px) {
    grid-column: 1 / span 6;
  }
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: var(--grid-gap);
  /* width: 100%; */
  align-items: center;
`;

const VariantImageContainer = styled.div`
  grid-column: span 2;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const InputContainer = styled.div`
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  gap: 0.2rem;
  width: 100%;
  @media (max-width: 800px) {
    grid-column: span 3;
  }
`;

const ActionContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const Ul = styled.ul`
  display: flex;
  gap: 2rem;
`;

const Li = styled.li`
  display: flex;
  align-items: center;
`;

const RowVariants = styled.div`
  grid-column: 1 / span 6;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
  @media (max-width: 800px) {
    grid-column-gap: var(--grid-gap);
    grid-row-gap: 0;
  }
`;

const RowHeadingButton = styled.div`
  grid-column: 1 / span 6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: var(--border);
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
`;

function CreateProductForm({ heading, productToEdit = {}, setShowForm }) {
  // console.log(productToEdit);
  const [forceRerender, setForceRerender] = useState(false);
  const { isCreating, createProduct } = useCreateProduct();
  const { isEditing, editProduct } = useEditProduct();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = productToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, formState, control } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState;
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'variants',
  });

  function handleAddVariant(e) {
    e.preventDefault();
    append({});
  }

  function handleDelete(e, index) {
    e.preventDefault();
    remove(index);
    // productToEdit.variants[index].variantImage = '';
    setForceRerender((prev) => !prev);
    toast.success('Removed item');
  }

  // function handleVariantImageDelete(e, index) {
  //   e.preventDefault();
  //   delete productToEdit.variants[index].variantImage;
  //   setForceRerender(prev => !prev);
  //   toast.success('Removed image');
  // }

  function onSubmit(data) {
    const seatingHeight =
      data.seatingHeight !== '' ? parseFloat(data.seatingHeight) : null;
    const height = data.height !== '' ? parseFloat(data.height) : null;
    const width = data.width !== '' ? parseFloat(data.width) : null;
    const depth = data.depth !== '' ? parseFloat(data.depth) : null;
    const length = data.length !== '' ? parseFloat(data.length) : null;

    const image = typeof data.image === 'string' ? data.image : data.image;
    if (isEditSession)
      editProduct(
        {
          newProductData: {
            ...data,
            seatingHeight,
            height,
            width,
            depth,
            length,
            image,
          },
          id: editId,
        }
        // { onSuccess: setShowForm(false) }
        // { onSuccess: (data) => reset() }
      );
    else
      createProduct(
        { ...data, seatingHeight, height, width, depth, length, image: image },
        // { onSuccess: setShowForm(false) }
        { onSuccess: (data) => reset() }
      );
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <StyledCreateProductForm onSubmit={handleSubmit(onSubmit, onError)}>
      <RowHeadingButton>
        <Heading as='h3'>{heading}</Heading>

        {isWorking && <Spinner />}
        <ActionContainer>
          <Button
            type='button'
            disabled={isWorking}
            $variation='secondary'
            onClick={() => setShowForm(false)}
          >
            Cancel
          </Button>
          <Button $variation='primary' disabled={isWorking}>
            {isEditSession ? 'Save edits' : 'Save new product'}
          </Button>
        </ActionContainer>
      </RowHeadingButton>
      <ColumnProductInfo>
        <InputContainer>
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
                $variation='manage'
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
                $variation='manage'
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
                $variation='manage'
                type='radio'
                name='category'
                id='lounge'
                value='Lounge'
                disabled={isWorking}
                {...register('category')}
              />
              <Label htmlFor='lounge'>Lounge</Label>
            </Li>
          </Ul>
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
      </ColumnProductInfo>
      <ColumnMeasurements>
        <InputContainer>
          <Label htmlFor='seatingHeight'>Seating height</Label>
          <Input
            type='number'
            step='0.1'
            id='seatingHeight'
            disabled={isWorking}
            {...register('seatingHeight')}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor='height'>Height</Label>
          <Input
            type='number'
            step='0.1'
            id='height'
            disabled={isWorking}
            {...register('height')}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor='width'>Width</Label>
          <Input
            type='number'
            step='0.1'
            id='width'
            disabled={isWorking}
            {...register('width')}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor='depth'>Depth</Label>
          <Input
            type='number'
            step='0.1'
            id='depth'
            disabled={isWorking}
            {...register('depth')}
          />
        </InputContainer>
        <InputContainer>
          <Label htmlFor='length'>Length</Label>
          <Input
            type='number'
            step='0.1'
            id='length'
            disabled={isWorking}
            {...register('length')}
          />
        </InputContainer>
      </ColumnMeasurements>
      <ColumnImages>
        <InputContainer>
          <Label htmlFor='image'>Gallery images</Label>
          {isEditSession ? (
            <ImageContainer>
              {productToEdit.image.map((image, index) => (
                <Img src={image} key={index} alt='gallery' />
              ))}
            </ImageContainer>
          ) : (
            <FileInput
              id='image'
              // type='file'
              accept='image/*'
              disabled={isWorking}
              multiple
              {...register(
                'image'
                // , {
                //   required: isEditSession ? false : 'This field is required',
                // }
              )}
            />
          )}
          {errors?.image?.message && <Errors>{errors.image.message}</Errors>}
        </InputContainer>
      </ColumnImages>
      <RowHeadingButton>
        <Heading as='h3'>Variants</Heading>
        <Button onClick={handleAddVariant} $variation='primary' type='button'>
          Add variant
        </Button>
      </RowHeadingButton>
      {fields.map((variant, index) => (
        <RowVariants key={variant.id}>
          <InputContainer>
            <Label htmlFor={`variants.${index}.variantId`}>Variant id</Label>
            <Input
              type='text'
              id={`variants.${index}.variantId`}
              disabled={isWorking}
              {...register(`variants.${index}.variantId`, {
                required: 'This field is required',
              })}
            />
            {errors?.variantId?.message && (
              <Errors>{errors.variantId.message}</Errors>
            )}
          </InputContainer>
          <InputContainer>
            <Label htmlFor={`variants.${index}.colorName`}>Color name</Label>
            <Input
              type='text'
              id={`variants.${index}.colorName`}
              disabled={isWorking}
              {...register(`variants.${index}.colorName`, {
                required: 'This field is required',
              })}
            />
            {errors?.colorName?.message && (
              <Errors>{errors.colorName.message}</Errors>
            )}
          </InputContainer>

          <InputContainer>
            <Label htmlFor={`variants.${index}.colorHex`}>Color hex</Label>
            <Input
              type='text'
              id={`variants.${index}.colorHex`}
              disabled={isWorking}
              {...register(`variants.${index}.colorHex`, {
                required: 'This field is required',
              })}
            />
            {errors?.colorHex?.message && (
              <Errors>{errors.colorHex.message}</Errors>
            )}
          </InputContainer>

          <InputContainer>
            <Label htmlFor={`variants.${index}.inStock`}>In stock</Label>
            <Input
              type='number'
              step='1'
              id={`variants.${index}.inStock`}
              disabled={isWorking}
              {...register(`variants.${index}.inStock`, {
                required: 'This field is required',
              })}
            />
            {errors?.inStock?.message && (
              <Errors>{errors.inStock.message}</Errors>
            )}
          </InputContainer>

          <InputContainer>
            <Label htmlFor={`variants.${index}.variantImage`}>image</Label>
            <VariantImageContainer>
              {isEditSession && productToEdit?.variants[index] ? (
                <>
                  <Img
                    src={productToEdit?.variants[index]?.variantImage}
                    $variation='xxs'
                    alt='variant'
                  />
                  {/* <Button
                    $variation='secondary'
                    onClick={(e) => handleVariantImageDelete(e, index)}
                    type='button'
                  >
                    Delete image
                  </Button> */}
                </>
              ) : (
                <FileInput
                  accept='image/*'
                  id={`variants.${index}.variantImage`}
                  disabled={isWorking}
                  {...register(`variants.${index}.variantImage`, {
                    required: isEditSession ? false : 'This field is required',
                  })}
                />
              )}
              {errors?.variantImage?.message && (
                <Errors>{errors.variantImage.message}</Errors>
              )}
            </VariantImageContainer>
          </InputContainer>
          <ActionContainer>
            {productToEdit?.variants?.length > 1 ? (
              <Button
                $variation='icons'
                onClick={(e) => handleDelete(e, index)}
                type='button'
              >
                <VscTrash />
              </Button>
            ) : (
              ''
            )}
          </ActionContainer>
        </RowVariants>
      ))}
    </StyledCreateProductForm>
  );
}

export default CreateProductForm;
