import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import Label from '../../ui/Label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../../services/apiProducts';
import toast from 'react-hot-toast';
import Errors from '../../ui/Errors';
import FileInput from '../../ui/FileInput';

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 0.5rem;
`;

const CategoryContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red);
`;

function CreateProductForm() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;
  console.log(errors);
  const queryClient = useQueryClient();
  const { mutate, isLoading: isCreating } = useMutation({
    mutationFn: (newProduct) => createProduct(newProduct),
    onSuccess: () => {
      toast.success('New paroduct successfully created');
      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image });
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
          disabled={isCreating}
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
            disabled={isCreating}
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
            disabled={isCreating}
            {...register('category')}
          />
          <Label htmlFor='table'>Table</Label>
        </li>
        <li>
          <Input
            type='radio'
            name='category'
            id='bench'
            value='Bench'
            disabled={isCreating}
            {...register('category')}
          />
          <Label htmlFor='bench'>Bench</Label>
        </li>
        <li>
          <Input
            type='radio'
            name='category'
            id='sofa'
            value='Sofa'
            disabled={isCreating}
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
          disabled={isCreating}
          {...register('tags')}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor='unitPrice'>Unit Price</Label>
        <Input
          type='number'
          id='unitPrice'
          disabled={isCreating}
          {...register('unitPrice', { required: 'This field is required' })}
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
          disabled={isCreating}
          {...register('designer')}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor='material'>Material</Label>
        <TextArea
          id='material'
          name='material'
          rows='6'
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          {...register('description2')}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor='measurements'>Measurements</Label>
        <TextArea
          id='measurements'
          name='measurements'
          rows='6'
          disabled={isCreating}
          defaultValue='{ "seating height": 46, "total height": 84.5, "width": 55, "depth": 54 }'
          placeholder='{ "seating height": 46, "total height": 84.5, "width": 55, "depth": 54 }'
          {...register('measurements')}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor='image'>Images</Label>
        <FileInput
          id='image'
          type='file'
          accept='image/*'
          disabled={isCreating}
          multiple
          {...register('image')}
        />
      </FormRow>
      {/* <FormRow>
        <Label htmlFor='mainImage'>Main Images</Label>
        <Input
          id='mainImage'
          type='text'
          accept='image/*'
          // multiple
          defaultValue='{"image1", "image2"}'
          disabled={isCreating}
          {...register('mainImage')}
        />
      </FormRow> */}
      {/* <FormRow>
        <Label htmlFor='image'>Images</Label>
        <Input
          id='image'
          type='text'
          defaultValue='{"image1", "image2"}'
          // accept='image/*'
          // type='file'
          // defaultValue={''}
          disabled={isCreating}
          {...register('image')}
        />
      </FormRow> */}
      <FormRow>
        <button type='reset'>Cancel</button>
        <button disabled={isCreating}>Submit</button>
      </FormRow>
    </Form>
  );
}

export default CreateProductForm;
