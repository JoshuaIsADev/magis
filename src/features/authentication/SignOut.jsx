import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { useSignOut } from './useSignOut';
import Spinner from '../../ui/Spinner';

function SignOut() {
  const { signOut, isPending } = useSignOut();

  return (
    <button disabled={isPending} onClick={signOut}>
      {!isPending ? <HiArrowRightOnRectangle /> : <Spinner />}
    </button>
  );
}

export default SignOut;
