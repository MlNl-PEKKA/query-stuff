import { Options, SomeStuff } from "./someStuff.types.js";

export const someStuff = (<T extends Options>(options: T = "stuff" as T) => {
  return `Some ${options}`;
}) satisfies SomeStuff;
