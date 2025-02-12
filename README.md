<h1 align="center">query-stuff</h1>

<p align="center"><strong>Type-safe query/mutation factories for <a href="https://tanstack.com/query">@tanstack/query</a></strong></p>

<p align="center">
  <a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-1-21bb42.svg" /></a>
  <a href="https://codecov.io/gh/MlNl-PEKKA/query-stuff" > 
 <img src="https://codecov.io/gh/MlNl-PEKKA/query-stuff/graph/badge.svg?token=MCS0QMBFRR"/> 
 </a>
  <a href="https://github.com/MlNl-PEKKA/query-stuff/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
  <a href="http://npmjs.com/package/query-stuff"><img alt="📦 npm version" src="https://img.shields.io/npm/v/query-stuff?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
  <a href="https://github.com/MlNl-PEKKA/query-stuff/blob/main/tsconfig.json"><img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" /></a>
</p>

## 📖 Table of Contents

- [🎯 Motivation](#1)
- [📦 Installation](#2)
- [🚀 Features](#3)
  - [🏭 factory](#4)
    - [📥 query](#5)
    - [📤 mutation](#6)
    - [📝 input](#7)
    - [📦 group](#8)
    - [🔗 use](#9) - 🧪 Experimental
  - [🔄 useExactMutationState](#10)
  - [🏗️ middlewareBuilder](#11) - 🧪 Experimental
    - [🔧 extend](#12) - 🧪 Experimental
    - [🧬 inherit](#13) - 🧪 Experimental
- [🙏 Credits](#14)
- [📜 License](#15)

<div id="1"></div>

## 🎯 Motivation

`query-stuff` builds on top of ideas from [TkDodo’s blog](https://tkdodo.eu/blog), particularly [Effective React Query Keys](https://tkdodo.eu/blog/effective-react-query-keys) and [The Query Options API](https://tkdodo.eu/blog/the-query-options-api).

<div id="2"></div>

## 📦 Installation

`query-stuff` requires [@tanstack/react-query](https://www.npmjs.com/package/@tanstack/react-query) v5 and above as a `peerDependency`.

```bash
npm i @tanstack/react-query query-stuff
```

<div id="3"></div>

## 🚀 Features

<div id="4"></div>

- ### 🏭 factory

  The `factory` function is the core of query-stuff. It provides a structured way to define queries, mutations, and groups without manually managing their respective keys. It is recommended to have a `factory` for each feature as stated in the [Use Query Key factories](https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories) section of the [Effective React Query](https://tkdodo.eu/blog/effective-react-query-keys) blog.

  Setup:

  ```ts
  import { factory } from "query-stuff";

  const todos = factory("todos", (q) => ({
    /* Creates an empty todos factory */
  }));
  ```

  Usage:

  ```ts
  console.log(todos._key); // ["todos"]
  ```

  #### ⚙ Options

  - **`name`**: `string`
    - **Required**
    - The name of the feature.
  - **`builderFn`**:
    - **Required**
    - A function that receives a builder and returns an object containing queries, mutations, and groups.

  #### 💬 Note

  - `name` will be used as the base key for all queries, mutations, and groups within the factory.

<div id="5"></div>

- ### 📥 query

  Setup:

  ```ts
  import { factory } from "query-stuff";

  const todos = factory("todos", (q) => ({
    read: q.query(
      async () => {
        /*Fetch all todos*/
      },
      {
        staleTime: 0,
        gcTime: 5 * 60 * 1000,
      },
    ),
  }));
  ```

  Usage:

  ```ts
  useQuery(todos.read());
  console.log(todos.read().queryKey); // ["todos", "read"]
  ```

  #### ⚙ Options

  - **`queryFn`**: `({ ctx: Context | void, input: Input | void }) => Promise<Data>`
    - **Required**
    - The function that the query will use to request data.
  - **`options`**:

    - **Optional**
    - Additional options for the query. `queryFn` and `queryKey` are handled internally and should not be included here. Refer to the official [useQuery](https://tanstack.com/query/latest/docs/framework/react/reference/useQuery) docs for all the available options.

  #### 💬 Note

  - `queryKey` is automatically generated for each query.

<div id="6"></div>

- ### 📤 mutation

  Setup:

  ```ts
  import { factory } from "query-stuff";

  const todos = factory("todos", (q) => ({
    // ...
    delete: q.mutation(
      async () => {
        //Delete all todos
      },
      {
        onMutate: () => {
          //onMutate
        },
        onSuccess: () => {
          //onSuccess
        },
        onError: () => {
          //onError
        },
      },
    ),
  }));
  ```

  Usage:

  ```ts
  useMutation(todos.delete());
  console.log(todos.delete().mutationKey); // ["todos", "delete"]
  ```

  #### ⚙ Options

  - **`mutationFn`**: `({ ctx: Context| void, input: Input | void }) => Promise<Data>`
    - **Required**
    - A function that performs an asynchronous task and returns a promise.
  - **`options`**:
    - **Optional**
    - Additional options for the mutation. `mutationFn` and `mutationKey` are handled internally and should not be included here. Refer to official [useMutation](https://tanstack.com/query/latest/docs/framework/react/reference/useMutation) docs for all the available options.

  #### 💬 Note

  - `mutationKey` is automatically generated for each mutation.

<div id="7"></div>

- ### 📝 input

  Setup:

  ```ts
  import { factory } from "query-stuff";
  import { z } from "zod";

  const todos = factory("todos", (q) => ({
    // ...
    todo: q.input(z.object({ id: z.number() })).query(({ input }) => {
      /*Fetch a todo*/
    }),
  }));
  ```

  Usage:

  ```ts
  useQuery(todos.todo({ id: 1 }));
  console.log(todos.todo({ id: 1 }).queryKey); // ["todos", "todo", { id: 1 }]
  ```

  #### ⚙ Options

  - **`schema`**: `Schema | RecordSchema`
    - **Required**
    - A [Standard Schema](https://github.com/standard-schema/standard-schema?tab=readme-ov-file#------standard-schema) compliant schema.

  #### 💬 Note

  - Refer to the official ["What schema libraries implement the spec?"](https://github.com/standard-schema/standard-schema?tab=readme-ov-file#what-schema-libraries-implement-the-spec) docs for compatible schema libraries.
  - `RecordSchema` can used as input for `query`, `mutation` and `group`.
  - `Schema` can used as input for `query`and `mutation` only.

<div id="8"></div>

- ### 📦 group

  Setup:

  ```ts
  import { factory } from "query-stuff";
  import { z } from "zod";

  const todos = factory("todos", (q) => ({
    // ...
    todo: q.input(z.object({ id: z.number() })).group((q) => ({
      read: q.query(({ ctx }) => {
        /*Fetch todo*/
      }),
      delete: q.mutation(({ ctx }) => {
        /*Delete todo*/
      });
    })),
  }));
  ```

  Usage:

  ```ts
  useQuery(todos.todo({ id: 1 }).read());
  console.log(todos.todo({ id: 1 }).read().queryKey); // ["todos", "todo", { id: 1 }, "read"]

  useMutation(todos.todo({ id: 1 }).delete());
  console.log(todos.todo({ id: 1 }).delete().mutationKey); // ["todos", "todo", { id: 1 }, "delete"]

  console.log(todos.todo._key); // ["todos", "todo"]
  console.log(todos.todo({ id: 1 })._key); // ["todos", "todo", { id: 1 }]
  ```

  #### ⚙ Options

  - **`builderFn`**:
    - **Required**
    - A function that receives a builder and returns an object containing queries, mutations, and groups.

  #### 💬 Note

  - `group` with an `input` can only created with a `RecordSchema`.

<div id="9"></div>

- ### 🔗 use

  The `use` function allows composing middlewares that wrap outgoing functions, such as `queryFn` for queries and `mutationFn` for mutations.

  #### 🧪 Experimental

  - This feature is experimental and prefixed with `unstable_`.
  - This API may change in future versions.

  Setup/Usage:

  ```ts
  import { factory } from "query-stuff";

  const todos = factory("todos", (q) => ({
    // ...
    todo: q
      .unstable_use(async ({ next, ctx }) => {
        // Before
        const start = Date.now();
        const result = await next({
          ctx: {
            /*Extended context */
          },
        });
        const end = Date.now();
        console.log(`Elapsed time: ${end - start}`);
        // After
        return result;
      })
      .group((q) => ({
        // ...
      })),
  }));
  ```

  #### ⚙ Options

  - **`middlewareFn`**:

    - **Required**
    - A function that receives a `next` function and a `ctx` object, then returns the result from calling `next`.
    - `ctx` is the incoming context object.
    - `next` is a function that accepts an object with an extended `ctx` and returns the result of the execution chain.

  #### 💬 Note

  - The `next` function can be used to extend the outgoing context with a new `ctx` object.
  - The result of the `next` function must be **returned**.

<div id="10"></div>

- ### 🔄 useExactMutationState

  The `useExactMutationState` hook is built on top of React Query's [useMutationState](https://tanstack.com/query/latest/docs/framework/react/reference/useMutationState) hook. The `useExactMutationState` hook provides a type-safe API for tracking mutations for a given `mutationKey` provided by `query-stuff`.

  Setup:

  ```ts
  import { factory } from "query-stuff";

  const todos = factory("todos", (q) => ({
    // ...
    delete: q.mutation(async () => {
      //Delete all todos
    }),
  }));
  ```

  Usage:

  ```ts
  useMutation(todos.delete());

  useExactMutationState({
    filters: {
      mutationKey: todos.delete().mutationKey,
    },
    select: (mutation) => mutation.state.data,
  });
  ```

  #### ⚙ Options

  - **`options`**:
    - **filters**: `MutationFilters`
      - **Required**
      - **mutationKey**:
        - **Required**
        - The `mutationKey` for a given mutation. Must be retrieved from `query-stuff`
      - _Additional mutation filters_:
        - **Optional**
        - Refer to the official [Mutation Filters](https://tanstack.com/query/latest/docs/framework/react/guides/filters#mutation-filters) docs for the available options.
  - **`select`**: `(mutation: Mutation) => TResult`
    - **Optional**
    - Use this to transform the mutation state.

  #### 💬 Note

  - The `mutationKey` must be **retrieved directly from `query-stuff`**.
  - The `exact` filter is set to true by default.

<div id="11"></div>

- ### 🏗️ middlewareBuilder

  #### 🧪 Experimental

  - This feature is experimental and prefixed with `unstable_`.
  - This API may change in future versions.

  The `middlewareBuilder` allows defining reusable, standalone middleware functions that can be plugged into the `use` function.

  Setup:

  ```ts
  import { unstable_middlewareBuilder } from "query-stuff";

  const { middleware: fooMiddleware } = unstable_middlewareBuilder(
    async ({ next }) => {
      return await next({
        ctx: {
          foo: "foo",
        },
      });
    },
  );
  ```

  Before:

  ```ts
  import { factory } from "query-stuff";

  const todos = factory("todos", (q) => ({
    read: q
      .unstable_use(async ({ next }) => {
        return await next({
          ctx: {
            foo: "foo",
          },
        });
      })
      .query(async ({ ctx }) => {
        console.log(ctx); // { foo: "foo" }
        // Fetch all todos
      }),
  }));
  ```

  After:

  ```ts
  import { factory } from "query-stuff";

  const todos = factory("todos", (q) => ({
    read: q.unstable_use(fooMiddleware).query(async ({ ctx }) => {
      console.log(ctx); // { foo: "foo" }
      // Fetch all todos
    }),
  }));
  ```

  #### ⚙ Options

  - **`middlewareFn`**:

    - **Required**
    - A function that receives a `next` function and a `ctx` object, then returns the result from calling `next`.
    - `ctx` is the incoming context object.
    - `next` is a function that accepts an object with an extended `ctx` and returns the result of the execution chain.

  #### 💬 Note

  - The `next` function can be used to extend the outgoing context with a new `ctx` object.
  - The result of the `next` function must be **returned**.

<div id="12"></div>

- ### 🔧 extend

  #### 🧪 Experimental

  - This feature is experimental and prefixed with `unstable_`.
  - This API may change in future versions.

  The `extend` function allows you to build upon an existing standalone middleware, adding additional transformations while preserving previous ones.

  Setup:

  ```ts
  import { unstable_middlewareBuilder } from "query-stuff";

  const { middleware: fooMiddleware } = unstable_middlewareBuilder(
    async ({ next }) => {
      return await next({
        ctx: {
          foo: "foo",
        },
      });
    },
  );

  const { middleware: fooBarMiddleware } = unstable_middlewareBuilder(
    fooMiddleware,
  ).unstable_extend(async ({ next, ctx }) => {
    console.log(ctx); // { foo: "foo" }
    return await next({
      ctx: {
        bar: "bar",
      },
    });
  });
  ```

  Before:

  ```ts
  import { factory } from "query-stuff";

  const todos = factory("todos", (q) => ({
    read: q
      .unstable_use(async ({ next }) => {
        return await next({
          ctx: {
            foo: "foo",
          },
        });
      })
      .unstable_use(async ({ next, ctx }) => {
        console.log(ctx); // { foo: "foo" }
        return await next({
          ctx: {
            bar: "bar",
          },
        });
      })
      .query(async ({ ctx }) => {
        console.log(ctx); // { foo: "foo", bar: "bar" }
        // Fetch all todos
      }),
  }));
  ```

  After:

  ```ts
  import { factory } from "query-stuff";

  const todos = factory("todos", (q) => ({
    read: q.unstable_use(fooBarMiddleware).query(async ({ ctx }) => {
      console.log(ctx); // { foo: "foo", bar: "bar" }
      // Fetch all todos
    }),
  }));
  ```

  #### ⚙ Options

  - **`middlewareFn`**:

    - **Required**
    - A function that receives a `next` function and a `ctx` object, then returns the result from calling `next`.
    - `ctx` is the incoming context object.
    - `next` is a function that accepts an object with an extended `ctx` and returns the result of the execution chain.

  #### 💬 Note

  - The `next` function can be used to extend the outgoing context with a new `ctx` object.
  - The result of the `next` function must be **returned**.
  - `extend` stacks middlewares in the order they are defined, ensuring each middleware in the chain is executed sequentially.

<div id="13"></div>

- ### 🧬 inherit

  #### 🧪 Experimental

  - This feature is experimental and prefixed with `unstable_`.
  - This API may change in future versions.

  The `inherit` function allows you to build a new middleware that is **anticipated as an upcoming middleware** with respect to a given source middleware. This allows you to create standalone middlewares while maintaining type safety and context awareness.

  Setup:

  ```ts
  import { unstable_middlewareBuilder } from "query-stuff";

  const { middleware: fooMiddleware } = unstable_middlewareBuilder(
    async ({ next }) => {
      return await next({
        ctx: {
          foo: "foo",
        },
      });
    },
  );

  const { middleware: barMiddleware } = unstable_middlewareBuilder(
    fooMiddleware,
  ).unstable_inherit(async ({ next, ctx }) => {
    console.log(ctx); // { foo: "foo" }
    return await next({
      ctx: {
        bar: "bar",
      },
    });
  });
  ```

  Before:

  ```ts
  import { factory } from "query-stuff";

  const todos = factory("todos", (q) => ({
    read: q
      .unstable_use(async ({ next }) => {
        return await next({
          ctx: {
            foo: "foo",
          },
        });
      })
      .unstable_use(async ({ next, ctx }) => {
        console.log(ctx); // { foo: "foo" }
        return await next({
          ctx: {
            bar: "bar",
          },
        });
      })
      .query(async ({ ctx }) => {
        console.log(ctx); // { foo: "foo", bar: "bar" }
        // Fetch all todos
      }),
  }));
  ```

  After:

  ```ts
  import { factory } from "query-stuff";

  const todos = factory("todos", (q) => ({
    read: q
      .unstable_use(fooMiddleware)
      .unstable_use(barMiddleware)
      .query(async ({ ctx }) => {
        console.log(ctx); // { foo: "foo", bar: "bar" }
        // Fetch all todos
      }),
  }));
  ```

  #### ⚙ Options

  - **`middlewareFn`**:

    - **Required**
    - A function that receives a `next` function and a `ctx` object, then returns the result from calling `next`.
    - `ctx` is the incoming context object.
    - `next` is a function that accepts an object with an extended `ctx` and returns the result of the execution chain.

  #### 💬 Note

  - The `next` function can be used to extend the outgoing context with a new `ctx` object.
  - The result of the `next` function must be **returned**.
  - `inherit` does not modify the middleware execution order.
  - It must only be used to ensure type safety and context awareness when composing middleware.

<div id="14"></div>

## 🙏 Credits

- As mentioned in the motivation section, this library enforces best practices outlined in [TkDodo’s blog](https://tkdodo.eu/blog), particularly [Effective React Query Keys](https://tkdodo.eu/blog/effective-react-query-keys) and [The Query Options API](https://tkdodo.eu/blog/the-query-options-api).

- The API design is heavily inspired by [tRPC](https://trpc.io/), particularly its use of the builder pattern and intuitive method conventions.

<div id="15"></div>

## 📜 License

MIT © [MlNl-PEKKA](https://github.com/MlNl-PEKKA)
