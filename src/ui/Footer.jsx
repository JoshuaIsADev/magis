import styled from 'styled-components';
import Heading from './Heading';
import Section from './Section';
import Row from './Row';
import Column from './Column';
import Hr from './Hr';
import SectionHeading from './SectionHeading';

function Footer() {
  return (
    <footer>
      <Section $variation='footer'>
        <SectionHeading text='Magis' />
        <Hr />
        <Row>
          <Column $variation='footerAbout'>
            <Heading as='h3' $variation='footer'>
              About
            </Heading>
            <p>
              Magis is a Latin word meaning “more“. And this is precisely the
              origin of the propulsive drive for experimentation. To be and do
              more.
            </p>
            <p>
              Magis has always believed in young and emerging talents, and over
              the years, the company has grown and experimented alongside many
              of them, now famous on the international scene. Jasper Morrison,
              Konstantin Grcic, Philippe Starck, Ronan & Erwan Bouroullec and
              Jerszy Seymour are just some of the designers who are part of the
              Magis family.
            </p>
            <p>
              An eclectic, versatile design that graces homes, public spaces and
              the permanent exhibitions of more than 35 museums around the
              world, and has won close to a hundred extremely prestigious
              accolades, including five Compasso d’Oro awards, the oldest and
              most authoritative worldwide design award.
            </p>
          </Column>
          <Column $variation='footerContact'>
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
          </Column>
        </Row>
      </Section>
    </footer>
  );
}

export default Footer;
