import styled from 'styled-components';
import { HeroText } from './HeroText';
import { spreadText } from '../utils/spreadText';

const StyledFooter = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 2rem;
  width: 100vw;
  min-height: 70vh;
  padding-top: 5rem;
  padding-right: var(--padding-right);
`;

const FooterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  height: 100%;
  width: 100%;
  padding: var(--padding-l) var(--padding-s) var(--padding-s);
  background-color: var(--color-brand);
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
  width: 65%;
  max-width: 55rem;
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
            <p className='small'>
              A story of ideas, creativity and experimentation. Since 1976. This
              is the know-how that Magis brings to the world of design.
              Established in Northern Italy as a family business, the ingenuity
              of the visionary Eugenio Perazza soon led it to become a great
              design laboratory for home, outdoor, office and contract
              furniture, and a global player in the design field.
            </p>
            <p className='small'>EXPERIMENTING… MORE</p>
            <p className='small'>
              Magis is a Latin word meaning “more“. And this is precisely the
              origin of the propulsive drive for experimentation. To be and do
              more. Magis has always believed in young and emerging talents, and
              over the years, the company has grown and experimented alongside
              many of them, now famous on the international scene. Jasper
              Morrison, Konstantin Grcic, Philippe Starck, Ronan & Erwan
              Bouroullec and Jerszy Seymour are just some of the designers who
              are part of the Magis family.
            </p>
          </Column>
          <ContactColumn>
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
        <HeroTextRow>
          <HeroText>{spreadText('Magis')}</HeroText>
        </HeroTextRow>
      </FooterContainer>
    </StyledFooter>
  );
}

export default Footer;
