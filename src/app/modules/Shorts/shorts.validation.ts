import { z } from 'zod';

export const ShortValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    description: z.string(),
    thumbnail: z.url(),
    videoUrl: z.url(),
    views: z.number(),
    tags: z.array(z.string()),
  }),
});
