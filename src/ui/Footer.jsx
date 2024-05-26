import styled from 'styled-components';
import { Heading, HeadingContainer } from './Heading.jsx';

const StyledFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: var(--grid-gap);
  padding: 0 var(--padding-body);
  flex-direction: column;
  margin: 8rem 0 1rem;
`;

const ColumnFooter = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @media (max-width: 1000px) {
    grid-column: span 3;
  }
  @media (max-width: 500px) {
    grid-column: span 6;
    padding-bottom: 2rem;
    &:last-child {
      padding-bottom: 0;
    }
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterHeadingContainer = styled.div``;

function Footer() {
  return (
    <StyledFooter>
      <HeadingContainer text='Info' />
      <ColumnFooter>
        <FooterHeadingContainer>
          <Heading as='h3'>Made in Italy</Heading>
        </FooterHeadingContainer>
        <ContentContainer>
          <p>
            An idea must not only be “good”, it must also satisfy the criteria
            of aesthetics and functionality, now and in the future. And it must
            tell a story. The story of Magis. This is why Magis produces in
            Italy. To preserve the local tradition of craftsmanship and meet the
            most exacting standards with Italian-made quality.
          </p>
          <p>
            Magis’ roots lie in Motta di Livenza, a small town in the heart of
            the Veneto region. This is where the challenge to design and the
            desire to create a place of authentic creativity arose. Since 2010
            it has had a new home in nearby Torre di Mosto.
          </p>
          <p>
            An Italian-made genius loci. Exemplary, ethical, and accessible to
            all. Ready to make a difference in the vision of contemporary
            living.
          </p>
        </ContentContainer>
      </ColumnFooter>
      <ColumnFooter>
        <FooterHeadingContainer>
          <Heading as='h3'>Reach out</Heading>
        </FooterHeadingContainer>
        <ContentContainer>
          <p>Magis Spa</p>
          <div>
            <p>via Triestina, Accesso E - Z.I. Ponte Tezze</p>
            <p>30020 Torre di Mosto - Ve / Italia</p>
          </div>
          <p>T +39 0421 319600</p>
          <div>
            <p>info@magisdesign.com REA VE n. 334170</p>
            <p>P.Iva 00475570263</p>
          </div>
        </ContentContainer>
      </ColumnFooter>
    </StyledFooter>
  );
}

export default Footer;
