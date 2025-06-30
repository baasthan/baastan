import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const dummyProperties = Array(6).fill({
  id: Math.random().toString(),
  title: 'Shakti 3BHK Flat',
  location: 'Bangalore University Road, Bangalore',
  price: '₹1.8 lac',
  rent: '₹5000 Monthly',
  features: '3 Bed, 2 Bath, 1 Balcony',
  image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
});

const filters = [
  { label: 'Filters' },
  { label: 'Budget' },
  { label: 'Preference' },
  { label: 'BHK' },
  { label: 'Verified' },
];

export default function AllPropertiesScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 40 }}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={{ padding: 8 }}>
          <Ionicons name="arrow-back" size={24} color="#3B47F6" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recently Added</Text>
      </View>
      <View style={styles.filtersRowWrap}>
        {filters.map((filter, idx) => (
          <TouchableOpacity
            key={idx}
            style={
              selectedFilter === idx
                ? styles.filterBtnSelected
                : styles.filterBtn
            }
            onPress={() => setSelectedFilter(idx)}
          >
            <Text
              style={
                selectedFilter === idx
                  ? styles.filterBtnTextSelected
                  : styles.filterBtnText
              }
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={dummyProperties}
        keyExtractor={(_, idx) => idx.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardLocation}>{item.location}</Text>
                <Text style={styles.cardPrice}>{item.price} <Text style={styles.cardRent}>| {item.rent}</Text></Text>
                <Text style={styles.cardFeatures}>{item.features}</Text>
                <TouchableOpacity style={styles.contactBtn}>
                  <Text style={styles.contactBtnText}>Contact Owner</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.shareBtn}>
                <Ionicons name="share-social-outline" size={20} color="#3B47F6" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B47F6',
    marginLeft: 8,
  },
  filtersRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 8,
    marginBottom: 8,
    paddingVertical: 4,
    gap: 8,
  },
  filterBtn: {
    backgroundColor: '#F2F4FF',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 8,
  },
  filterBtnSelected: {
    backgroundColor: '#3B47F6',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 8,
  },
  filterBtnText: {
    color: '#3B47F6',
    fontWeight: '500',
  },
  filterBtnTextSelected: {
    color: '#fff',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  cardImage: {
    width: 90,
    height: 90,
    borderRadius: 12,
    margin: 12,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  cardLocation: {
    color: '#888',
    fontSize: 13,
    marginBottom: 2,
  },
  cardPrice: {
    color: '#3B47F6',
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 2,
  },
  cardRent: {
    color: '#888',
    fontWeight: '400',
    fontSize: 13,
  },
  cardFeatures: {
    color: '#3B47F6',
    fontSize: 13,
    marginBottom: 8,
  },
  contactBtn: {
    backgroundColor: '#3B47F6',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 7,
    alignSelf: 'flex-start',
    marginTop: 2,
  },
  contactBtnText: {
    color: '#fff',
    fontWeight: '500',
  },
  shareBtn: {
    marginLeft: 8,
    marginTop: 2,
    padding: 6,
  },
}); 