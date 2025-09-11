import { z } from 'zod';

export type PopularActivities = Activities;

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

export enum MyActivitiesStatus {
  declined = 'declined',
  pending = 'pending',
  confirmed = 'confirmed',
}
export const ActivityReview = z.object({
  averageRating: z.number(),
  totalCount: z.number(),
  reviews: z.array(
    z.object({
      id: z.number(),
      user: z.object({
        profileImageUrl: z.string(),
        nickname: z.string(),
        id: z.number(),
      }),
      activityId: z.number(),
      rating: z.number(),
      content: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  ),
});

export type ActivityReview = z.infer<typeof ActivityDetail>;

export const ActivityFormValueSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, '제목을 입력해주세요.'),
  category: z.string().min(1, '카테고리를 선택해주세요.'),
  description: z.string().min(1, '설명을 입력해주세요.'),
  price: z.number().min(0, '가격은 0원 이상이어야 합니다.'),
  address: z.string().min(1, '주소를 입력해주세요.'),
  schedules: z
    .array(
      z.object({
        id: z.number().optional(),
        date: z.string(),
        startTime: z.string(),
        endTime: z.string(),
      }),
    )
    .min(1, '시간대를 한 개 이상 추가해주세요.'),
  bannerImageUrl: z.url('이미지 URL이 올바르지 않습니다.').min(1, '대표 이미지를 등록해주세요.'),
  subImages: z.array(
    z.object({
      id: z.number().optional(),
      imageUrl: z.url('이미지 URL이 올바르지 않습니다.'),
    }),
  ),
});

export type ActivityFormValues = z.infer<typeof ActivityFormValueSchema>;

export type ActivityType = z.infer<typeof Activities>['activities'][number]; //액티비티 배열의 요소 타입
