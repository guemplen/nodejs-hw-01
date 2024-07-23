import fs from 'fs/promises';
import path from 'path';
import { PATH_DB } from '../constants/contacts.js';
import { createFakeContact } from '../utils/createFakeContact.js';

const readContactsFromFile = async () => {
  const filePath = path.resolve(PATH_DB);
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

const writeContactsToFile = async (contacts) => {
  const filePath = path.resolve(PATH_DB);
  await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
};

export const addOneContact = async () => {
  const contacts = await readContactsFromFile();
  const newContact = createFakeContact();
  contacts.push(newContact);
  await writeContactsToFile(contacts);
  console.log('Contact added:', newContact);
};

addOneContact();
