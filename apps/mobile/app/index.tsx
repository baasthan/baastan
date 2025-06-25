import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import IntroScreen from '../components/IntroScreen';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/(tabs)'); 
    }, 2500);
    return () => clearTimeout(timer);
  }, [router]);

  return <IntroScreen />;
}
