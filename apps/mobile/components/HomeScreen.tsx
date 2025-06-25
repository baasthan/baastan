import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native';
import Logo from '../assets/images/logo.svg';
import { Ionicons } from '@expo/vector-icons';

const DRAWER_OPTIONS = [
  { key: 'home', label: 'Home', icon: 'home-outline' },
  { key: 'feedback', label: 'Feedback', icon: 'chatbubble-ellipses-outline' },
  { key: 'rateus', label: 'Rate Us', icon: 'star-outline' },
  { key: 'share', label: 'Share', icon: 'share-social-outline' },
  { key: 'settings', label: 'Settings', icon: 'settings-outline' },
];

export default function HomeScreen() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Buy');

  return (
    <>
      {/* Side Drawer */}
      <Modal
        visible={drawerVisible}
        animationType="none"
        transparent
        onRequestClose={() => setDrawerVisible(false)}
      >
        <Pressable style={styles.drawerOverlay} onPress={() => setDrawerVisible(false)} />
        <View style={styles.drawerContentAnimated}>
          <Text style={styles.drawerTitle}>Menu</Text>
          {DRAWER_OPTIONS.map(opt => (
            <TouchableOpacity key={opt.key} style={styles.drawerItem}>
              <Ionicons name={opt.icon as any} size={22} color="#3B47F6" style={{ marginRight: 16 }} />
              <Text style={styles.drawerLabel}>{opt.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <ScrollView style={{ backgroundColor: '#fff' }} contentContainerStyle={styles.container}>
        {/* Header with Hamburger */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.hamburgerBtn} onPress={() => setDrawerVisible(true)}>
            <Ionicons name="menu" size={28} color="#3B47F6" />
          </TouchableOpacity>
          <Logo width={36} height={36} />
          <Text style={styles.brand}>baasthan</Text>
          <TouchableOpacity style={styles.postBtn}>
            <Text style={styles.postBtnText}>Post Property</Text>
          </TouchableOpacity>
        </View>
        {/* Location */}
        <View style={styles.locationRow}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText}>Dwarka, Delhi</Text>
        </View>
        {/* Featured Card */}
        <View style={styles.featuredCard}>
          <Text style={styles.featuredTitle}>Featured</Text>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }} style={styles.featuredImage} />
          <View style={styles.searchBar}>
            <TextInput placeholder="Search..." style={styles.searchInput} />
          </View>
        </View>
        {/* Categories */}
        <View style={styles.categoriesRow}>
          {['Buy', 'Rent', 'PG'].map((cat) => (
            <View style={styles.categoryItem} key={cat}>
              <Image
                source={{
                  uri:
                    cat === 'Buy'
                      ? 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=100&q=80'
                      : cat === 'Rent'
                      ? 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=100&q=80'
                      : 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=100&q=80',
                }}
                style={styles.categoryImage}
              />
              <TouchableOpacity
                style={selectedCategory === cat ? styles.categoryBtn : styles.categoryBtnInactive}
                onPress={() => setSelectedCategory(cat)}
              >
                <Text style={selectedCategory === cat ? styles.categoryBtnText : styles.categoryBtnTextInactive}>{cat}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 80, // more space for tab bar
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  hamburgerBtn: {
    marginRight: 8,
  },
  brand: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3B47F6',
    marginLeft: 8,
    flex: 1,
  },
  postBtn: {
    backgroundColor: '#3B47F6',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  postBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 16,
  },
  locationIcon: {
    fontSize: 18,
    marginRight: 4,
  },
  locationText: {
    fontSize: 15,
    color: '#222',
  },
  featuredCard: {
    width: '90%',
    backgroundColor: '#f6f8ff',
    borderRadius: 18,
    padding: 14,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  featuredTitle: {
    fontWeight: 'bold',
    color: '#3B47F6',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  featuredImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  searchBar: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    paddingVertical: 4,
  },
  categoriesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 8,
  },
  categoryItem: {
    alignItems: 'center',
    flex: 1,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryBtn: {
    backgroundColor: '#3B47F6',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 18,
    marginBottom: 4,
  },
  categoryBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  categoryBtnInactive: {
    backgroundColor: '#f6f8ff',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 18,
    marginBottom: 4,
  },
  categoryBtnTextInactive: {
    color: '#3B47F6',
    fontWeight: 'bold',
    fontSize: 15,
  },
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  drawerContentAnimated: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 260,
    backgroundColor: '#fff',
    paddingTop: 48,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 12,
    shadowOffset: { width: 2, height: 0 },
    zIndex: 20,
    // Slide in from left
    transform: [{ translateX: 0 }],
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3B47F6',
    marginBottom: 24,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  drawerLabel: {
    fontSize: 16,
    color: '#3B47F6',
    fontWeight: 'bold',
  },
});
