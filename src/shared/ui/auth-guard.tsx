import { ReactNode } from 'react';
import { useAuth } from '../model/auth-context';
import { AuthDialog } from '../../features/auth-dialog';

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <AuthDialog />;
  }

  return <>{children}</>;
}
