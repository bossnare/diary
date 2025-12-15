import { supabase } from '@/auth-services/clients.service';
import type { Session, User } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [pending, setPending] = useState(true);

  const navigate = useNavigate();

  // OAuth
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user || null);
      setPending(false);
    };

    checkSession();

    // Listen auth change
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user || null);
        setPending(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    // redirect
    if (session) navigate('/dashboard', { replace: true });
  }, [session, navigate]);

  return { session, user, pending };
};
