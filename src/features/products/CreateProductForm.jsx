import styled from 'styled-components';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import ProductRow from './ProductRow';
import TextArea from '../../ui/TextArea';
import Label from '../../ui/Label';

function CreateProductForm() {
  return (
    <Form>
      <FormRow>
        <Label htmlFor='name'>Product name</Label>
        <Input type='text' id='name' />
      </FormRow>

      <FormRow>
        <ul>
          <li>
            <Input type='radio' name='category' id='chair' value='chair' />
            <Label htmlFor='chair'>Chair</Label>
          </li>
          <li>
            <Input type='radio' name='category' id='table' value='table' />
            <Label htmlFor='table'>Table</Label>
          </li>
          <li>
            <Input type='radio' name='category' id='bench' value='bench' />
            <Label htmlFor='bench'>Bench</Label>
          </li>
          <li>
            <Input type='radio' name='category' id='sofa' value='sofa' />
            <Label htmlFor='sofa'>Sofa</Label>
          </li>
        </ul>
      </FormRow>

      <FormRow>
        <Label htmlFor='tags'>Tags</Label>
        <Input type='text' id='tags' />
      </FormRow>

      <FormRow>
        <Label htmlFor='unitPrice'>Unit Price</Label>
        <Input type='number' id='unitPrice' />
      </FormRow>

      <FormRow>
        <Label htmlFor='units'>Qty In Stock</Label>
        <Input type='number' id='units' />
      </FormRow>

      <FormRow>
        <Label htmlFor='designer'>Designer</Label>
        <Input type='text' id='designer' />
      </FormRow>

      <FormRow>
        <Label htmlFor='material'>Material</Label>
        <TextArea id='material' name='material' rows='4' />
      </FormRow>

      <FormRow>
        <Label htmlFor='description1'>Description Paragraph 1</Label>
        <TextArea id='description1' name='description1' rows='4' />
      </FormRow>

      <FormRow>
        <Label htmlFor='description2'>Description Paragraph 2</Label>
        <TextArea id='description2' name='description2' rows='4' />
      </FormRow>

      <FormRow>
        <Label htmlFor='measurements'>Measurements</Label>
        <TextArea id='measurements' name='measurements' rows='4' />
      </FormRow>

      <FormRow>
        <Label htmlFor='mainImage'>Main Images</Label>
        <Input type='file' id='mainImage' accept='image/jpg' multiple />
      </FormRow>

      <FormRow>
        <Label htmlFor='image'>Images</Label>
        <Input type='file' id='image' accept='image/jpg' multiple />
      </FormRow>
    </Form>
  );
}

export default CreateProductForm;
