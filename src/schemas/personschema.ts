import * as yup from 'yup';

//request from /hello?name=John&age=20


export const personSchema = yup.object().shape({
    query: yup.object().shape({
        name: yup.string().required(),
        age: yup.number().optional()
    })
});