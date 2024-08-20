import { v } from 'convex/values';
import { query } from './_generated/server';

export const get = query({
  args: { questionId: v.number() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('discoveryPrompts')
      .filter((q) => q.eq(q.field('questionId'), args.questionId))
      .unique();
  },
});
