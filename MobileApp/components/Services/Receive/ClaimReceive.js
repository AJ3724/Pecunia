import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal, Pressable } from 'react-native';
import Header from '../../Constants/Header';
import BottomNav from '../../Constants/BottomNav';

const ClaimReceive = ({ navigation }) => { // ✅ Changed from ClaimableReceive to ClaimReceive
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNote, setSelectedNote] = useState('');
  const [data, setData] = useState([
    { phone: "+961 76 552 110", amount: "$120", note: "Rent for August", claimed: false },
    { phone: "+961 03 889 441", amount: "$75", note: "sjssj", claimed: false },
    { phone: "+961 03 889 441", amount: "$705", note: "Gift money", claimed: false },
  ]);

  const openNote = (note) => {
    setSelectedNote(note);
    setModalVisible(true);
  };

  const handleClaim = (index) => {
    const newData = [...data];
    if (!newData[index].claimed) {
      newData[index].claimed = true;
      setData(newData);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Header text="" />

        <View style={styles.tableContainer}>

          {/* Table Header */}
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.headerText, styles.colPhone]}>Phone Number</Text>
            <Text style={[styles.headerText, styles.colAmount]}>Amount</Text>
            <Text style={[styles.headerText, styles.colNote]}>Note</Text>
            <Text style={[styles.headerText, styles.colClaimed]}>Claimed</Text>
          </View>

          {/* Table Rows */}
          {data.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.rowText, styles.colPhone]}>{item.phone}</Text>
              <Text style={[styles.rowText, styles.colAmount]}>{item.amount}</Text>

              <TouchableOpacity
                style={[styles.noteButton, styles.colNote]}
                onPress={() => openNote(item.note)}
              >
                <Text style={styles.noteButtonText}>View</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.claimButton,
                  styles.colClaimed,
                  item.claimed ? styles.claimedButton : null,
                ]}
                onPress={() => handleClaim(index)}
                disabled={item.claimed}
              >
                <Text style={styles.claimButtonText}>
                  {item.claimed ? "Received" : "Claim"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}

        </View>

        {/* Modal for Note */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Note</Text>
              <Text style={styles.modalText}>{selectedNote}</Text>

              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </ScrollView>

      <BottomNav active="receive" navigation={navigation} />
    </View>
  );
};

export default ClaimReceive; // ✅ Changed export name

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d9daddff",
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    paddingBottom: 90,
  },

  tableContainer: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 20,
  },

  tableRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
    overflow: 'hidden',
    backgroundColor: "#0A1F44",
  },

  tableHeader: {
    backgroundColor: "#0A1F44",
  },

  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    paddingVertical: 10,
    textAlign: "center",
  },

  rowText: {
    fontSize: 15,
    color: "#fff",
    paddingVertical: 10,
    textAlign: "center",
  },

  colPhone: { flex: 1.5 },
  colAmount: { flex: 1 },
  colNote: { flex: 1.2 },
  colClaimed: { flex: 1 },

  noteButton: {
    backgroundColor: "#1c4c6eff",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignItems: "center",
  },

  noteButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  claimButton: {
    backgroundColor: "#1c4c6eff",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
    alignItems: "center",
  },

  claimedButton: {
    backgroundColor: "#3374a2ff",
  },

  claimButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#0A1F44",
  },

  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },

  closeButton: {
    backgroundColor: "#0A1F44",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },

  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});