import { useAuth } from "../contexts/AuthContext";

interface IfPermittedProps {
  permission: string;
  children: React.ReactNode;
}

export default function IfPermitted({
  permission,
  children,
}: Readonly<IfPermittedProps>) {
  const { user } = useAuth();

  if (!user?.permissions?.includes(permission)) return null;

  return <>{children}</>;
}
