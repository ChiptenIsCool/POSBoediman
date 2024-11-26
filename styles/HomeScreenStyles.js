// HomeScreenStyles.js
import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  menuContainer: {
    flex: 2,
    paddingRight: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  menuItem: {
    flex: 1,
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
  },
  orderSummaryContainer: {
    flex: 1.5,
    paddingLeft: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  orderItem: {
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginBottom: 8,
  },
  sizeText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    marginVertical: 2,
  },
  addonText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 20,
    marginVertical: 2,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginVertical: 16,
  },
  checkoutButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  historyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orderActions: {
    flexDirection: 'row',
    marginTop: 8,
  },
  actionButton: {
    flex: 1, // Each button takes 50% of the available width
    paddingVertical: 6,
    marginHorizontal: 4, // Space between buttons
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  editButton: {
    backgroundColor: '#007AFF', // Edit button color (blue)
  },
  removeButton: {
    backgroundColor: '#FF5A5F', // Remove button color (red)
  },
});
