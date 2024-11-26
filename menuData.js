// menuData.js


import uuid from 'react-native-uuid';

// Menu items
export const menuItems = [
    {
        id: '4',
        name: 'Kopi Pak Boedi',
        price: 20000,
        defaultAddons: {
          "Sugar Level": 'Normal Sugar',
          "Syrup": 'Aren Syrup',
          "Extra": null,
          "Milk": null,
          "Temperature": 'Iced',
        },
        availableAddons: ["Sugar Level",  "Extra", "Temperature"], // All options available
      },
      {
        id: '3',
        name: 'Tubruk',
        price: 8000,
        defaultAddons: {
          "Sugar Level": 'Normal Sugar',
          "Syrup": null,
          "Extra": null,
          "Milk": null, // No milk option by default
          "Temperature": 'Hot',
        },
        availableAddons: ["Sugar Level", "Temperature"], // Milk and extra shot not available
      },
      {
        id: '13',
        name: 'Long Black',
        price: 22000,
        defaultAddons: {
          "Sugar Level": 'No Sugar',
          "Syrup": 'Simple Syrup', // Hazelnut by default
          "Extra": null,
          "Milk": null,
          "Temperature": 'Iced',
        },
        availableAddons: ["Sugar Level", "Syrup","Extra", "Temperature"], // All options available
      },
  
    {
      id: '1',
      name: 'Latte',
      price: 25000,
      defaultAddons: {
        "Sugar Level": 'No Sugar',
        "Syrup": 'Simple Syrup',
        "Extra": null, // No extra shot by default
        "Milk": 'Fresh Milk',
        "Temperature": 'Hot',
      },
      availableAddons: ["Sugar Level", "Syrup", "Extra", "Milk", "Temperature"], // All options available
    },
    {
        id: '14',
        name: 'Cappuccino',
        price: 25000,
        defaultAddons: {
          "Sugar Level": 'No Sugar',
          "Syrup": 'Simple Syrup',
          "Extra": null, // No extra shot by default
          "Milk": 'Fresh Milk',
          "Temperature": 'Hot',
        },
        availableAddons: ["Sugar Level", "Syrup", "Extra", "Milk", "Temperature"], // All options available
      },
      {
        id: '15',
        name: 'Flat White',
        price: 25000,
        defaultAddons: {
          "Sugar Level": 'No Sugar',
          "Syrup": 'Simple Syrup',
          "Extra": null, // No extra shot by default
          "Milk": 'Fresh Milk',
          "Temperature": 'Hot',
        },
        availableAddons: ["Sugar Level", "Syrup", "Extra", "Milk", "Temperature"], // All options available
      },
    {
      id: '2',
      name: 'Cokelat',
      price: 25000,
      defaultAddons: {
        "Sugar Level": 'Normal Sugar',
        "Syrup": 'Simple Syrup',
        "Extra": null,
        "Milk": 'Fresh Milk',
        "Temperature": 'Hot',
      },
      availableAddons: ["Sugar Level", "Syrup",  "Milk", "Temperature"], // Extra shot not available
    },
    {
        id: '7',
        name: 'Mocha',
        price: 28000,
        defaultAddons: {
          "Sugar Level": 'Normal Sugar',
          "Syrup": 'Simple Syrup', // Hazelnut by default
          "Extra": null,
          "Milk": 'Fresh Milk',
          "Temperature": 'Iced',
        },
        availableAddons: ["Sugar Level", "Syrup","Extra", "Milk", "Temperature"], // All options available
      },

    {
        id: '5',
        name: 'Matcha',
        price: 25000,
        defaultAddons: {
          "Sugar Level": 'Normal Sugar',
          "Syrup": 'Simple Syrup', // Hazelnut by default
          "Extra": null,
          "Milk": 'Fresh Milk',
          "Temperature": 'Hot',
        },
        availableAddons: ["Sugar Level", "Syrup", "Milk", "Temperature"], // All options available
      },
      {
        id: '6',
        name: 'Matcha Kopi',
        price: 28000,
        defaultAddons: {
          "Sugar Level": 'Normal Sugar',
          "Syrup": 'Simple Syrup', // Hazelnut by default
          "Extra": null,
          "Milk": 'Fresh Milk',
          "Temperature": 'Iced',
        },
        availableAddons: ["Sugar Level", "Syrup","Extra", "Milk", "Temperature"], // All options available
      },
      {
        id: '8',
        name: 'Genmaicha',
        price: 25000,
        defaultAddons: {
          "Sugar Level": 'Normal Sugar',
          "Syrup": 'Simple Syrup', // Hazelnut by default
          "Extra": null,
          "Milk": 'Fresh Milk',
          "Temperature": 'Iced',
        },
        availableAddons: ["Sugar Level", "Syrup", "Milk", "Temperature"], // All options available
      },
      {
        id: '9',
        name: 'Hojicha',
        price: 25000,
        defaultAddons: {
          "Sugar Level": 'Normal Sugar',
          "Syrup": 'Simple Syrup', // Hazelnut by default
          "Extra": null,
          "Milk": 'Fresh Milk',
          "Temperature": 'Iced',
        },
        availableAddons: ["Sugar Level", "Syrup", "Milk", "Temperature"], // All options available
      },
      
      {
        id: '11',
        name: 'Earl Grey Milk Tea',
        price: 25000,
        defaultAddons: {
          "Sugar Level": 'Normal Sugar',
          "Syrup": 'Simple Syrup', // Hazelnut by default
          "Extra": null,
          "Milk": 'Fresh Milk',
          "Temperature": 'Iced',
        },
        availableAddons: ["Sugar Level","Syrup", "Temperature"], // All options available
      },{
        id: '12',
        name: 'Oolong Milk Tea',
        price: 25000,
        defaultAddons: {
          "Sugar Level": 'Normal Sugar',
          "Syrup": 'Simple Syrup', // Hazelnut by default
          "Extra": null,
          "Milk": 'Fresh Milk',
          "Temperature": 'Iced',
        },
        availableAddons: ["Sugar Level","Syrup", "Temperature"], // All options available
      },{
        id: '10',
        name: 'Segelas Susu',
        price: 15000,
        defaultAddons: {
          "Sugar Level": 'No Sugar',
          "Syrup": 'Simple Syrup', // Hazelnut by default
          "Extra": null,
          "Milk": 'Fresh Milk',
          "Temperature": 'Iced',
        },
        availableAddons: ["Sugar Level", "Syrup", "Milk", "Temperature"], // All options available
      },
      
  ];

// Generate unique IDs for each item when added to the order
export const generateItemWithUID = (item) => ({
  ...item,
  uid: uuid.v4(),
  totalPrice: item.price,
});
  
  // Add-ons
  export const addons = [
    { id: 'sugar-1', name: 'Normal Sugar', category: 'Sugar Level', price: 0 },
    { id: 'sugar-2', name: 'Less Sugar', category: 'Sugar Level', price: 0 },
    { id: 'sugar-3', name: 'No Sugar', category: 'Sugar Level', price: 0 },
    { id: 'syrup-1', name: 'Simple Syrup', category: 'Syrup', price: 0 },
    { id: 'syrup-2', name: 'Aren Syrup', category: 'Syrup', price: 3000 },
    { id: 'syrup-3', name: 'Caramel Syrup', category: 'Syrup', price: 3000 },
    { id: 'syrup-4', name: 'Hazelnut Syrup', category: 'Syrup', price: 3000 },
    { id: 'syrup-5', name: 'Vanilla Syrup', category: 'Syrup', price: 3000 },
    { id: 'extra-1', name: 'Extra Shot', category: 'Extra', price: 6000 },
    { id: 'milk-1', name: 'Fresh Milk', category: 'Milk', price: 0 },
    { id: 'milk-2', name: 'Almond Milk', category: 'Milk', price: 10000 },
    { id: 'milk-3', name: 'Oat Milk', category: 'Milk', price: 10000 },
    { id: 'milk-4', name: 'Soy Milk', category: 'Milk', price: 10000 },
    { id: 'temperature-1', name: 'Hot', category: 'Temperature', price: 0 },
    { id: 'temperature-2', name: 'Iced', category: 'Temperature', price: 0 },
  ];
  
  export const paymentMethods = [
    { id: '1', name: 'QRIS' },
    { id: '2', name: 'CASH' },
    { id: '3', name: 'DEBIT CARD' },
    { id: '4', name: 'CREDIT CARD' },
  ];