import { Person } from './types/person';

export const personUtils = (person: Person) => {
  let message = `Hello ${person.name}`;
  if (person.age !== undefined) {
    message += ` you are ${person.age} years old`;
  }
  return message;
};
