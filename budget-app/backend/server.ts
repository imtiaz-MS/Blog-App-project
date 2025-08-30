import { router, publicProcedure } from "./trpc";

// query // get
// mutation // add, update, delete

// zod = type validation
// callback

const appRouter = router({
  getUser: publicProcedure.query(() => {
    return { name: "Rayhan", age: 26 };
  }),
});

export type AppRouter = typeof appRouter;
