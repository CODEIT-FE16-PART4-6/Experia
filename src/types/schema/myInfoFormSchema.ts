import { z } from 'zod';
export const MyInfoFormSchema = z
  .object({
    nickname: z.string().min(2, { message: '닉네임은 2자 이상이어야 합니다.' }),
    email: z.email({ message: '올바른 이메일 형식이 아닙니다.' }),
    password: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }).optional(),
    passwordConfirm: z.string().min(8, { message: '비밀번호는 8자 이상이어야 합니다.' }).optional(),
  })
  .refine(
    data => {
      if (data.password && data.passwordConfirm) {
        return data.password === data.passwordConfirm;
      }
      return true;
    },
    {
      message: '비밀번호가 일치하지 않습니다.',
      path: ['passwordConfirm'],
    },
  );

export type MyInfoFormValues = z.infer<typeof MyInfoFormSchema>;
