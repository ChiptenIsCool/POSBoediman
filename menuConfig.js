export const menuConfig = [
    {
      id: 1,
      name: "Kopi Boedi",
      defaultAddons: { "Sugar Level": "Normal Sugar", "Syrup" : "Aren Syrup" },
      restrictedAddons: ["Syrup", "Temperature", "Milk"], // No restrictions
    },
    {
      id: 2,
      name: "Tubruk",
      defaultAddons: { "Sugar Level": "Normal Sugar", "Temperature": "Hot" },
      restrictedAddons: ["Syrup", "Extra", "Milk"], // Disables Syrup and Extra
    },
    {
      id:3,
      name: "Long Black",
      defaultAddons: {  "Temperature": "Iced","Sugar Level":"No Sugar", },
      restrictedAddons: ["Extra"], // No restrictions
    },
    {
      id: 4,
      name: "Latte",
      defaultAddons: {  "Temperature": "Hot","Sugar Level": "No Sugar","Milk":"Fresh Milk" },
      restrictedAddons: [], // No restrictions
    },
    {
        id: 5,
        name: "Cappuccino",
        defaultAddons: {  "Temperature": "Hot","Sugar Level": "No Sugar","Milk":"Fresh Milk" },
        restrictedAddons: [], // Disables Syrup and Extra
      },
      {
        id: 6,
        name: "Flat White",
        defaultAddons: {  "Temperature": "Hot","Sugar Level": "No Sugar","Milk":"Fresh Milk" },
        restrictedAddons: [], // No restrictions
      },
    // Add similar configurations for other items
    {
      id: 7,
      name: "Cokelat",
      defaultAddons: {  "Temperature": "Hot","Sugar Level": "Normal Sugar","Milk":"Fresh Milk", "Syrup": "Simple Syrup" },
      restrictedAddons: ["Extra"], // No restrictions
    },
    {
      id: 8,
      name: "Piccolo",
      defaultAddons: {  "Temperature": "Hot","Sugar Level": "No Sugar","Milk":"Fresh Milk" },
      restrictedAddons: ["Temperature"], // No restrictions
    },
    {
      id: 9,
      name: "Mocha",
      defaultAddons: {  "Temperature": "Iced","Sugar Level": "Normal Sugar","Milk":"Fresh Milk", "Syrup": "Simple Syrup" },
      restrictedAddons: [], // No restrictions
    },
    {
      id:10,
      name: "Matcha",
      defaultAddons: {  "Temperature": "Hot","Sugar Level": "No Sugar","Milk":"Fresh Milk", "Syrup": "Simple Syrup" },
      restrictedAddons: ["Extra"], // No restrictions
    },
    {
      id:11,
      name: "Matcha Kopi",
      defaultAddons: {  "Temperature": "Hot","Sugar Level": "Normal Sugar","Milk":"Fresh Milk", "Syrup": "Simple Syrup" },
      restrictedAddons: [], // No restrictions
    },
    {
      id:12,
      name: "Genmaicha",
      defaultAddons: {  "Temperature": "Iced","Sugar Level": "Normal Sugar","Milk":"Fresh Milk" },
      restrictedAddons: ["Extra"], // No restrictions
    },
    {
      id:13,
      name: "Hojicha",
      defaultAddons: {  "Temperature": "Iced","Sugar Level": "Normal Sugar","Milk":"Fresh Milk" },
      restrictedAddons: ["Extra"], // No restrictions
    },
    {
      id:14,
      name: "Earl Grey Milk Tea",
      defaultAddons: {  "Temperature": "Iced","Sugar Level": "Normal Sugar","Syrup":"Simple Syrup","Milk":"Fresh Milk" },
      restrictedAddons: ["Extra","Milk"], // No restrictions
    },
    {
      id:15,
      name: "Oolong Milk Tea",
      defaultAddons: {  "Temperature": "Iced","Sugar Level": "Normal Sugar","Syrup":"Simple Syrup","Milk":"Fresh Milk" },
      restrictedAddons: ["Extra","Milk"], // No restrictions
    },
    {
      id:16,
      name: "Segelas Susu",
      defaultAddons: {  "Temperature": "Iced","Milk":"Fresh Milk" },
      restrictedAddons: ["Extra"], // No restrictions
    },
    
  ];
  