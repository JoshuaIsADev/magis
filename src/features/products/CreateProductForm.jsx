import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import Form from '../../ui/Form';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import Label from '../../ui/Label';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../../services/apiProducts';
import toast from 'react-hot-toast';

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
  const { register, handleSubmit, reset } = useForm();
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

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor='name'>Product name</Label>
        <Input type='text' id='name' {...register('name')} />
      </FormRow>
      <FormRow>
        <li>
          <Input
            type='radio'
            name='category'
            id='chair'
            value='chair'
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
          {...register('tags')}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor='unitPrice'>Unit Price</Label>
        <Input type='number' id='unitPrice' {...register('unitPrice')} />
      </FormRow>
      <FormRow>
        <Label htmlFor='designer'>Designer</Label>
        <Input type='text' id='designer' {...register('designer')} />
      </FormRow>
      <FormRow>
        <Label htmlFor='material'>Material</Label>
        <TextArea
          id='material'
          name='material'
          rows='4'
          {...register('material')}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor='description1'>Description Paragraph 1</Label>
        <TextArea
          id='description1'
          name='description1'
          rows='4'
          {...register('description1')}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor='description2'>Description Paragraph 2</Label>
        <TextArea
          id='description2'
          name='description2'
          rows='4'
          {...register('description2')}
        />
      </FormRow>
      <FormRow>
        <Label htmlFor='measurements'>Measurements</Label>
        <TextArea
          id='measurements'
          name='measurements'
          rows='4'
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
