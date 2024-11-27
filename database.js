import * as SQLite from 'expo-sqlite';
import menuData from './menuData.json';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

let db;
let isDatabaseInitialized = false;

// Initialize the database
export const initializeDatabase = async () => {

  if (isDatabaseInitialized) return; // Prevent duplicate initialization
  if (!db) db = await SQLite.openDatabaseAsync('posBoediman.db');
  
  
  try {
    console.log('Setting up database schema...');
    await db.execAsync(`
      PRAGMA journal_mode = WAL;

      CREATE TABLE IF NOT EXISTS menu_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        category TEXT
      );

      CREATE TABLE IF NOT EXISTS menu_addons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL DEFAULT 0
      );

      CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customer_name TEXT,
        total_price REAL NOT NULL,
        payment_type TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS order_details (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER NOT NULL,
        item_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (item_id) REFERENCES menu_items(id)
      );

      CREATE TABLE IF NOT EXISTS order_details_addons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_detail_id INTEGER NOT NULL,
        addon_id INTEGER NOT NULL,
        addon_quantity INTEGER NOT NULL,
        FOREIGN KEY (order_detail_id) REFERENCES order_details(id),
        FOREIGN KEY (addon_id) REFERENCES menu_addons(id)
      );
    `);

    // Check if `payment_type` exists in the `orders` table
    //DO NOT DELETE THIS COMMENTED CODE. DEBUGGING PURPOSES
    /*
    const tableInfo = await db.getAllAsync(`PRAGMA table_info(orders);`);
    const hasPaymentType = tableInfo.some((column) => column.name === 'payment_type');
    console.log('Orders table schema:', tableInfo);
    
    if (!hasPaymentType) {
      console.log('Adding payment_type column to orders table...');
      await db.execAsync(`ALTER TABLE orders ADD COLUMN payment_type TEXT;`);
    }

    */

    console.log('Database schema set up successfully!');
    isDatabaseInitialized = true; // Mark as initialized
  } catch (error) {
    console.error('Error initializing database schema:', error);
    throw error;
  }
};


// Populate database with data from menuData.json
export const populateDataFromJson = async () => {

  if (!db) db = await SQLite.openDatabaseAsync('posBoediman.db');

  try {
    console.log('Populating database with menu data...');
    
    for (const item of menuData.menuItems) {
      await db.runAsync(
        `INSERT INTO menu_items (id, name, price, category) 
         VALUES (?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET 
           name = excluded.name,
           price = excluded.price,
           category = excluded.category;`,
        [item.id, item.name, item.price, item.category]
      );
    }

    for (const addon of menuData.menuAddons) {
      await db.runAsync(
        `INSERT INTO menu_addons (id, name, category, price) 
         VALUES (?, ?, ?, ?)
         ON CONFLICT(id) DO UPDATE SET 
           name = excluded.name,
           category = excluded.category,
           price = excluded.price;`,
        [addon.id, addon.name, addon.category, addon.price]
      );
    }

    console.log('Menu data populated and updated successfully!');
  } catch (error) {
    console.error('Error populating database:', error);
    throw error;
  }
};

export const insertOrder = async (customerName, paymentType, order) => {
  if (!db) db = await SQLite.openDatabaseAsync('posBoediman.db');

  try {
    await db.execAsync('BEGIN TRANSACTION;');

    // Calculate total price
    const totalPrice = order.reduce((sum, item) => {
      const addonsPrice = item.addons
        ? item.addons.reduce((addonSum, addon) => addonSum + addon.price * (addon.quantity || 1), 0)
        : 0;
      return sum + (item.price * (item.quantity || 1)) + addonsPrice;
    }, 0);

    console.log('Executing order insertion with values:', {
      customerName: customerName || 'Anonymous',
      totalPrice: Number(totalPrice),
      paymentType: paymentType || 'Unknown',
    });

    // Insert the main order
    const orderInsertResult = await db.runAsync(
      `INSERT INTO orders (customer_name, total_price, payment_type, created_at) 
       VALUES (?, ?, ?, CURRENT_TIMESTAMP);`,
      [customerName || 'Anonymous', Number(totalPrice), paymentType || 'Unknown']
    );

    console.log('Inserted order successfully with result:', orderInsertResult);

    // Insert order details and addons
    for (const item of order) {
      const detailInsertResult = await db.runAsync(
        `INSERT INTO order_details (order_id, item_id, quantity) VALUES (?, ?, ?);`,
        [orderInsertResult.lastInsertRowId, item.id, item.quantity || 1]
      );
      const orderDetailId = detailInsertResult.lastInsertRowId;

      for (const addon of item.addons || []) {
        await db.runAsync(
          `INSERT INTO order_details_addons (order_detail_id, addon_id, addon_quantity) 
           VALUES (?, ?, ?);`,
          [orderDetailId, addon.id, addon.quantity || 1]
        );
      }
    }

    await db.execAsync('COMMIT;');
    
    console.log('Order inserted successfully.');
    return true;
  } catch (error) {
    await db.execAsync('ROLLBACK;');
    console.error('Error inserting order:', error);
    throw error;
  }
};






// Fetch menu items
export const fetchMenuItems = async () => {
  if (!db) db = await SQLite.openDatabaseAsync('posBoediman.db');

  try {
    console.log('Fetching menu items...');
    const rows = await db.getAllAsync(`SELECT * FROM menu_items;`);
    console.log('Fetched menu items DONE');
    //console.log('Fetched menu items:', rows);
    return rows;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

export const closeDatabase = async () => {
  if (db) {
    console.log('Closing database...');
    await db.closeAsync(); // Close the database
    db = null; // Reset the db reference
  }
};



export const fetchOrders = async () => {
  if (!db) db = await SQLite.openDatabaseAsync('posBoediman.db');

  try {
    

    /* UNCOMMENT THE CODE BELOW TO DELETE CURRENT DATA */
    //await db.execAsync(`DELETE FROM menu_items;`)
    //await db.execAsync(`DELETE FROM menu_addons;`)
    //await db.execAsync(`DELETE FROM orders;`)
    //await db.execAsync(`DELETE FROM order_details;`)
    //await db.execAsync(`DELETE FROM order_details_addons;`)
    const result4 = await db.getAllAsync(`SELECT * FROM menu_items;`);
    const result5 = await db.getAllAsync(`SELECT * FROM menu_addons;`);
    const result = await db.getAllAsync(`SELECT * FROM orders;`);
    const result1 = await db.getAllAsync(`SELECT * FROM order_details;`);
    const result2 = await db.getAllAsync(`SELECT * FROM order_details_addons;`);
    
    //console.log('Fetched orders:', result);
    //console.log('Fetched orders details:', result1);
    console.log('Fetched orders details addons:', result2);
    //console.log('Fetched menuitems:', result4);
    //console.log('Fetched menuaddons:', result5);


    
    return result;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }

  

  
};

// Fetch all orders from the database
/*
export const fetchOrders = async () => {
  if (!db) db = await SQLite.openDatabaseAsync('posBoediman.db');

  try {
    const orders = await db.getAllAsync(`
      SELECT id, customer_name, total_price, created_at FROM orders;
    `);

    for (const order of orders) {
      const orderDetails = await db.getAllAsync(
        `SELECT od.id, od.item_id, od.quantity, mi.name AS item_name, mi.price AS item_price
         FROM order_details od
         JOIN menu_items mi ON od.item_id = mi.id
         WHERE od.order_id = ?;`,
        [order.id]
      );

      for (const detail of orderDetails) {
        const addons = await db.getAllAsync(
          `SELECT oda.addon_id, ma.name AS addon_name, ma.price AS addon_price, oda.addon_quantity
           FROM order_details_addons oda
           JOIN menu_addons ma ON oda.addon_id = ma.id
           WHERE oda.order_detail_id = ?;`,
          [detail.id]
        );

        detail.addons = addons;
      }

      order.details = orderDetails;
    }

    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};
*/

// Share the database file
export const shareDatabase = async () => {
  try {
    const dbPath = FileSystem.documentDirectory + 'SQLite/posBoediman.db';
    console.log('Database file path:', FileSystem.documentDirectory + 'SQLite/posBoediman.db');

    // Close the database to ensure all data is written to disk
    if (db) {
      await closeDatabase(); // Call your closeDatabase function here
    }

    // Check if the file exists
    const fileInfo = await FileSystem.getInfoAsync(dbPath);
    if (!fileInfo.exists) {
      console.log('Database file does not exist at:', dbPath);
      return;
    }

    // Share the database file
    await Sharing.shareAsync(dbPath, {
      dialogTitle: 'Share or copy your DB via',
    });

    console.log('Database shared successfully!');
  } catch (error) {
    console.error('Error sharing database file:', error);
  }
};
