import fs from 'fs/promises';
import path from 'path';
import { PATH_DB } from '../constants/contacts.js';

export const getAllContacts = async () => {
  const filePath = path.resolve(PATH_DB);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const contacts = JSON.parse(data);

    if (contacts.length === 0) {
      throw new Error('Contacts are missing.');
    }

    return contacts;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('File not found.');
      return [];
    } else if (error.message === 'Contacts are missing.') {
      console.error('Error: Contacts are missing.');
      return [];
    }
    throw error;
  }
};

(async () => {
  try {
    const contacts = await getAllContacts();
    console.log(contacts);
  } catch (error) {
    console.error('Error retrieving contacts:', error);
  }
})();
