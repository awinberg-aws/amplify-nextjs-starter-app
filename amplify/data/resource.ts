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
    optionalListId: a.id()
  }),
  OptionalList: a.model({
    title: a.string().required(),
    todos: a.hasMany('OptionalTodo', 'optionalListId'),
  }),

  SurveyResult: a.model({
    question: a.string(),
    iWantLotsOfTruesAndFalses: a.boolean().array(),
  }),

  // hasMany with no belongsTo (parent still required)
  RequiredTodo: a.model({
    description: a.string().required(),
    isDone: a.boolean().default(false),
    requiredListId: a.id(),
  }),
  RequiredList: a.model({
    title: a.string().required(),
    todos: a.hasMany('RequiredTodo', 'requiredListId'),
  }),

  // required hasOne with belongsTo
  Car: a.model({
    vin: a.string().required(),
    model: a.string().required(),
    steeringWheel: a.hasOne('SteeringWheel', 'id'),
  }),
  SteeringWheel: a.model({
    serialNumber: a.string().required(),
    car: a.belongsTo('Car','id'),
  }),

  // hasOne with required belongsTo
  Airplane: a.model({
    serial: a.string().required(),
    model: a.string().required(),
    inspection: a.hasOne('Inspection','id'),
  }),
  Inspection: a.model({
    inspectionNumber: a.string().required(),
    completed: a.boolean().default(true),
    notes: a.string(),
    outcome: a.enum(['pass', 'fail']),
    airplane: a.belongsTo('Airplane', 'id') //.required()
  }),

  // manyToMany
  // Pizzam: a.model({
  //   dateOrdered: a.datetime().required(),
  //   toppings: a.manyToMany('Toppingm', {relationName: 'PizzaToppingsss'}),
  // })
  // .authorization([a.allow.private("iam")]),
  // Toppingm: a.model({
  //   name: a.string().required(),
  //   pizzas: a.manyToMany('Pizzam', {relationName: 'PizzaToppingsss'}),
  // })
  // .authorization([a.allow.private("iam")]),
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
    }),

  RequiredArrayType: a
    .model({
      identifier: a.id().array().required(),
      requiredIdentifier: a.id().required().array().required(),
      string: a.string().array().required(),
      requiredString: a.string().required().array().required(),
      int: a.integer().array().required(),
      requiredInt: a.integer().required().array().required(),
      float: a.float().array().required(),
      requiredFloat: a.float().required().array().required(),
      boolean: a.boolean().array().required(),
      requiredBoolean: a.boolean().required().array().required(),
      datetime: a.datetime().array().required(),
      requiredDatetime: a.datetime().required().array().required(),
      time: a.time().array().required(),
      requiredTime: a.time().required().array().required(),
      date: a.date().array().required(),
      requiredDate: a.date().required().array().required(),
      email: a.email().array().required(),
      requiredEmail: a.email().required().array().required(),
      url: a.url().array().required(),
      requiredUrl: a.url().required().array().required(),
      ip: a.ipAddress().array().required(),
      requiredIp: a.ipAddress().required().array().required(),
      phone: a.phone().array().required(),
      requiredPhone: a.phone().required().array().required(),
      timestamp: a.timestamp().array().required(),
      requiredTimestamp: a.timestamp().required().array().required(),
    }),
  ArrayType: a
    .model({
      identifier: a.id().array(),
      requiredIdentifier: a.id().required().array(),
      string: a.string().array(),
      requiredString: a.string().required().array(),
      int: a.integer().array(),
      requiredInt: a.integer().required().array(),
      float: a.float().array(),
      requiredFloat: a.float().required().array(),
      boolean: a.boolean().array(),
      requiredBoolean: a.boolean().required().array(),
      datetime: a.datetime().array(),
      requiredDatetime: a.datetime().required().array(),
      time: a.time().array(),
      requiredTime: a.time().required().array(),
      date: a.date().array(),
      requiredDate: a.date().required().array(),
      email: a.email().array(),
      requiredEmail: a.email().required().array(),
      url: a.url().array(),
      requiredUrl: a.url().required().array(),
      ip: a.ipAddress().array(),
      requiredIp: a.ipAddress().required().array(),
      phone: a.phone().array(),
      requiredPhone: a.phone().required().array(),
      timestamp: a.timestamp().array(),
      requiredTimestamp: a.timestamp().required().array(),
    }),

  // Relationships - manual many-to-many
  ThingA: a.model({
    name: a.string().required(),
    thingBs: a.hasMany('ThingAB', 'thingAId'),
  }),
  ThingB: a.model({
    name: a.string().required(),
    thingAs: a.hasMany('ThingAB', 'thingBId'),
  }),
  ThingAB: a.model({
    // two rules: 1/ a connection field (e.g. pizza) must be optional, no exceptions
    //            2/ all reference fields (e.g. pizzaId, locationHash) must all have the same optionality 
    thingA: a.belongsTo('ThingA', 'thingAId'),
    thingAId: a.id().required(),
    thingB: a.belongsTo('ThingB', 'thingBId'),
    thingBId: a.id().required(),
  }),

  // composite key one-to-many
  Bin: a.model({
    name: a.string().required(),
    contents: a.hasMany('SerializedPart', ['partNumber', 'serial']),
  }),
  SerializedPart: a.model({
    partNumber: a.string().required(),
    part: a.belongsTo('Part', 'partNumber'),
    serial: a.string().required(),
  }).identifier(['partNumber','serial']),
  Part: a.model({
    partNumber: a.string().required(),
    name: a.string().required(),
    description: a.string()
  }).identifier(['partNumber'])
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
