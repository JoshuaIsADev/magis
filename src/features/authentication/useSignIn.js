import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signIn as signInApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useContext } from 'react';
import { UserContext } from '../../context/user';

export function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);
  const { mutate: signIn, isPending } = useMutation({
    mutationFn: ({ email, password }) => signInApi({ email, password }),
    onSuccess: (user) => {
      queryClient.removeQueries('user');
      queryClient.setQueryData(['user', user.user]);
      // console.log(user.user);
      setCurrentUser(user.user);
      if (user.user.email === 'admin@test.com') {
        navigate('/manage', { replace: true });
      } else {
        navigate('/products', { replace: true });
      }
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Email or password are incorrect');
    },
  });
  return { signIn, isPending };
}
