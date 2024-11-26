import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import { addons } from '../menuData'; // Ensure this is properly imported or fetched if dynamic
import { menuConfig } from '../menuConfig';

export default function EditItemModal({ item, onSave, onCancel }) {
  const [selectedAddons, setSelectedAddons] = useState({});
  const [config, setConfig] = useState(null);

  useEffect(() => {
    if (!item) return;

    // Find the configuration for the selected item
    const itemConfig = menuConfig.find((configItem) => configItem.name === item.name);
    setConfig(itemConfig);

    const initialAddons = {};
    if (itemConfig?.defaultAddons) {
      Object.keys(itemConfig.defaultAddons).forEach((category) => {
        const defaultAddon = addons.find(
          (addon) => addon.name === itemConfig.defaultAddons[category] && addon.category === category
        );
        if (defaultAddon) {
          initialAddons[category] = defaultAddon;
        }
      });
    }
    setSelectedAddons(initialAddons);
  }, [item]);

  const selectAddon = (category, addon) => {
    if (config?.restrictedAddons?.includes(category)) return; // Skip selection for restricted addons
    setSelectedAddons((current) => ({
      ...current,
      [category]: current[category]?.id === addon.id ? null : addon,
    }));
  };

  const handleSave = () => {
    const finalAddons = Object.values(selectedAddons)
      .filter(Boolean)
      .map((addon) => ({
        ...addon,
        price: item.name === "Kopi Pak Boedi" && addon.name === "Aren Syrup" ? 0 : addon.price,
      }));

    const updatedItem = {
      ...item,
      addons: finalAddons,
    };
    onSave(updatedItem);
  };

  if (!item) return null; // Prevent rendering if no item is selected

  return (
    <Modal transparent={true} animationType="slide" visible={!!item} onRequestClose={onCancel}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Customize {item.name}</Text>

          {['Sugar Level', 'Syrup', 'Extra', 'Milk', 'Temperature'].map((category) => (
            <View key={category} style={styles.categoryContainer}>
              <Text style={styles.sectionTitle}>{category}:</Text>
              <View style={styles.optionsRow}>
                {addons
                  .filter((addon) => addon.category === category)
                  .map((addon) => {
                    const isRestricted = config?.restrictedAddons?.includes(category);
                    return (
                      <TouchableOpacity
                        key={addon.id}
                        style={[
                          styles.optionButton,
                          selectedAddons[category]?.id === addon.id && styles.selectedOption,
                          isRestricted && styles.disabledOption,
                        ]}
                        onPress={() => !isRestricted && selectAddon(category, addon)}
                        disabled={isRestricted}
                      >
                        <Text style={[isRestricted && styles.disabledText]}>
                          {addon.name} {addon.price > 0 ? `+Rp ${addon.price}` : ''}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </View>
          ))}

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.actionButton, styles.addToOrderButton]} onPress={handleSave}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={onCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}


const { width, height } = Dimensions.get('window');
const isLandscape = width > height;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    width: isLandscape ? '70%' : '85%',
    maxHeight: '75%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    flexWrap: 'wrap',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    flex: 1,
  },
  optionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    margin: 4,
    backgroundColor: '#e0e0e0',
  },
  selectedOption: {
    backgroundColor: '#b0e0d0',
  },
  disabledOption: {
    backgroundColor: '#f0f0f0',
    opacity: 0.5,
  },
  disabledText: {
    color: '#999',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    paddingVertical: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  addToOrderButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
