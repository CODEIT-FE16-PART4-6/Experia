import { z } from 'zod';

//유저 상태 저장용 스키마
export const UserSchema = z.object({
  id: z.number(),
  email: z.email(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type User = z.infer<typeof UserSchema>;

//로그인 요청 스키마
export const LoginRequestSchema = z.object({
  email: z.email({ message: '이메일 형식으로 작성해 주세요' }),
  password: z.string().min(8, { message: '8자 이상 작성해 주세요.' }),
});

//로그인 응답 스키마
export const LoginResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
