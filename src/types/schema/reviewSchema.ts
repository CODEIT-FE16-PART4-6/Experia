import z from 'zod';

export const ReviewPostReqSchema = z.object({
  rating: z.coerce
    .number()
    .int()
    .nonnegative()
    .min(1, { message: '별점은 1점 이상이어야 합니다.' })
    .max(5, { message: '별점은 5점 이하여야 합니다.' }),
  content: z.string({ message: '내용은 문자열로 입력해주세요' }),
});

export type ReviewPostReq = z.infer<typeof ReviewPostReqSchema>;
