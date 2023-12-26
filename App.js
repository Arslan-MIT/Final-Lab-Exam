import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import useFastFoodData from './useFastFoodData';

const FastFood = () => {
  const {
    fastFoodData,
    filteredData,
    searchQuery,
    setSearchQuery,
    toggleSortOrder,
  } = useFastFoodData('asc');

  // Rest of your component code...

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Architecture</Text>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={(text) => {
            setSearchQuery(text);
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
