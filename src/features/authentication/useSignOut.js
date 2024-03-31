import { useNavigate } from 'react-router-dom';
import { signOut as signOutApi } from '../../services/apiAuth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';

export function useSignOut() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setCurrentUser } = useContext(UserContext);

  const { mutate: signOut, isPending } = useMutation({
    mutationFn: signOutApi,
    onSuccess: () => {
      queryClient.removeQueries();
      navigate('/signIn', { replace: true });
      setCurrentUser(null);
    },
  });

  return { signOut, isPending };
}
