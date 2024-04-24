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

const Img = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  padding: 0;
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
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <Row>
        {productToEdit ? <Img src={mainImage} alt='product' /> : ''}
        <Column $variation='createEditProduct'>
          <Label htmlFor='name' isFirst={true}>
            Product name
          </Label>
          <Input
            type='text'
            id='name'
            disabled={isWorking}
            {...register('name', { required: 'This field is required' })}
          />
          {errors?.name?.message && <Errors>{errors.name.message}</Errors>}
        </Column>
      </Row>
      <Row>
        <Column $variation='createEditProduct'>
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
        </Column>
      </Row>
      <Row>
        <Column $variation='createEditProduct'>
          <Label htmlFor='tags'>Tags</Label>
          <Input
            type='text'
            id='tags'
            defaultValue='{"tag1", "tag2"}'
            placeholder='{"tag1", "tag2"}'
            disabled={isWorking}
            {...register('tags')}
          />
        </Column>
      </Row>
      <Row>
        <Column $variation='createEditProduct'>
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
        </Column>
      </Row>
      <Row>
        <Column $variation='createEditProduct'>
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
        </Column>
      </Row>
      <Row>
        <Column $variation='createEditProduct'>
          <Label htmlFor='designer'>Designer</Label>
          <Input
            type='text'
            id='designer'
            disabled={isWorking}
            {...register('designer')}
          />
        </Column>
      </Row>
      <Row>
        <Column $variation='createEditProduct'>
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
        </Column>
      </Row>
      <Row>
        <Column $variation='createEditProduct'>
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
        </Column>
      </Row>
      <Row>
        <Column $variation='createEditProduct'>
          <Label htmlFor='description2'>Description Paragraph 2</Label>
          <TextArea
            id='description2'
            name='description2'
            rows='6'
            disabled={isWorking}
            {...register('description2')}
          />
        </Column>
      </Row>
      <Row>
        <Column $variation='createEditProduct'>
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
        </Column>
      </Row>
      <Row>
        <Column $variation='createEditProduct'>
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
        </Column>
      </Row>
      <Row>
        <Column $variation='createEditProduct'>
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
        </Column>
      </Row>

      <Row $variation='formSubmitButtons'>
        <Column $variation='formSubmitButtons'>
          {isWorking && <Spinner />}
          <Button type='reset' disabled={isWorking}>
            Cancel
          </Button>
          <Button $variation='primary' disabled={isWorking}>
            {isEditSession ? 'Update product' : 'Add product'}
          </Button>
        </Column>
      </Row>
    </form>
  );
}

export default CreateProductForm;
