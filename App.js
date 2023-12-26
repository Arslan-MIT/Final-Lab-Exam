import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  getDatabase,
  ref,
  onValue,
} from 'firebase/database';
import app from './firebase';

const FastFood = () => {
  const [fastFoodData, setFastFoodData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // Default ascending order

  useEffect(() => {
    const fetchData = async () => {
      const db = getDatabase(app);
      const fastFoodCollection = ref(db, 'fastFood');

      const unsubscribe = onValue(fastFoodCollection, (snapshot) => {
        const data = Object.entries(snapshot.val() || {}).map(([key, value]) => ({
          key,
          ...value,
        }));

        console.log("dfsfsdfsdfs", data);
        setFastFoodData(data);
        filterData(data, searchQuery);
      });

      return () => unsubscribe();
    };

    fetchData();
  }, [searchQuery]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const filterData = (data, query) => {
    if (!data) {
      setFilteredData([]);
      return;
    }

    const filtered = data.filter((item) => {
      const name = (item.name || '').toLowerCase();
      const city = (item.city || '').toLowerCase();
      const state = (item.state || '').toLowerCase();

      return (
        name.includes(query.toLowerCase()) ||
        city.includes(query.toLowerCase()) ||
        state.includes(query.toLowerCase())
      );
    });

    const sortedData = filtered.sort((a, b) => {
      const sortOrderFactor = sortOrder === 'asc' ? 1 : -1;
      return sortOrderFactor * (a.rank - b.rank);
    });

    const sections = sortedData.reduce((acc, item) => {
      const state = item.state || 'Other';
      const existingSection = acc.find((section) => section.title === state);

      if (existingSection) {
        existingSection.data.push(item);
      } else {
        acc.push({ title: state, data: [item] });
      }

      return acc;
    }, []);

    setFilteredData(sections);
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.foodDetails}>
        <Text style={styles.foodTitle}>{item.name}</Text>
        <Text style={styles.foodDetailsText}>City: {item.city}</Text>
        <Text style={styles.foodDetailsText}>State: {item.state}</Text>
        <Text style={styles.foodDetailsText}>Rank: {item.rank}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Architecture</Text>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={(text) => {
            setSearchQuery(text);
            filterData(fastFoodData, text);
          }}
          value={searchQuery}
        />
        <TouchableOpacity
          style={styles.sortButton}
          onPress={toggleSortOrder}
        >
          <Text style={styles.sortButtonText}>
            Sort by Rank {sortOrder === 'asc' ? '↓' : '↑'}
          </Text>
        </TouchableOpacity>
      </View>
      <SectionList
        sections={filteredData}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... (your existing styles)
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {
    backgroundColor: '#05a',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  sortButtonText: {
    color: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 60,
  },
  listContainer: {
    paddingHorizontal: 20,
    flexGrow: 1,
    alignContent: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: 'lightgrey',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 320,
    marginRight: 10,
  },
  foodDetails: {
    flex: 1,
    marginLeft: 10,
  },
  foodImage: {
    width: 120,
    height: 70,
    borderRadius: 10,
  },
  foodTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#05a',
  },
  foodDetailsText: {
    fontSize: 14,
    marginTop: 2,
    color: '#1a1a1a',
  },
  text: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#05a',
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 5,
    flex: 1,
  },
  sectionHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {
    backgroundColor: '#05a',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  sortButtonText: {
    color: '#fff',
  },
});

export default FastFood;