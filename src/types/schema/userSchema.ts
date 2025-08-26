import { z } from 'zod';
//로그인 요청 스키마
export const LoginRequestSchema = z.object({
  email: z.email('올바른 이메일 형식을 입력해주세요.'),
  password: z
    .string('비밀번호는 필수 입력값입니다.')
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다.'),
});

//로그인 응답 스키마
export const LoginResponseSchema = z.object({
  user: z.array(
    z.object({
      id: z.number(),
      nickname: z.string(),
      email: z.string(),
      profileImageUrl: z.string().nullable(),
      createdAt: z.string(),
      updatedAt: z.string(),
    }),
  ),
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
