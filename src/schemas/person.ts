import * as yup from 'yup';

export const personSchema = yup.object({
  query: yup.object({
    name: yup.string().required(),
    age: yup.number().optional(),
  }),
});

export type Person = yup.InferType<typeof personSchema>['query'];
