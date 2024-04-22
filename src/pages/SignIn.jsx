import SignInForm from '../features/authentication/SignInForm';
import { SectionHeading } from '../ui/HeroText';
import Section from '../ui/Section';
import { spreadTextSection } from '../utils/spreadText';

function SignIn() {
  return (
    <Section>
      <SectionHeading>{spreadTextSection('Sign in', 'hero')}</SectionHeading>
      <SignInForm />
    </Section>
  );
}

export default SignIn;
