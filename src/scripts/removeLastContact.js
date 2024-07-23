import fs from 'fs/promises';
import path from 'path';
import { PATH_DB } from '../constants/contacts.js';

export const removeLastContact = async () => {
  const filePath = path.resolve(PATH_DB);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const contacts = JSON.parse(data);

    if (contacts.length > 0) {
      contacts.pop();
      await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
      console.log('The last contact has been deleted.');
    } else {
      console.log('No contacts to delete.');
    }
  } catch (error) {
    console.error('Error deleting the last contact:', error);
    throw error;
  }
};

removeLastContact();
