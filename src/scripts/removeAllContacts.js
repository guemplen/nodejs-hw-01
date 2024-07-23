import fs from 'fs/promises';
import path from 'path';
import { PATH_DB } from '../constants/contacts.js';

export const removeAllContacts = async () => {
  const filePath = path.resolve(PATH_DB);
  try {
    await fs.writeFile(filePath, JSON.stringify([]));
    console.log('All contacts have been removed.');
  } catch (error) {
    console.error('Error removing contacts:', error);
    throw error;
  }
};

removeAllContacts();
