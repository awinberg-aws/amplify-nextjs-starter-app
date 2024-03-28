import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rules below
specify that owners, authenticated via your Auth resource can "create",
"read", "update", and "delete" their own records. Public users,
authenticated via an API key, can only "read" records.
=========================================================================*/
const schema = a.schema({
  // hasMany with no belongsTo (no required relationship)
  OptionalTodo: a.model({
    description: a.string().required(),
    isDone: a.boolean().default(false),
  })
  .authorization([a.allow.private("iam")]),
  OptionalList: a.model({
    title: a.string().required(),
    todos: a.hasMany('OptionalTodo')
  })
  .authorization([a.allow.private("iam")]),
  
  // hasMany with no belongsTo (parent still required)
  RequiredTodo: a.model({
    description: a.string().required(),
    isDone: a.boolean().default(false),
  })
  .authorization([a.allow.private("iam")]),
  RequiredList: a.model({
    title: a.string().required(),
    todos: a.hasMany('RequiredTodo')
  })
  .authorization([a.allow.private("iam")]),

  // required hasOne with belongsTo
  Car: a.model({
    vin: a.string().required(),
    model: a.string().required(),
    steeringWheel: a.hasOne('SteeringWheel')
  })
  .authorization([a.allow.private("iam")]),
  SteeringWheel: a.model({
    serialNumber: a.string().required(),
    car: a.belongsTo('Car')
  })
  .authorization([a.allow.private("iam")]),

  // hasOne with required belongsTo
  Airplane: a.model({
    serial: a.string().required(),
    model: a.string().required(),
    inspection: a.hasOne('Inspection')
  })
  .authorization([a.allow.private("iam")]),
  Inspection: a.model({
    inspectionNumber: a.string().required(),
    completed: a.boolean().default(false),
    notes: a.string(),
    outcome: a.enum(['pass', 'fail']),
    airplane: a.belongsTo('Airplane') //.required()
  })
  .authorization([a.allow.private("iam")]),

  // manyToMany
  Pizzam: a.model({
    dateOrdered: a.datetime().required(),
    toppings: a.manyToMany('Toppingm', {relationName: 'PizzaToppingsss'}),
  })
  .authorization([a.allow.private("iam")]),
  Toppingm: a.model({
    name: a.string().required(),
    pizzas: a.manyToMany('Pizzam', {relationName: 'PizzaToppingsss'}),
  })
  .authorization([a.allow.private("iam")]),
});

const newSchema = a.schema({
  AllTypes: a
    .model({
      string: a.string(),
      int: a.integer(),
      float: a.float(),
      boolean: a.boolean(),
      date: a.date(),
      time: a.time(),
      datetime: a.datetime(),
      timestamp: a.timestamp(),
      email: a.email(),
      json: a.json(),
      phone: a.phone(),
      url: a.url(),
      ipAddress: a.ipAddress(),
      nonModel: a.customType({
        string: a.string(),
        int: a.integer(),
        float: a.float(),
        boolean: a.boolean(),
        date: a.date(),
        time: a.time(),
        datetime: a.datetime(),
        timestamp: a.timestamp(),
        email: a.email(),
        json: a.json(),
        phone: a.phone(),
        url: a.url(),
        ipAddress: a.ipAddress(),
      }),
      enum: a.enum(["some", "enum", "value"]),
    })
    .authorization([a.allow.owner(), a.allow.private()]),
})

export type Schema = ClientSchema<typeof newSchema>;

export const data = defineData({
  schema: newSchema,
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
