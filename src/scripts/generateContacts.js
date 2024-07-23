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

const generateContacts = async (number) => {
  const contacts = await readContactsFromFile();
  for (let i = 0; i < number; i++) {
    contacts.push(createFakeContact());
  }
  await writeContactsToFile(contacts);
};

generateContacts(5);
