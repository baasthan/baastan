import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Logo from '../assets/images/logo.svg'; 

export default function IntroScreen() {
  return (
    <View style={styles.container}>
      <Logo width={120} height={120} style={styles.logo} />
      <Text style={styles.title}>baasthan</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#3B47F6',
  },
});
