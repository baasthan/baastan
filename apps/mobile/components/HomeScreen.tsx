import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Logo from '../assets/images/logo.svg';
import { Ionicons } from '@expo/vector-icons';
import { useDrawer } from '../app/(tabs)/_layout';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Buy');
  const { openDrawer } = useDrawer();

  return (
    <ScrollView style={{ backgroundColor: '#fff' }}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={{ marginRight: 10 }}>
          <Ionicons name="menu" size={28} color="#3B47F6" />
        </TouchableOpacity>
        <Logo width={36} height={36} />
        <Text style={styles.brand}>baasthan</Text>
        <TouchableOpacity style={styles.postBtn}>
          <Text style={styles.postBtnText}>Post Property</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
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
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 48,
    paddingBottom: 12,
    backgroundColor: '#fff',
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
    marginLeft: 8,
  },
  postBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  content: {
    alignItems: 'center',
    width: '100%',
    paddingBottom: 80,
    backgroundColor: '#fff',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 16,
    marginTop: 8,
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
});