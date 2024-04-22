import styled from 'styled-components';
import Heading from './Heading';

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2rem;
  min-height: 100vh;
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  height: 100%;
  width: 100%;
  padding: var(--padding-s) var(--padding-s);
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 50%;
  max-width: 30rem;
  text-align: justify;
`;

const ContactColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 25%;
`;

const HeroTextRow = styled.div`
  grid-column: 1 / span 2;
`;

function Footer() {
  return (
    <StyledFooter>
      <FooterContainer>
        <InfoContainer>
          <Column>
            <Heading as='h3' $variation='footer'>
              Info
            </Heading>
            <p className='small'>
              Magis is a Latin word meaning “more“. And this is precisely the
              origin of the propulsive drive for experimentation. To be and do
              more.
            </p>
            <p className='small'>
              Magis has always believed in young and emerging talents, and over
              the years, the company has grown and experimented alongside many
              of them, now famous on the international scene. Jasper Morrison,
              Konstantin Grcic, Philippe Starck, Ronan & Erwan Bouroullec and
              Jerszy Seymour are just some of the designers who are part of the
              Magis family.
            </p>
            <p className='small'>
              An eclectic, versatile design that graces homes, public spaces and
              the permanent exhibitions of more than 35 museums around the
              world, and has won close to a hundred extremely prestigious
              accolades, including five Compasso d’Oro awards, the oldest and
              most authoritative worldwide design award.
            </p>
          </Column>
          <ContactColumn>
            <Heading as='h3' $variation='footer'>
              Reach out
            </Heading>
            <div>
              <p className='small'>Magis Spa</p>
              <p className='small'>
                via Triestina, Accesso E - Z.I. Ponte Tezze
              </p>
              <p className='small'>30020 Torre di Mosto - Ve / Italia</p>
            </div>
            <div>
              <p className='small'>T +39 0421 319600</p>
              <p className='small'>info@magisdesign.com REA VE n. 334170</p>
              <p className='small'>P.Iva 00475570263</p>
            </div>
          </ContactColumn>
        </InfoContainer>
      </FooterContainer>
    </StyledFooter>
  );
}

export default Footer;
