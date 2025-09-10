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

// 회원가입 요청 스키마
export const SignupRequestSchema = z
  .object({
    email: z.string().email({ message: '잘못된 이메일입니다' }),
    nickname: z.string().min(2, { message: '닉네임은 2자 이상이어야 합니다.' }),
    password: z.string().min(8, { message: '8자 이상 작성해 주세요.' }),
    passwordConfirm: z.string().min(8, { message: '8자 이상 작성해 주세요.' }),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

// 회원가입 응답 스키마
export const SignupResponseSchema = z.object({
  user: z.object({
    id: z.number(),
    nickname: z.string(),
    email: z.string(),
    profileImageUrl: z.string().nullable(),
    createdAt: z.string(),
    updatedAt: z.string(),
  }),
  /**
   * 현재 서버의 회원가입 API는 토큰을 반환하지 않으므로,
   * 스키마와 실제 응답을 일치시키기 위해 accessToken과 refreshToken 필드를 제거합니다.
   */
  // accessToken: z.string(),
  // refreshToken: z.string(),
});

export type SignupRequest = z.infer<typeof SignupRequestSchema>;
export type SignupResponse = z.infer<typeof SignupResponseSchema>;

// 카카오 로그인 관련 스키마
export const KakaoUserInfoSchema = z.object({
  id: z.number(),
  properties: z.object({
    nickname: z.string(),
    profile_image: z.string().nullable(),
  }),
  kakao_account: z
    .object({
      email: z.string().email().optional(),
      email_verified: z.boolean().optional(),
    })
    .optional(),
});

export const KakaoAuthResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
  refresh_token: z.string().optional(),
  expires_in: z.number(),
  scope: z.string().optional(),
});

export const KakaoLoginRequestSchema = z.object({
  userInfo: KakaoUserInfoSchema,
  accessToken: z.string(),
});

export const KakaoLoginResponseSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
  refreshToken: z.string(),
  isNewUser: z.boolean().optional(),
});

export type KakaoUserInfo = z.infer<typeof KakaoUserInfoSchema>;
export type KakaoAuthResponse = z.infer<typeof KakaoAuthResponseSchema>;
export type KakaoLoginRequest = z.infer<typeof KakaoLoginRequestSchema>;
export type KakaoLoginResponse = z.infer<typeof KakaoLoginResponseSchema>;
