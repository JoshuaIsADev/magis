import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useSignOut } from './useSignOut';
import SpinnerMini from '../../ui/SpinnerMini';

function SignOut() {
  const { signOut, isPending } = useSignOut();

  return (
    <button disabled={isPending} onClick={signOut}>
      {!isPending ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </button>
  );
}

export default SignOut;
