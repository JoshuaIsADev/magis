import { useNavigate } from 'react-router-dom';
import { signOut as signOutApi } from '../../services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useSignOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signOut, isPending } = useMutation({
    mutationFn: signOutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/signIn', { replace: true });
    },
  });

  return { signOut, isPending };
}
