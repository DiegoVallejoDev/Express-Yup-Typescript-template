/*
If you have code that contains functions that are not related to routes, middleware, 
or schemas, you can put them in a separate folder in the src/ directory. 

You put your code in this folder.
 */

import { Person } from "./types/person";

export const personUtils = (person: Person ) => {
    let message = `Hello ${person.name}`;
    if (person.age) {
        message += ` you are ${person.age} years old`;
    }
    return message;
}