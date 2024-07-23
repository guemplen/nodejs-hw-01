import fs from 'fs/promises';
import path from 'path';
import { PATH_DB } from '../constants/contacts.js';

export const countContacts = async () => {
  const filePath = path.resolve(PATH_DB);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts.length;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('File not found');
      return 0;
    } else {
      console.error('File reading error:', error);
      throw error;
    }
  }
};

countContacts()
  .then((count) => {
    console.log('Number of contacts:', count);
  })
  .catch((error) => {
    console.error('Error counting contacts:', error);
  });
