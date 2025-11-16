import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Alert, ScrollView } from 'react-native';
import Header from '../Constants/Header';
import { FileStorage } from '../../assets/FileStorage';

const GetStartedScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [countryCode, setCountryCode] = useState('+961');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Initialize file storage when component mounts
    FileStorage.initialize();
  }, []);

  const handleSignup = async () => {
    if (!phoneNumber.trim()) {
      Alert.alert('Error', 'Please enter your phone number');
      return;
    }

    const fullPhone = countryCode + phoneNumber;

    // Check if phone already exists
    const exists = await FileStorage.phoneExists(fullPhone);
    if (exists) {
      Alert.alert('Error', 'This phone number is already registered. Please login instead.');
      return;
    }

    // Show OTP modal
    Alert.alert('Verification', 'Enter code: 0000');
    setModalVisible(true);
  };

  const handleChangeOtp = (text, index) => {
    if (text.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
  };

  const handleVerify = () => {
    const code = otp.join("");

    if (code.length !== 4) {
      Alert.alert('Error', 'Please enter the 4-digit code.');
      return;
    }

    // Always accept 0000
    if (code !== '0000') {
      Alert.alert('Error', 'Invalid verification code. Use 0000');
      return;
    }

    // OTP verified, proceed to personal information
    setModalVisible(false);
    setOtp(["", "", "", ""]); // Reset OTP
    const fullPhone = countryCode + phoneNumber;
    navigation.navigate("PersonalInformation", { phoneNumber: fullPhone });
  };

  return (
    <View style={styles.container}>
      <Header text="" />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Get Started</Text>

          <Text style={styles.description}>
            Enter your mobile number. We will send you a confirmation code there.
          </Text>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Mobile Number</Text>

            <View style={styles.phoneRow}>
              <TextInput
                style={styles.codeInput}
                value={countryCode}
                onChangeText={setCountryCode}
                keyboardType="phone-pad"
                maxLength={5}
                placeholderTextColor="#999"
              />
              <TextInput
                style={styles.numberInput}
                placeholder="Enter your number"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
          </View>

          <Text style={styles.terms}>
            By entering your phone number, you agree to our terms and conditions.
          </Text>

          <TouchableOpacity onPress={handleSignup} style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginLinkText}>
              Already have an account? <Text style={styles.loginLinkBold}>Log In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Confirmation Code Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            <Text style={styles.modalTitle}>Enter Confirmation Code</Text>
            <Text style={styles.modalText}>Enter the code: 0000</Text>

            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  style={styles.otpInput}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={digit}
                  onChangeText={(text) => handleChangeOtp(text, index)}
                />
              ))}
            </View>

            <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
              <Text style={styles.verifyText}>Verify</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d9daddff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  contentContainer: {
    paddingHorizontal: 25,
    paddingVertical: 35,
  },
  title: {
    fontSize: 39,
    fontWeight: 'bold',
    color: '#0A1F44',
    marginBottom: 20,
  },
  description: {
    color: '#333',
    fontSize: 24,
    lineHeight: 28,
    marginBottom: 30,
    fontWeight: 'bold',
  },
  inputSection: {
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: '#0A1F44',
    fontWeight: '600',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  codeInput: {
    width: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 14,
    borderRadius: 12,
    fontSize: 18,
    backgroundColor: '#fff',
    textAlign: 'center',
    marginRight: 10,
  },
  numberInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 12,
    fontSize: 18,
    backgroundColor: '#fff',
  },
  terms: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#0A1F44',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
  loginLink: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  loginLinkText: {
    fontSize: 16,
    color: '#666',
  },
  loginLinkBold: {
    color: '#0A1F44',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#0A1F44',
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    width: '80%',
  },
  otpInput: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 22,
    backgroundColor: '#fff',
  },
  verifyButton: {
    backgroundColor: '#0A1F44',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginBottom: 15,
  },
  verifyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeText: {
    fontSize: 16,
    color: '#888',
  },
});

export default GetStartedScreen;