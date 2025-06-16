import { Session } from "@supabase/supabase-js";
import { createClient } from "@workspace/supabase-provider/nextjs/client";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const useAuthHook = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  const checkLoginState = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getSession();
    if (data && data.session) {
      setIsLoggedIn(true);
      setIsLoading(false);
      setSession(data.session);
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setSession(null);
    }
  }, []);
  useEffect(() => {
    checkLoginState();
  }, [checkLoginState]);

  const handeLogout = async () => {
    const supabase = createClient();
    setIsLoading(true);
    await supabase.auth.signOut();
    setIsLoading(false);
    setIsLoggedIn(false);
    setSession(null);
    router.refresh();
  };

  return {
    isLoading,
    isLoggedIn,
    user: session?.user || null,
    session,
    handeLogout,
  };
};

export default useAuthHook;
