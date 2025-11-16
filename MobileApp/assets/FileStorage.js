// Utilities/FileStorage.js
import * as FileSystem from "expo-file-system/legacy";


const LOGS_PATH = `${FileSystem.documentDirectory}DataBase/Logs.json`;

export const FileStorage = {
  // Initialize the database directory and file
  async initialize() {
    try {
      const dirInfo = await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}DataBase`);
      
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(`${FileSystem.documentDirectory}DataBase`, {
          intermediates: true
        });
      }

      const fileInfo = await FileSystem.getInfoAsync(LOGS_PATH);
      if (!fileInfo.exists) {
        await FileSystem.writeAsStringAsync(LOGS_PATH, JSON.stringify({ users: [] }));
      }
    } catch (error) {
      console.error('Error initializing file storage:', error);
      throw error;
    }
  },

  // Read all users from Logs.json
  async readLogs() {
    try {
      const content = await FileSystem.readAsStringAsync(LOGS_PATH);
      return JSON.parse(content);
    } catch (error) {
      console.error('Error reading logs:', error);
      return { users: [] };
    }
  },

  // Write data to Logs.json
  async writeLogs(data) {
    try {
      await FileSystem.writeAsStringAsync(LOGS_PATH, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing logs:', error);
      return false;
    }
  },

  // Add a new user
  async addUser(userData) {
    try {
      const logs = await this.readLogs();
      
      // Check if user already exists
      const existingUser = logs.users.find(
        user => user.phoneNumber === userData.phoneNumber || user.email === userData.email
      );

      if (existingUser) {
        return { success: false, message: 'User already exists' };
      }

      // Add new user
      logs.users.push({
        ...userData,
        createdAt: new Date().toISOString(),
        id: Date.now().toString()
      });

      await this.writeLogs(logs);
      return { success: true, message: 'User created successfully' };
    } catch (error) {
      console.error('Error adding user:', error);
      return { success: false, message: 'Error creating user' };
    }
  },

  // Check if user exists and validate credentials
  async validateUser(phoneNumber, password) {
    try {
      const logs = await this.readLogs();
      const user = logs.users.find(
        user => user.phoneNumber === phoneNumber && user.password === password
      );

      if (user) {
        return { success: true, user, message: 'Login successful' };
      }

      return { success: false, message: 'Invalid phone number or password' };
    } catch (error) {
      console.error('Error validating user:', error);
      return { success: false, message: 'Error during login' };
    }
  },

  // Check if phone number exists
  async phoneExists(phoneNumber) {
    try {
      const logs = await this.readLogs();
      return logs.users.some(user => user.phoneNumber === phoneNumber);
    } catch (error) {
      console.error('Error checking phone:', error);
      return false;
    }
  }
};