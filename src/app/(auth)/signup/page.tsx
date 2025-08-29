'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import InputField from '@/components/InputField'
import Link from 'next/link'
import Button from '@/components/Button'
import { SignupRequest, SignupRequestSchema } from "@/types/schema/userSchema"

const SignupPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupRequest>({
    resolver: zodResolver(SignupRequestSchema),
    mode: 'onChange',
  })

  const onSumit = (data: SignupRequest) => {
    console.log('회원가입 요청 데이터:', data)
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-white'>
      <div className='w-full max-w-2xl px-4'>
        <div className='flex justify-center mb-14'>
          <Link href='/'>
            <Image src='/images/logo.svg' alt='Experia 로고' width={260} height={42} />
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSumit)}>
          <div className='flex flex-col gap-7'>
            <InputField
              label="이메일"
              placeholder="이메일 입력해 주세요"
              type="email"
              autoComplete="email"
              {...register('email')}
              error={errors.email?.message}
            />

            <InputField
              label="닉네임"
              placeholder="닉네임을 입력해 주세요"
              type="text"
              autoComplete="nickname"
              {...register('nickname')}
              error={errors.nickname?.message}
            />

            <InputField
              label="비밀번호"
              placeholder="비밀번호 입력해 주세요"
              type="password"
              autoComplete="new-password"
              {...register('password')}
              error={errors.password?.message}
            />

            <InputField
              label="비밀번호 확인"
              placeholder="비밀번호 한번 더 입력해 주세요"
              type="password"
              autoComplete="new-password"
              {...register('passwordConfirm')}
              error={errors.passwordConfirm?.message}
            />

            <Button
              type='submit'
              variant='POSITIVE'
              size='lg'
              disabled={!isValid}
            >
              회원가입 하기
            </Button>
          </div>

          <div className="mt-6 text-center">
            <div className="text-gray-900 text-base mb-4">
              이미 회원이신가요?
              <Link href="/login" className="text-nomad-black underline ml-1">
                로그인하기
              </Link>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <p className="mx-9 text-gray-800 text-xl">SNS 계정으로 회원가입하기</p>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            <div className="flex justify-center mt-4">
              <Link href='https://www.kakaocorp.com/'>
                <Image
                  src='/icons/ic_SocialLogo.svg'
                  alt='kakao 로고'
                  width={48}
                  height={48}
                  className="sm:w-18 sm:h-18"
                />
              </Link>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}

export default SignupPage
