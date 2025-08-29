import { z } from 'zod';

export const Activities = z.object({
  cursorId: z.number().optional().nullable(),
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

export type Activities = z.infer<typeof Activities>;

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

export const ActivityFormValueSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요'),
  category: z.string().min(1, '카테고리를 선택해주세요'),
  description: z.string().min(1, '설명을 입력해주세요'),
  price: z.number().min(0, '가격은 0 이상이어야 합니다'),
  address: z.string().min(1, '주소를 입력해주세요'),

  // schedules: z
  //   .array(
  //     z.object({
  //       date: z.string().min(1, '날짜를 입력해주세요'),
  //       startTime: z.string().min(1, '시작 시간을 입력해주세요'),
  //       endTime: z.string().min(1, '종료 시간을 입력해주세요'),
  //     }),
  //   )
  //   .min(1, '예약 가능한 시간대를 하나 이상 추가해주세요'),

  // bannerImageUrl: z.string().nullable(),
  // subImageUrls: z.array(z.string().nullable()).nullable(),
});

export type ActivityFormValues = z.infer<typeof ActivityFormValueSchema>;
