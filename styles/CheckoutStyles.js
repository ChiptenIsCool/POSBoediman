// CheckoutStyles.js
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  landscapeContentContainer: {
    flexDirection: 'row',
  },
  orderSummaryContainer: {
    flex: 2,
    paddingRight: 20,
  },
  orderItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sizeText: {
    fontSize: 14,
    color: '#333',
  },
  addonText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 20,
  },
  paymentOptionsContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  paymentOptionsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  paymentOption: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
  },
  selectedPaymentOption: {
    backgroundColor: '#007AFF',
  },
  paymentOptionText: {
    fontSize: 16,
    color: '#333',
  },
  customerNameInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    fontSize: 16,
    width: '100%',
  },
  completeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  printButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  printButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
