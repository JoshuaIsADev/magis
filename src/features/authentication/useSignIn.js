import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signIn as signInApi } from '../../services/apiAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: signIn, isPending } = useMutation({
    mutationFn: ({ email, password }) => signInApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueriesData(['user', user]);
      navigate('/manage');
    },
    onError: (err) => {
      console.log('ERROR', err);
      toast.error('Email or password are incorrect');
    },
  });
  return { signIn, isPending };
}