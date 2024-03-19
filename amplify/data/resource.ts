import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Todo: a.model({
    content: a.string(),
    isDone: a.boolean(),
  }).authorization([a.allow.private('iam')]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({ schema });
