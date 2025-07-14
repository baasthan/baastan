import { useSession } from "@/lib/auth-client";

const useUser = () => {
  const { data, error, isPending, refetch } = useSession();
  const user = data ? data.user : null;
  const session = data ? data.session : null;
  const token = data ? data.session.token : null;
  return { data, error, isPending, refetch, user, session, token };
};

export default useUser;
