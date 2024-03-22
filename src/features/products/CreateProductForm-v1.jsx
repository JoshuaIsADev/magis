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
    mutate(data);
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
            value='chair'
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
            value='table'
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
            value='bench'
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
            value='sofa'
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
        <Label htmlFor='mainImageUrl'>Main Images</Label>
        <Input
          id='mainImageUrl'
          type='text'
          defaultValue='{"image1", "image2"}'
          // accept='image/*'
          // type='file'
          // defaultValue={''}
          disabled={isCreating}
          {...register('mainImageUrl')}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor='imageUrl'>Images</Label>
        <Input
          id='imageUrl'
          type='text'
          defaultValue='{"image1", "image2"}'
          // accept='image/*'
          // type='file'
          // defaultValue={''}
          disabled={isCreating}
          {...register('imageUrl')}
        />
      </FormRow>
      <FormRow>
        <button type='reset'>Cancel</button>
        <button disabled={isCreating}>Submit</button>
      </FormRow>
    </Form>
  );
}

export default CreateProductForm;
