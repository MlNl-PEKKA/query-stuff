<h1 align="center">query-stuff</h1>

<p align="center">Type-safe query/mutation option factories for Tanstack/react-query</p>

<p align="center">
  <!-- prettier-ignore-start -->
  <!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
  <a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-1-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
  <!-- prettier-ignore-end -->
  <a href="https://codecov.io/gh/MlNl-PEKKA/query-stuff" > 
 <img src="https://codecov.io/gh/MlNl-PEKKA/query-stuff/graph/badge.svg?token=MCS0QMBFRR"/> 
 </a>
  <a href="https://github.com/MlNl-PEKKA/query-stuff/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
  <a href="http://npmjs.com/package/query-stuff"><img alt="📦 npm version" src="https://img.shields.io/npm/v/query-stuff?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
  <a href="https://github.com/MlNl-PEKKA/query-stuff/blob/main/tsconfig.json"><img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" /></a>
</p>

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
