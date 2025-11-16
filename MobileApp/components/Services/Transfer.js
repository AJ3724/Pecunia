import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Header from '../Constants/Header';
import BottomNav from '../Constants/BottomNav';

const Transfer = ({ navigation }) => {
  const [amount, setAmount] = React.useState('');
  const [number, setNumber] = React.useState('');
  const [note, setNote] = React.useState(''); // Add state for the note

  const handleContinue = () => {
    if (!amount.trim() || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert("Error", "Please enter a valid amount");
      return;
    }

    if (number.trim() === "") {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    // Proceeding with transfer
    Alert.alert("Success", "Proceeding to transfer...");

    // Clear all inputs
    setAmount('');
    setNumber('');
    setNote('');
  };

  return (
    <View style={styles.container}>
      <Header text="" />

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer}>
        <View style={styles.content}>

          {/* Phone Number */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Receiver's Phone Number</Text>
            <TextInput 
              style={styles.input}
              onChangeText={setNumber}
              keyboardType="phone-pad"
              placeholder="Enter phone number"
              value={number}
            />
          </View>

          {/* Amount */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Amount to Transfer (USD)</Text>
            <TextInput 
              style={styles.input}
              onChangeText={setAmount} 
              keyboardType="numeric"
              placeholder="0.00"
              value={amount}
            />
          </View>

          {/* Note */}
          <View style={styles.inputSection}>
            <Text style={styles.label}>Leave a Note (optional)</Text>
            <TextInput 
              style={[styles.input, styles.noteInput]}
              multiline
              numberOfLines={3}
              placeholder="Add a message..."
              textAlignVertical="top"
              value={note}
              onChangeText={setNote}
            />
          </View>

          {/* Warning */}
          <Text style={styles.warning}>
             Be careful: if you fall victim to a scam you may not get your money back.
            {"\n"}Cancellation is not available for transfers.
          </Text>

          {/* Button */}
          <TouchableOpacity onPress={handleContinue} style={styles.button}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      <BottomNav active="send" navigation={navigation} />
    </View>
  );
};

export default Transfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9daddff',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingBottom: 100, // Space for BottomNav
  },
  content: {
    padding: 20,
  },
  inputSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#0A1F44',
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 15,
    fontSize: 18,
  },
  noteInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  warning: {
    color: '#fd0000ac',
    fontSize: 14,
    marginTop: 10,
    marginBottom: 25,
    lineHeight: 20,
    fontWeight: '600',
  },
  button: {
    backgroundColor: '#0A1F44',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
