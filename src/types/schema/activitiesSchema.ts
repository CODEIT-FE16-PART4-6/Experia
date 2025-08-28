import { z } from 'zod';

export const MyActivities = z.object({
  cursorId: z.number().optional(),
  totalCount: z.number(),
  activities: z.array(
    z.object({
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
    }),
  ),
});

export type MyActivities = z.infer<typeof MyActivities>;

export type Activities = Omit<MyActivities, 'cursorId'>;

export const Activity = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  bannerImageUrl: z.string(),
  rating: z.number(),
  reviewCount: z.number(),
  blurDataUrl: z.string().nullish(),
});

export type Activity = z.infer<typeof Activity>;

export const ActivityDetail = z.object({
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
  subImages: z.array(
    z.object({
      id: z.number(),
      imageUrl: z.string().nullish(),
    }),
  ),
  schedules: z.array(
    z.object({
      id: z.number(),
      date: z.string(),
      startTime: z.string(),
      endTime: z.string(),
    }),
  ),
});

export type ActivityDetail = z.infer<typeof ActivityDetail>;
