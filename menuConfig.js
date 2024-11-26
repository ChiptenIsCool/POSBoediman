export const menuConfig = [
    {
      id: 1,
      name: "Kopi Pak Boedi",
      defaultAddons: { "Sugar Level": "Normal Sugar", "Syrup" : "Aren Syrup" },
      restrictedAddons: ["Syrup", "Temperature", "Milk"], // No restrictions
    },
    {
      id: 2,
      name: "Tubruk",
      defaultAddons: { "Sugar Level": "Normal Sugar", "Temperature": "Hot" },
      restrictedAddons: ["Syrup", "Extra"], // Disables Syrup and Extra
    },
    {
      id: 3,
      name: "Latte",
      defaultAddons: { "Milk": "Fresh Milk", "Temperature": "Hot" },
      restrictedAddons: [], // No restrictions
    },
    {
        id: 4,
        name: "Cappuccino",
        defaultAddons: { "Sugar Level": "Normal Sugar", "Temperature": "Hot" },
        restrictedAddons: ["Syrup", "Extra"], // Disables Syrup and Extra
      },
      {
        id: 5,
        name: "Flat White",
        defaultAddons: { "Milk": "Fresh Milk", "Temperature": "Hot" },
        restrictedAddons: [], // No restrictions
      },
    // Add similar configurations for other items
  ];
  