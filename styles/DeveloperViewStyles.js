// DeveloperViewStyles.js
import { StyleSheet } from 'react-native';

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
  jsonContainer: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    flex: 1,
    marginBottom: 16,
  },
  jsonText: {
    fontSize: 12,
    color: '#333',
    fontFamily: 'monospace',
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
