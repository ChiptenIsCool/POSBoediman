/*
import { BluetoothManager, BluetoothEscposPrinter } from 'react-native-thermal-receipt-printer';

function TestPrinter() {
  const connectAndPrint = async () => {
    try {
      // Enable Bluetooth
      await BluetoothManager.enableBluetooth();

      // Scan for available devices
      const devices = await BluetoothManager.scanDevices();

      // Connect to the first available device
      await BluetoothManager.connect(devices[0].address);

      // Print a test receipt
      await BluetoothEscposPrinter.printText(
        "Hello, World!\n\n",
        { encoding: 'GBK', codepage: 0, widthtimes: 1, heigthtimes: 1, fonttype: 0 }
      );

      // Disconnect
      await BluetoothManager.disconnect();
    } catch (error) {
      console.error('Print error:', error);
    }
  };

  return (
    <View>
      <Button title="Print Test" onPress={connectAndPrint} />
    </View>
  );
}
  */
