<h1 align="center">query-stuff</h1>

<p align="center">Type-safe query/mutation option factories for Tanstack/react-query</p>

## Usage

```shell
npm i query-stuff
```

```ts
const q = new QueryStuff();

const factory = q.factory((q) => ({
  a: q.query(() => ({ aa: 1 }), { initialData: { aa: 2 } }),
  b: q.mutation(async () => ({ bb: 1 })),
  c: q.input<{ cc: number }>().query(({ cc }) => ({ cc })),
  d: q.input<{ dd: number }>().mutation(async ({ dd }) => ({ dd })),
  e: q.module((q) => ({
    a: q.query(() => ({ aa: 1 })),
    b: q.mutation(async () => ({ bb: 1 })),
    c: q.input<{ cc: number }>().query(({ cc }) => ({ cc })),
    d: q.input<{ dd: number }>().mutation(async ({ dd }) => ({ dd })),
  })),
  f: q.input<{ ff: number }>().module((q) => ({
    a: q.query(({ ff }) => ({ aaa: 1, ff })),
    b: q.mutation(async ({ ff }) => ({ bb: 1, ff })),
    c: q.input<{ cc: number }>().query(({ cc, ff }) => ({ cc, ff })),
    d: q.input<{ dd: number }>().mutation(async ({ dd, ff }) => ({ dd, ff })),
  })),
}));

console.log(factory.a().queryKey);
console.log(factory.b({ gcTime: 0 }).mutationKey);
console.log(factory.c({ cc: 1 }).queryKey);
console.log(factory.d().mutationKey);
console.log(factory.e._key);
console.log(factory.e.b().mutationKey);
console.log(factory.e.c({ cc: 1 }).queryKey);
console.log(factory.e.d().mutationKey);
console.log(factory.f({ ff: 1 }).a().queryKey);
console.log(factory.f({ ff: 1 }).b().mutationKey);
console.log(factory.f({ ff: 1 }).c({ cc: 1 }).queryKey);
console.log(factory.f({ ff: 1 }).d().mutationKey);
```
