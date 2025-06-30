import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Keyboard, ActivityIndicator } from 'react-native';
import Logo from '../assets/images/logo.svg';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useDrawer } from '../app/_layout';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('Buy');
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();
  const { openDrawer } = useDrawer(); //

  const suggestions = [
    {
      title: 'Blue Apartement',
      address: 'Mojosongo street no 123, Solo',
      image: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&w=100&q=80',
    },
    {
      title: 'Green Villa',
      address: 'Sunset Boulevard 456, LA',
      image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=100&q=80',
    },
    {
      title: 'Red Cottage',
      address: 'Maple Street 789, NY',
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=100&q=80',
    },
  ];

  const recentlyAdded = [
    {
      id: 1,
      title: 'Palm Harbor',
      location: 'Highland Lake, FL',
      price: '₹2,095',
      image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=400&q=80',
      beds: 3,
      baths: 2,
      area: '5x7 m²',
      rating: 5.0,
      popular: true,
    },
    {
      id: 2,
      title: 'Lake House',
      location: 'Crystal Lake, MI',
      price: '₹1,850',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      beds: 4,
      baths: 3,
      area: '6x8 m²',
      rating: 4.8,
      popular: false,
    },
  ];

  const loading = false;

  return (
    <ScrollView style={{ backgroundColor: '#fff' }} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity onPress={openDrawer} style={styles.menuBtn}>
          <Ionicons name="menu" size={28} color="#3B47F6" />
        </TouchableOpacity>
        <Logo width={36} height={36} />
        <Text style={styles.brand}>baasthan</Text>
        <TouchableOpacity style={styles.postBtn}>
          <Text style={styles.postBtnText}>Post Property</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.locationRow}>
          <Text style={styles.locationIcon}>📍</Text>
          <Text style={styles.locationText}>Dwarka, Delhi</Text>
        </View>

        <View style={styles.featuredCard}>
          <Text style={styles.featuredTitle}>Featured</Text>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80' }}
            style={styles.featuredImage}
          />

          <View style={{ width: '100%', alignItems: 'center', marginTop: 8 }}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={20} color="#3B47F6" style={{ marginRight: 8 }} />
              <TextInput
                placeholder="Search..."
                style={styles.searchInput}
                value={search}
                onChangeText={text => {
                  setSearch(text);
                  setShowDropdown(text.length > 0);
                }}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                onFocus={() => setShowDropdown(search.length > 0)}
              />
            </View>
          </View>
        </View>

        {showDropdown && suggestions.length > 0 && (
          <View style={styles.dropdown}>
            {suggestions.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.dropdownItem}
                onPress={() => {
                  setSearch(item.title);
                  setShowDropdown(false);
                  Keyboard.dismiss();
                }}
              >
                <Image source={{ uri: item.image }} style={styles.dropdownImage} />
                <View>
                  <Text style={styles.dropdownTitle}>{item.title}</Text>
                  <Text style={styles.dropdownAddress}>{item.address}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

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
                <Text style={selectedCategory === cat ? styles.categoryBtnText : styles.categoryBtnTextInactive}>
                  {cat}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        <View style={styles.recentlyAddedHeader}>
          <Text style={styles.recentlyAddedTitle}>Recently Added</Text>
          <TouchableOpacity onPress={() => router.push('/all-properties')}>
            <Text style={styles.seeAll}>See more</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="small" color="#3B47F6" style={{ marginVertical: 16 }} />
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.recentlyAddedList}>
            {recentlyAdded.length === 0 ? (
              <View style={{ padding: 20 }}>
                <Text style={{ color: '#888' }}>No properties found.</Text>
              </View>
            ) : (
              recentlyAdded.map(item => (
                <View key={item.id} style={styles.recentCard}>
                  <Image source={{ uri: item.image }} style={styles.recentImage} />
                  {item.popular && (
                    <View style={styles.popularBadge}>
                      <Text style={styles.popularBadgeText}>POPULAR</Text>
                    </View>
                  )}
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                  <Text style={styles.price}>{item.price}<Text style={{ color: '#888', fontSize: 13 }}>/month</Text></Text>
                  <Text style={styles.recentTitle}>{item.title}</Text>
                  <Text style={styles.recentLocation}>{item.location}</Text>
                  <View style={styles.recentInfoRow}>
                    <Ionicons name="bed-outline" size={16} color="#3B47F6" />
                    <Text style={styles.recentInfoText}>{item.beds}</Text>
                    <Ionicons name="water-outline" size={16} color="#3B47F6" style={{ marginLeft: 8 }} />
                    <Text style={styles.recentInfoText}>{item.baths}</Text>
                    <Ionicons name="resize-outline" size={16} color="#3B47F6" style={{ marginLeft: 8 }} />
                    <Text style={styles.recentInfoText}>{item.area}</Text>
                  </View>
                </View>
              ))
            )}
          </ScrollView>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    paddingRight: 18,
    paddingTop: 48,
    paddingBottom: 12,
    backgroundColor: '#fff',
  },
  menuBtn: {
    marginRight: 6,
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
    marginBottom: 0,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
    paddingVertical: 4,
  },
  dropdown: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    paddingVertical: 8,
    marginBottom: 16,
    zIndex: 100,
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownImage: {
    width: 38,
    height: 38,
    borderRadius: 8,
    marginRight: 14,
  },
  dropdownTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#3B47F6',
  },
  dropdownAddress: {
    fontSize: 13,
    color: '#444',
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
  recentlyAddedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginTop: 18,
    marginBottom: 8,
  },
  recentlyAddedTitle: {
    fontWeight: 'bold',
    fontSize: 17,
    color: '#222',
  },
  seeAll: {
    color: '#3B47F6',
    fontWeight: 'bold',
    fontSize: 14,
  },
  recentlyAddedList: {
    width: '100%',
    paddingLeft: 18,
  },
  recentCard: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 8,
    position: 'relative',
  },
  recentImage: {
    width: '100%',
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
  },
  popularBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#3B47F6',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 2,
  },
  popularBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  ratingBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
  ratingText: {
    color: '#222',
    fontWeight: 'bold',
    fontSize: 11,
    marginLeft: 2,
  },
  price: {
    color: '#3B47F6',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 2,
  },
  recentTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#222',
    marginTop: 2,
  },
  recentLocation: {
    color: '#888',
    fontSize: 13,
    marginBottom: 4,
  },
  recentInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  recentInfoText: {
    color: '#3B47F6',
    fontSize: 13,
    marginLeft: 2,
  },
});