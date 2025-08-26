import {z} from 'zod';

export const Activities = z.object({
  cursorId: z.number().optional(),
  totalCount: z.number(),
  activities: z.array(z.object({
    id: z.number(),
    userId: z.number(),
    title: z.string(),
    description: z.string(),
    category: z.string(),
    price: z.number(),
    address: z.string(),
    bannerImageUrl: z.string(),
    rating: z.number(),
    reviewCount: z.number(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }))
})

export type Activities = z.infer<typeof Activities>