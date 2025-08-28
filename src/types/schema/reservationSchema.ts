import { z } from 'zod';

export const ActivitySchema = z.object({
  bannerImageUrl: z.string(),
  title: z.string(),
  id: z.number(),
});

export const ReservationWithActivityResponseDtoSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  activity: ActivitySchema,
  scheduleId: z.number(),
  status: z.enum(['pending', 'confirmed', 'declined', 'canceled', 'completed']),
  reviewSubmitted: z.boolean(),
  totalPrice: z.number(),
  headCount: z.number(),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  createdAt: z.string(), // 날짜 문자열
  updatedAt: z.string(), // 날짜 문자열
});

export const ReservationResponseSchema = z.object({
  cursorId: z.number().nullable(),
  reservations: z.array(ReservationWithActivityResponseDtoSchema),
  totalCount: z.number(),
});

export type ReservationResponse = z.infer<typeof ReservationResponseSchema>;

export const ReservationRequestSchema = z.object({
  scheduleId: z.number(),
  headCount: z.number(),
});

export type ReservationRequest = z.infer<typeof ReservationRequestSchema>;
