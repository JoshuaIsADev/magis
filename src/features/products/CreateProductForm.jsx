import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useCreateProduct } from './useCreateProduct';
import { useEditProduct } from './useEditProduct';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import Label from '../../ui/Label';
import Errors from '../../ui/Errors';
import FileInput from '../../ui/FileInput';
import Spinner from '../../ui/Spinner';

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 0.5rem;
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
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow>
        <Label htmlFor='name'>Product name</Label>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', { required: 'This field is required' })}
        />
        {errors?.name?.message && <Errors>{errors.name.message}</Errors>}
      </FormRow>
      <FormRow>
        <li>
          <Input
            type='radio'
            name='category'
            id='chair'
            value='Chair'
            disabled={isWorking}
            {...register('category')}
          />

          <Label htmlFor='chair'>Chair</Label>
        </li>
        <li>
          <Input
            type='radio'
            name='category'
            id='table'
            value='Table'
            disabled={isWorking}
            {...register('category')}
          />
          <Label htmlFor='table'>Table</Label>
        </li>
        {/* <li>
          <Input
            type='radio'
            name='category'
            id='bench'
            value='Bench'
            disabled={isWorking}
            {...register('category')}
          />
          <Label htmlFor='bench'>Bench</Label>
        </li> */}
        <li>
          <Input
            type='radio'
            name='category'
            id='sofa'
            value='Sofa'
            disabled={isWorking}
            {...register('category')}
          />
          <Label htmlFor='sofa'>Sofa</Label>
        </li>
      </FormRow>
      <FormRow>
        <Label htmlFor='tags'>Tags</Label>
        <Input
          type='text'
          id='tags'
          defaultValue='{"tag1", "tag2"}'
          placeholder='{"tag1", "tag2"}'
          disabled={isWorking}
          {...register('tags')}
        />
      </FormRow>
      <FormRow>
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
      </FormRow>
      <FormRow>
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
      </FormRow>
      <FormRow>
        <Label htmlFor='designer'>Designer</Label>
        <Input
          type='text'
          id='designer'
          disabled={isWorking}
          {...register('designer')}
        />
      </FormRow>
      <FormRow>
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
      </FormRow>
      <FormRow>
        <Label htmlFor='description1'>Description Paragraph 1</Label>
        <TextArea
          id='description1'
          name='description1'
          rows='6'
          disabled={isWorking}
          {...register('description1', { required: 'This field is required' })}
        />
        {errors?.description1?.message && (
          <Errors>{errors.description1.message}</Errors>
        )}
      </FormRow>
      <FormRow>
        <Label htmlFor='description2'>Description Paragraph 2</Label>
        <TextArea
          id='description2'
          name='description2'
          rows='6'
          disabled={isWorking}
          {...register('description2')}
        />
      </FormRow>
      <FormRow>
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
      </FormRow>
      <FormRow>
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
      </FormRow>
      <FormRow>
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
      </FormRow>

      <FormRow>
        {isWorking && <Spinner />}
        <button type='reset' disabled={isWorking}>
          Cancel
        </button>
        <button disabled={isWorking}>
          {isEditSession ? 'Update product' : 'Add product'}
        </button>
      </FormRow>
    </Form>
  );
}

export default CreateProductForm;
