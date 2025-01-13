import React, { useState } from "react";
import { View, Text, Image, SectionList, StyleSheet, TouchableOpacity, Modal } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // For icons

const AccountScreen: React.FC = () => {
  const [imageError, setImageError] = useState(false); // Track if the image fails to load
  const [modalVisible, setModalVisible] = useState(false); // Control modal visibility

  // All sections and their items
  const sections = [
    {
      title: "Account",
      data: [
        { title: "Personal Info", icon: "person-outline" },
        { title: "Login & Security", icon: "lock-closed-outline" },
        { title: "Privacy", icon: "shield-outline" },
      ],
    },
    {
      title: "Saved Places",
      data: [
        { title: "Add Home Address", icon: "home-outline" },
        { title: "Add Work Address", icon: "briefcase-outline" },
        { title: "Add a Place", icon: "location-outline" },
      ],
    },
    {
      title: "Settings",
      data: [
        { title: "Language", icon: "language-outline" },
        { title: "Communication Preferences", icon: "chatbubble-ellipses-outline" },
        { title: "Join Bolt Plus", icon: "flash-outline" },
        { title: "Calendars", icon: "calendar-outline" },
      ],
    },
    {
      title: "Account Options",
      data: [
        { title: "Log Out", icon: "log-out-outline" },
        { title: "Delete Account", icon: "trash-outline" },
      ],
    },
  ];

  const renderItem = ({ item }: { item: { title: string; icon: string } }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.itemContent}>
        <Icon name={item.icon} size={20} color="#555" style={styles.itemIcon} />
        <Text style={styles.itemText}>{item.title}</Text>
        <Icon name="chevron-forward-outline" size={20} color="#555" />
      </View>
    </TouchableOpacity>
  );

  const renderSection = ({ section }: { section: typeof sections[number] }) => (
    <View style={styles.sectionContainer}>
      {section.title && <Text style={styles.sectionHeader}>{section.title}</Text>}
      {section.data.map((item, index) => renderItem({ item }))}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          {imageError ? (
            // Placeholder for missing image
            <View style={styles.placeholder}>
              <Icon name="person-outline" size={40} color="#999" />
            </View>
          ) : (
            <Image
              source={{ uri: "https://images.fandango.com/ImageRenderer/300/0/redesign/static/img/default_poster.png/0/images/masterrepository/performer%20images/179480/robert162574544.jpg" }} // Replace with actual image URL
              style={styles.profileImage}
              onError={() => setImageError(true)} // Trigger fallback if image fails to load
            />
          )}
        </TouchableOpacity>
        <Text style={styles.profileName}>Osama Alhasan</Text>
        <Text style={styles.profileRating}>⭐ 5 Rating</Text>
      </View>

      {/* Image Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back button
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {imageError ? (
              <View style={styles.placeholderModal}>
                <Icon name="person-outline" size={80} color="#999" />
              </View>
            ) : (
              <Image
                source={{ uri: "https://via.placeholder.com/200" }} // Replace with actual image URL
                style={styles.fullImage}
              />
            )}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)} // Close modal on button press
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Section List */}
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.title + index}
        renderItem={() => null}
        renderSectionHeader={({ section }) => renderSection({ section })}
      />
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 16,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 8,
  },
  placeholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profileRating: {
    fontSize: 14,
    color: "#666",
  },
  sectionContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  itemContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  itemContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemIcon: {
    marginRight: 12,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  fullImage: {
    width: 200,
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  placeholderModal: {
    width: 200,
    height: 200,
    borderRadius: 16,
    backgroundColor: "#e0e0e0",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});
