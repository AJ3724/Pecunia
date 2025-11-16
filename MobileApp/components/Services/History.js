import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
//import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import BottomNav from '../Constants/BottomNav';
import Header from '../Constants/Header';

const History = ({ navigation }) => {
  const [filterType, setFilterType] = useState('all');
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  const transactions = [
    { id: '1', type: 'sent', amount: 120, date: '2025-01-14', status: 'Completed' },
    { id: '2', type: 'received', amount: 85, date: '2025-01-14', status: 'Completed' },
    { id: '3', type: 'sent', amount: 300, date: '2025-01-13', status: 'Pending' },
    { id: '4', type: 'received', amount: 50, date: '2025-01-12', status: 'Completed' },
  ];

  const filteredTransactions = transactions.filter((t) => {
    let typeMatch = filterType === 'all' || t.type === filterType;
    let dateMatch = true;
    const tDate = new Date(t.date);

    if (fromDate) dateMatch = dateMatch && tDate >= fromDate;
    if (toDate) dateMatch = dateMatch && tDate <= toDate;

    return typeMatch && dateMatch;
  });

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.itemType}>{item.type === 'sent' ? 'Sent' : 'Received'}</Text>
        <Text style={styles.itemDate}>{item.date}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.itemAmount}>${item.amount}</Text>
        <Text style={styles.itemStatus}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* NAVBAR HEADER */}
      <Header text="" />

      {/* DATE PICKERS */}
      <View style={styles.dateRow}>
        <TouchableOpacity style={styles.dateBtn} onPress={() => setShowFromPicker(true)}>
          <Ionicons name="calendar" size={18} color="#fff" />
          <Text style={styles.dateText}>{fromDate ? fromDate.toLocaleDateString() : 'From Date'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dateBtn} onPress={() => setShowToPicker(true)}>
          <Ionicons name="calendar" size={18} color="#fff" />
          <Text style={styles.dateText}>{toDate ? toDate.toLocaleDateString() : 'To Date'}</Text>
        </TouchableOpacity>
      </View>

      {/* {showFromPicker && (
        <DateTimePicker
          value={fromDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowFromPicker(false);
            if (date) setFromDate(date);
          }}
        />
      )}

      {showToPicker && (
        <DateTimePicker
          value={toDate || new Date()}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowToPicker(false);
            if (date) setToDate(date);
          }}
        />
      )} */}

      {/* TYPE FILTERS */}
      <View style={styles.filterRow}>
        <TouchableOpacity onPress={() => setFilterType('all')} style={[styles.filterBtn, filterType === 'all' && styles.activeFilter]}> 
          <Text style={[styles.filterText, filterType === 'all' && styles.activeFilterText]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterType('sent')} style={[styles.filterBtn, filterType === 'sent' && styles.activeFilter]}> 
          <Text style={[styles.filterText, filterType === 'sent' && styles.activeFilterText]}>Sent</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilterType('received')} style={[styles.filterBtn, filterType === 'received' && styles.activeFilter]}> 
          <Text style={[styles.filterText, filterType === 'received' && styles.activeFilterText]}>Received</Text>
        </TouchableOpacity>
      </View>

      {/* HISTORY LIST */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
      />

      {/* BOTTOM NAVBAR */}
      <BottomNav active="transactions" navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#d9daddff' 
  },
  dateRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 15, 
    backgroundColor: '#fff' 
  },
  dateBtn: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#0A1F44', 
    padding: 10, 
    borderRadius: 12, 
    width: '48%', 
    justifyContent: 'center' 
  },
  dateText: { 
    color: '#fff', 
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600'
  },
  filterRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    paddingVertical: 15, 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderColor: '#ddd' 
  },
  filterBtn: { 
    paddingVertical: 8, 
    paddingHorizontal: 20, 
    borderRadius: 20, 
    backgroundColor: '#e4e9f7' 
  },
  activeFilter: { 
    backgroundColor: '#0A1F44' 
  },
  filterText: { 
    color: '#0A1F44', 
    fontWeight: '600' 
  },
  activeFilterText: {
    color: '#fff'
  },
  itemContainer: { 
    backgroundColor: '#fff', 
    padding: 15, 
    marginBottom: 12, 
    borderRadius: 12, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    shadowColor: '#000', 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    elevation: 2 
  },
  itemType: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#0A1F44'
  },
  itemDate: { 
    fontSize: 13, 
    color: '#666',
    marginTop: 4
  },
  itemAmount: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#0A1F44'
  },
  itemStatus: { 
    fontSize: 13, 
    color: '#009944',
    marginTop: 4
  }
});

export default History;