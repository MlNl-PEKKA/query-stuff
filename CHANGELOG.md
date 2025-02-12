# query-stuff

## 0.2.0

### Minor Changes

- f49395f: # 🚀 Minor Update: API Refinements & Middleware Enhancements

  This update introduces **a refined API structure**, **improved type safety**, and **better middleware composition**, while maintaining the core functionality of `query-stuff`.

  ***

  ## **🔄 API Changes**

  ### **1️⃣ Factory Initialization Now Uses `factory()` Instead of `new QueryStuff()`**

  **Before:**

  ```ts
  const q = new QueryStuff();
  const factory = q.factory((q) => ({
    a: q.query(() => ({ aa: 1 })),
  }));
  ```

  **After:**

  ```ts
  import { factory } from "query-stuff";

  const factory = factory("feature", (q) => ({
    a: q.query(() => ({ aa: 1 })),
  }));
  ```

  ✔ **More intuitive API**
  ✔ **Each factory now has a clear feature scope**

  ***

  ### **2️⃣ `module` Renamed to `group` for Better Clarity**

  **Before:**

  ```ts
  e: q.module((q) => ({
    a: q.query(() => ({ aa: 1 })),
  })),
  ```

  **After:**

  ```ts
  e: q.group((q) => ({
    a: q.query(() => ({ aa: 1 })),
  })),
  ```

  ✔ **Makes it clearer that it's for organizing queries/mutations**
  ✔ **No impact on behavior—just a naming improvement**

  ***

  ### **3️⃣ `input()` Now Works Seamlessly with Queries, Mutations, and Groups**

  Previously, `input()` had **separate behaviors for modules and queries/mutations**. Now, it's **consistently chainable** across all API levels.

  **Before:**

  ```ts
  f: q.input<{ ff: number }>().module((q) => ({
    a: q.query(({ ff }) => ({ aaa: 1, ff })),
  })),
  ```

  **After:**

  ```ts
  f: q.input(z.object({ ff: z.number() })).group((q) => ({
    a: q.query(({ ff }) => ({ aaa: 1, ff })),
  })),
  ```

  ✔ **Standardized schema validation using [Standard Schema](https://github.com/standard-schema/standard-schema)**
  ✔ **Eliminates the need for manual TypeScript generics**

  ***

  ## **🔗 Middleware Enhancements**

  ### **4️⃣ Middleware System Introduced (`unstable_use`, `unstable_middlewareBuilder`)**

  This update **introduces middleware composition**, allowing you to **intercept and modify execution context dynamically**.

  **New API:**

  ```ts
  const loggingMiddleware = unstable_middlewareBuilder(
    async ({ next, ctx }) => {
      console.log("Before:", ctx);
      const result = await next({ ctx });
      console.log("After:", result);
      return result;
    },
  );

  const factory = factory("feature", (q) => ({
    a: q.unstable_use(loggingMiddleware).query(() => ({ aa: 1 })),
  }));
  ```

  ✔ **Intercept queries/mutations at execution time**
  ✔ **Modify context dynamically**

  ***

  ### **5️⃣ `unstable_extend()` and `inherit()` for Middleware Composition**

  Middleware can now be **composed in a structured manner**, ensuring **type safety and context awareness**.

  ```ts
  const fooMiddleware = unstable_middlewareBuilder(async ({ next }) => {
    return await next({ ctx: { foo: "foo" } });
  });

  const fooBarMiddleware = fooMiddleware.unstable_extend(
    async ({ next, ctx }) => {
      console.log(ctx); // { foo: "foo" }
      return await next({ ctx: { bar: "bar" } });
    },
  );
  ```

  ✔ **`unstable_extend()` stacks middlewares together**
  ✔ **`inherit()` allows creating a type-safe middleware without stacking it immediately**

  ***

  ## **💡 Other Notable Improvements**

  - **`useExactMutationState` Introduced** → A type-safe wrapper around React Query’s `useMutationState()`.
  - **Improved Query & Mutation Key Generation** → Now fully hierarchical and more predictable.
  - **Consistent Method Naming & Composition** → Aligns with **tRPC-inspired builder patterns**.

  ***

  ## **🔄 Migration Guide**

  1️⃣ **Replace `new QueryStuff()` with `factory("feature", (q) => ({}))`.**
  2️⃣ **Rename `module` → `group`** in all instances.
  3️⃣ **Wrap input schemas with `z.object({...})` for better type safety.**
  4️⃣ **Adopt `unstable_use()`, `unstable_extend()`, and `unstable_middlewareBuilder()` for middleware needs.**

  ***

## 0.1.1

### Patch Changes

- 9773cb5: release-patch

## 0.1.0

### Minor Changes

- 0494a2f: Type-safe query/mutation option factories for Tanstack/react-query
