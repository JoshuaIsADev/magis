import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import styled from 'styled-components';
import { VscTrash } from 'react-icons/vsc';
import { useCreateProduct } from './useCreateProduct';
import { useEditProduct } from './useEditProduct';
import { useMainImage } from './useMainImage';

import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import Label from '../../ui/Label';
import Errors from '../../ui/Errors';
import FileInput from '../../ui/FileInput';
import Spinner from '../../ui/Spinner';
import Button from '../../ui/Button';
import Img from '../../ui/Img';
import Heading from '../../ui/Heading';

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

const VariantsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function CreateProductForm({ productToEdit = {} }) {
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

  // const mainImage = productToEdit.variants[0].image;

  // function handleVariantInputChange(e) {
  //   const { id, value } = e.target;
  //   setVariantsTest((prevState) => ({
  //     ...prevState,
  //     [id]: value,
  //   }));
  // }

  function handleAddVariant(e) {
    e.preventDefault();
    append({});
  }

  function handleDelete(e, index) {
    e.preventDefault();
    remove(index);
    // console.log(fields);
    // toast.success('Removed item');
  }

  function onSubmit(data) {
    // console.log(data);
    const image = typeof data.image === 'string' ? data.image : data.image;
    if (isEditSession)
      editProduct(
        { newProductData: { ...data, image }, id: editId }
        // { onSuccess: (data) => reset() }
      );
    else
      createProduct(
        { ...data, image: image }
        // { onSuccess: (data) => reset() }
      );
    // console.log(data.variants[1].variantImage);
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
                id='sofa'
                value='Sofa'
                disabled={isWorking}
                {...register('category')}
              />
              <Label htmlFor='sofa'>Sofa</Label>
            </Li>
          </Ul>
        </InputContainer>

        {/* <InputContainer>
          <Label htmlFor='tags'>Tags</Label>
          <Input
            type='text'
            id='tags'
            defaultValue='{"tag1", "tag2"}'
            placeholder='{"tag1", "tag2"}'
            disabled={isWorking}
            {...register('tags')}
          />
        </InputContainer> */}
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

        <InputContainer>
          <Label htmlFor='image'>Gallery images</Label>
          <FileInput
            id='image'
            // type='file'
            accept='image/*'
            disabled={isWorking}
            multiple
            // {...register('image')}
            {...register('image', {
              required: isEditSession ? false : 'This field is required',
            })}
          />
          {errors?.image?.message && <Errors>{errors.image.message}</Errors>}
        </InputContainer>
        <InputContainer>
          <Heading as='h3'>Variants</Heading>
          {/* <Ul>
            {combinedVariants.map((variant, index) => (
              <li key={index}>{variant}</li>
            ))}
          </Ul> */}

          {fields.map((variant, index) => (
            <VariantsContainer key={variant.id}>
              <InputContainer>
                <Label htmlFor={`variants.${index}.variantId`}>
                  Variant id
                </Label>
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
                <Label htmlFor={`variants.${index}.colorName`}>
                  Color name
                </Label>
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
                <FileInput
                  accept='image/*'
                  id={`variants.${index}.variantImage`}
                  disabled={isWorking}
                  {...register(`variants.${index}.variantImage`, {
                    required: isEditSession ? false : 'This field is required',
                  })}
                />
                {errors?.variantImage?.message && (
                  <Errors>{errors.variantImage.message}</Errors>
                )}
              </InputContainer>
              <Button
                $variation='trash'
                onClick={(e) => handleDelete(e, index)}
              >
                <VscTrash />
              </Button>
            </VariantsContainer>
          ))}

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
    </>
  );
}

export default CreateProductForm;
