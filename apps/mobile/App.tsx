import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import IntroScreen from './components/IntroScreen';
import HomeScreen from './components/HomeScreen';

type RootStackParamList = {
  Intro: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

type IntroSplashProps = NativeStackScreenProps<RootStackParamList, 'Intro'>;

function IntroSplash({ navigation }: IntroSplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return <IntroScreen />;
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={IntroSplash} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
