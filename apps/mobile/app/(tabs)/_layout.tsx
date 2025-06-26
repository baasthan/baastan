import React, { useState, createContext, useContext, useRef, useEffect } from 'react';
import { Stack } from 'expo-router';
import { View, Modal, Pressable, Text, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const DrawerContext = createContext({ openDrawer: () => {} });
export const useDrawer = () => useContext(DrawerContext);

const DRAWER_OPTIONS = [
  { key: 'home', label: 'Home', icon: 'home-outline' },
  { key: 'feedback', label: 'Feedback', icon: 'chatbubble-ellipses-outline' },
  { key: 'rateus', label: 'Rate Us', icon: 'star-outline' },
  { key: 'share', label: 'Share', icon: 'share-social-outline' },
  { key: 'settings', label: 'Settings', icon: 'settings-outline' },
];

const DRAWER_WIDTH = 260;

export default function TabsLayout({ children }) {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;

  useEffect(() => {
    if (drawerVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 250,
        useNativeDriver: true,
      }).start();
    }
  }, [drawerVisible]);

  return (
    <DrawerContext.Provider value={{ openDrawer: () => setDrawerVisible(true) }}>
      <View style={{ flex: 1 }}>
        {/* Drawer Modal */}
        <Modal
          visible={drawerVisible}
          transparent
          animationType="none"
          onRequestClose={() => setDrawerVisible(false)}
        >
          <Pressable
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.2)' }}
            onPress={() => setDrawerVisible(false)}
          />
          <Animated.View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: DRAWER_WIDTH,
              backgroundColor: '#fff',
              paddingTop: 48,
              paddingHorizontal: 20,
              shadowColor: '#000',
              shadowOpacity: 0.15,
              shadowRadius: 12,
              shadowOffset: { width: 2, height: 0 },
              zIndex: 20,
              height: '100%',
              transform: [{ translateX: slideAnim }],
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#3B47F6', marginBottom: 24 }}>Menu</Text>
            {DRAWER_OPTIONS.map(opt => (
              <TouchableOpacity
                key={opt.key}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: '#f0f0f0',
                }}
              >
                <Ionicons name={opt.icon as any} size={22} color="#3B47F6" style={{ marginRight: 16 }} />
                <Text style={{ fontSize: 16, color: '#3B47F6', fontWeight: 'bold' }}>{opt.label}</Text>
              </TouchableOpacity>
            ))}
          </Animated.View>
        </Modal>
        {/* Hide default Stack header so you can use your own in HomeScreen */}
        <Stack screenOptions={{ headerShown: false }} />
        {children}
      </View>
    </DrawerContext.Provider>
  );
}