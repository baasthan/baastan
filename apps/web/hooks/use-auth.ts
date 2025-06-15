import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const useAuthHook = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const checkLoginState = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    if (data && data.session) {
      setUser(data.session.user);
      setIsLoggedIn(true);
      setIsLoading(false);
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };
  useEffect(() => {
    checkLoginState();
  }, []);

  const handeLogout = async () => {
    const supabase = createClient();
    setIsLoading(true);
    await supabase.auth.signOut();
    setIsLoading(false);
    setIsLoggedIn(false);
    setUser(null);
    router.refresh();
  };

  return { isLoading, isLoggedIn, user, handeLogout };
};

export default useAuthHook;
