import Heading from '../ui/Heading';

export function spreadText(text, variation) {
  return (
    <>
      {text.split('').map((letter, index) => (
        <div key={index}>
          <Heading as='h1' $variation={variation}>
            {letter}
          </Heading>
        </div>
      ))}
    </>
  );
}
