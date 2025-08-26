import { z } from 'zod';

export const ReservationRequestShema = z.object({
  scheduleId: z.number(),
  headCount: z.number(),
});

export const ReservationResponseShema = z.object({
  id: z.number(),
  scheduleId: z.number(),
  headCount: z.number(),
  teamId: z.string(),
  userId: z.number(),
  totalPrice: z.number(),
  activitiyId: z.number(),
  status: z.enum(["pending", "confirmed", "declined", "canceled", "completed"]),
  date: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  reviewSubmitted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type ReservationReq = z.infer<typeof ReservationRequestShema>;
export type ReservationResponse = z.infer<typeof ReservationResponseShema>;
