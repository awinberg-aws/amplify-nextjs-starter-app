import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Todo: a.model({
    content: a.string(),
    isDone: a.boolean(),
  }).authorization([a.allow.private('iam')]),
  House: a.model({
    address: a.string().required(),
    bedrooms: a.integer().required(),
    bathrooms: a.float().required(),
    stories: a.integer().required(),
    squareFeet: a.integer().required(),
    hasYard: a.boolean().required(),
  }).authorization([a.allow.private('iam')]),
  Person: a.model({
    name: a.string().required(),
    age: a.integer().required(),
    primaryResidence: a.hasOne('House'),
  }).authorization([a.allow.private('iam')]),
  TaskList: a.model({
    name: a.string().required(),
    todos: a.hasMany('Todo'),
  }).authorization([a.allow.private('iam')]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({ schema });
