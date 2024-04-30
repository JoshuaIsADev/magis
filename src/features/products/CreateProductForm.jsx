import { useForm } from 'react-hook-form';
import { useCreateProduct } from './useCreateProduct';
import { useEditProduct } from './useEditProduct';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import Label from '../../ui/Label';
import Errors from '../../ui/Errors';
import FileInput from '../../ui/FileInput';
import Spinner from '../../ui/Spinner';
import Row from '../../ui/Row';
import Column from '../../ui/Column';
import Button from '../../ui/Button';
import { useMainImage } from './useMainImage';
import styled from 'styled-components';
import Img from '../../ui/Img';

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
  console.log({ productToEdit });

  const mainImage = useMainImage(productToEdit.image)[0];

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image;
    if (isEditSession)
      editProduct(
        { newProductData: { ...data, image }, id: editId },
        { onSuccess: (data) => reset() }
      );
    else
      createProduct(
        { ...data, image: image },
        { onSuccess: (data) => reset() }
      );
  }

  function onError(errors) {
    // console.log(errors);
  }

  return (
    <StyledCreateProductForm onSubmit={handleSubmit(onSubmit, onError)}>
      <InputContainer>
        {productToEdit.image ? (
          <Img src={mainImage} $variation='productCard' alt='product' />
        ) : (
          ''
        )}

        <Label htmlFor='name'>Product name</Label>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
        {errors?.name?.message && <Errors>{errors.name.message}</Errors>}
      </InputContainer>
      <InputContainer>
        <Label htmlFor='category'>Category</Label>
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
        <Label htmlFor='description1'>Description Paragraph 1</Label>
        <TextArea
          id='description1'
          name='description1'
          rows='6'
          disabled={isWorking}
          {...register('description1', {
            required: 'This field is required',
          })}
        />
        {errors?.description1?.message && (
          <Errors>{errors.description1.message}</Errors>
        )}
      </InputContainer>
      <InputContainer>
        <Label htmlFor='description2'>Description Paragraph 2</Label>
        <TextArea
          id='description2'
          name='description2'
          rows='6'
          disabled={isWorking}
          {...register('description2')}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor='measurements'>Measurements</Label>
        <TextArea
          id='measurements'
          name='measurements'
          rows='6'
          disabled={isWorking}
          defaultValue='{ "seating height": 46, "total height": 84.5, "width": 55, "depth": 54 }'
          placeholder='{ "seating height": 46, "total height": 84.5, "width": 55, "depth": 54 }'
          {...register('measurements')}
        />
      </InputContainer>
      <InputContainer>
        <Label htmlFor='measurements'>Color</Label>
        <TextArea
          id='color'
          name='color'
          rows='6'
          disabled={isWorking}
          defaultValue='{ "white": "F6F6F6", "black": "292929", "stone": "AA9A8D", "orange": "F06500" }'
          placeholder='{ "white": "F6F6F6", "black": "292929", "stone": "AA9A8D", "orange": "F06500" }'
          {...register('color')}
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
        {isWorking && <Spinner />}
        <Button type='reset' disabled={isWorking}>
          Cancel
        </Button>
        <Button $variation='primary' disabled={isWorking}>
          {isEditSession ? 'Update product' : 'Add product'}
        </Button>
      </InputContainer>
    </StyledCreateProductForm>
  );
}

export default CreateProductForm;
