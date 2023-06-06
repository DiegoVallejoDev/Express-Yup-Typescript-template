import * as yup from 'yup';

//request from /hello?name=John&age=20


/**
 * Schema for validating a person object.
 * @typedef {Object} PersonSchema
 * @property {string} name - The name of the person. Required.
 * @property {number} [age] - The age of the person. Optional.
 */
export const personSchema = yup.object().shape({
    query: yup.object().shape({
        name: yup.string().required(),
        age: yup.number().optional()
    })
});