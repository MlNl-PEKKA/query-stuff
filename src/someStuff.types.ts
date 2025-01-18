export type Options = "stuff" | (string & {});

export type SomeStuff = <T extends Options>(options?: T) => `Some ${T}`;
