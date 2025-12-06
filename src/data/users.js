// In-memory user store for demo (replace with DB in production)
import { v4 as uuidv4 } from 'uuid';

const users = [
  {
    id: uuidv4(),
    name: 'Alice Khan',
    email: 'alice@example.com',
    age: 25
  },
  {
    id: uuidv4(),
    name: 'Bilal Raza',
    email: 'bilal@example.com',
    age: 30
  }
];

export default users;
export function findUserIndexById(id) {
  return users.findIndex(u => u.id === id);
}
export function findUserById(id) {
  return users.find(u => u.id === id);
}
