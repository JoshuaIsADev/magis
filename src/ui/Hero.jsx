import styled from 'styled-components';
import { Heading } from './Heading.jsx';
import Img from './Img';

const StyledHero = styled.section`
  grid-area: hero;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    'heading about'
    'image about';
  border-bottom: var(--border);
  border-right: var(--border);
  border-left: var(--border);
`;

const HeadingContainer2 = styled.div`
  grid-area: heading;
  border-bottom: var(--border);
  padding: 1rem var(--cell);
`;

const ImageContainer = styled.div`
  grid-area: image;
  padding: var(--cell);
`;

const AboutContainer = styled.div`
  grid-area: about;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: var(--cell);
  border-left: var(--border);
`;

function Hero({ text }) {
  return (
    <StyledHero>
      <HeadingContainer2>
        <Heading as='h2' $variation='hero'>
          {text}
        </Heading>
      </HeadingContainer2>

      <ImageContainer>
        <Img
          $variation='hero'
          src='https://wuurkebuthemtrftoedw.supabase.co/storage/v1/object/public/product-images/Magis_hero.jpg'
        ></Img>
      </ImageContainer>
      <AboutContainer>
        <Heading as='h3'>About</Heading>
        <p className='large'>
          Magis is a Latin word meaning “more“. And this is precisely the origin
          of the propulsive drive for experimentation. To be and do more.
        </p>
        <p className='large'>
          Magis has always believed in young and emerging talents, and over the
          years, the company has grown and experimented alongside many of them,
          now famous on the international scene. Jasper Morrison, Konstantin
          Grcic, Philippe Starck, Ronan & Erwan Bouroullec and Jerszy Seymour
          are just some of the designers who are part of the Magis family.
        </p>
        <p className='large'>
          An eclectic, versatile design that graces homes, public spaces and the
          permanent exhibitions of more than 35 museums around the world, and
          has won close to a hundred extremely prestigious accolades, including
          five Compasso d’Oro awards, the oldest and most authoritative
          worldwide design award.
        </p>
      </AboutContainer>
    </StyledHero>
  );
}

export default Hero;
