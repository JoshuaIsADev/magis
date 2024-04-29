import styled from 'styled-components';
import Heading from './Heading';

const StyledFooter = styled.section`
  grid-column: span 4;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: 'made info';
`;

const MadeContainer = styled.article`
  grid-area: made;
  display: flex;
  flex-direction: column;
  padding: var(--cell);
  gap: 2rem;
`;
const InfoContainer = styled.div`
  grid-area: info;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2rem;
  padding: var(--cell);
  border-left: var(--border);
`;

function Footer() {
  return (
    <StyledFooter>
      <MadeContainer>
        <Heading as='h3'>Made in Italy</Heading>
        <p className='medium'>
          An idea must not only be “good”, it must also satisfy the criteria of
          aesthetics and functionality, now and in the future. And it must tell
          a story. The story of Magis. This is why Magis produces in Italy. To
          preserve the local tradition of craftsmanship and meet the most
          exacting standards with Italian-made quality.
        </p>
        <p className='medium'>
          Magis’ roots lie in Motta di Livenza, a small town in the heart of the
          Veneto region. This is where the challenge to design and the desire to
          create a place of authentic creativity arose. Since 2010 it has had a
          new home in nearby Torre di Mosto.
        </p>
        <p className='medium'>
          An Italian-made genius loci. Exemplary, ethical, and accessible to
          all. Ready to make a difference in the vision of contemporary living.
        </p>
        <Heading as='h3' $variation='footer'>
          Reach out
        </Heading>
        <div>
          <p>Magis Spa</p>
          <p>via Triestina, Accesso E - Z.I. Ponte Tezze</p>
          <p>30020 Torre di Mosto - Ve / Italia</p>
        </div>
        <div>
          <p>T +39 0421 319600</p>
          <p>info@magisdesign.com REA VE n. 334170</p>
          <p>P.Iva 00475570263</p>
        </div>
      </MadeContainer>
      <InfoContainer>
        <p>This unofficial Magis website is for portfolio purposes</p>
        <p>Website by Joshua Llaneza</p>
      </InfoContainer>
    </StyledFooter>
  );
}

export default Footer;
