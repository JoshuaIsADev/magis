import styled from 'styled-components';
import Heading from './Heading';
import Hr from './Hr';
import Row from './Row';
import Column from './Column';

function SectionHeading({ text }) {
  return (
    <Row $variation='sectionHeading'>
      <Column $variation='sectionHeading'>
        <Heading as='h3'>{text}</Heading>
      </Column>
    </Row>
  );
}

export default SectionHeading;
