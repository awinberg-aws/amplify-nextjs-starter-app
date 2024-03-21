import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rules below
specify that owners, authenticated via your Auth resource can "create",
"read", "update", and "delete" their own records. Public users,
authenticated via an API key, can only "read" records.
=========================================================================*/
const schema = a.schema({
  Todo: a
    .model({
      content: a.string(),
      done: a.boolean(),
      stringArray: a.string().array(),
      priority: a.enum(["low", "medium", "high"]),
      someOtherField: a.string().required(),
      createdAt: a.datetime(),
    })
    .authorization([a.allow.private("iam")]),
  BelongsToModel: a
    .model({
      something: a.string(),
      todo: a.hasOne("Todo"),
      hasOneNoBelongsToField: a.hasOne("HasOneNoBelongsTo"),
      belongsToModelNoCompositeField: a.hasOne("BelongsToModelNoComposite"),
      sompositeKey: a.belongsTo("SompositeKey"),
    })
    .authorization([a.allow.private("iam")]),
  BelongsToModelNoComposite: a
    .model({
      mainField: a.string(),
      belongsToModelField: a.belongsTo("BelongsToModel"),
    })
    .authorization([a.allow.private("iam")]),
  HasOneNoBelongsTo: a
    .model({
      mmainField: a.string(),
    })
    .authorization([a.allow.private("iam")]),
  SompositeKey: a
    .model({
      content: a.string(),
      done: a.boolean(),
      newPriority: a.enum(["low", "medium", "high"]),
      someOtherField: a.string().required(),
      someField: a.string().required(),
      todos: a.hasMany("Todo"),
      belongsToField: a.hasOne("BelongsToModel"),
    })
    .identifier(["someField", "someOtherField"])
    .authorization([a.allow.specificGroup("admins"), a.allow.private("iam")]),
  Pizza: a
    .model({
      content: a.string(),
      toppings: a.manyToMany("Topping", { relationName: "PizzaToppings" }),
    })
    .authorization([a.allow.specificGroup("admins"), a.allow.private("iam")]),
  Topping: a
    .model({
      name: a.string(),
      pizzas: a.manyToMany("Pizza", { relationName: "PizzaToppings" }),
    })
    .authorization([a.allow.specificGroup("admins"), a.allow.private("iam")]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  // authorizationModes: {
  //   defaultAuthorizationMode: "iam",
  // },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import { type Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>


// import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

// const schema = a.schema({
//   Todo: a.model({
//     content: a.string(),
//     isDone: a.boolean(),
//   }).authorization([a.allow.private('iam')]),
//   House: a.model({
//     address: a.string().required(),
//     bedrooms: a.integer().required(),
//     bathrooms: a.float().required(),
//     stories: a.integer().required(),
//     squareFeet: a.integer().required(),
//     hasYard: a.boolean().required(),
//   }).authorization([a.allow.private('iam')]),
//   Person: a.model({
//     name: a.string().required(),
//     age: a.integer().required(),
//     primaryResidence: a.hasOne('House'),
//   }).authorization([a.allow.private('iam')]),
//   TaskList: a.model({
//     name: a.string().required(),
//     todos: a.hasMany('Todo'),
//   }).authorization([a.allow.private('iam')]),
// });

// export type Schema = ClientSchema<typeof schema>;

// export const data = defineData({ schema });
