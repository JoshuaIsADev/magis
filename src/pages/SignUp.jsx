import SignUpForm from '../features/authentication/SignUpForm';
import Hr from '../ui/Hr';
import Section from '../ui/Section';
import SectionHeading from '../ui/SectionHeading';

function SignUp() {
  return (
    <Section>
      <SectionHeading text='Sign up' />
      <Hr />
      <SignUpForm />
    </Section>
  );
}

export default SignUp;
