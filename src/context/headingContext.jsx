import { createContext, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const HeadingContext = createContext({
  headingColor: 'var(--color-grey-900)',
});

export const HeadingProvider = ({ children }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const [headingColor, setHeadingColor] = useState('var(--color-brand)');

  useEffect(() => {
    if (inView) {
      setHeadingColor('var(--color-brand)');
    } else {
      setHeadingColor('var(--color-grey-900)');
    }
  }, [inView]);

  const value = { headingColor, setHeadingColor, ref, inView };

  return (
    <HeadingContext.Provider value={value}>{children}</HeadingContext.Provider>
  );
};
