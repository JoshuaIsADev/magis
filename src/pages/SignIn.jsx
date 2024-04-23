import SignInForm from '../features/authentication/SignInForm';
import SectionHeading from '../ui/SectionHeading.jsx';
import Hr from '../ui/Hr';
import Section from '../ui/Section';

function SignIn() {
  return (
    <Section>
      <SectionHeading text='Sign in' />
      <Hr />
      <SignInForm />
    </Section>
  );
}

export default SignIn;
