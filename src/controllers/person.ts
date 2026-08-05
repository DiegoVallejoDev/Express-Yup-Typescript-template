import { Person } from '../schemas/person';

export const createGreeting = (person: Person) => {
  let message = `Hello ${person.name}`;
  if (person.age !== undefined) {
    message += ` you are ${person.age} years old`;
  }
  return message;
};
