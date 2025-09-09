import { SignUpResponseDto } from './api';

import { REQUEST_URL } from '.';

const URL: string = `${REQUEST_URL}/users`;

export async function SignUpByEmail(
  email: string,
  nickname: string,
  password: string,
): Promise<{ status: number; body: SignUpResponseDto | { message: string } }> {
  const response = await fetch(`${URL}`, {
    method: 'post',
    body: JSON.stringify({ email, nickname, password }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })
    .catch(err => {
      console.log('api-users.api.ts SignUpByEmail error : ', err);
      return err;
    })
    .finally(() => console.log('api-users.api.ts SignUpByEmail request finish'));

  // 서버의 응답값 코드
  const status: number = response.status;

  // 서버의 body값
  let body: any = null;

  if (!response.ok) {
    console.error('API 호출 실패:', response);
    body = await response.json();
  } else {
    body = (await response.json()) as unknown as SignUpResponseDto;
  }

  return {
    status,
    body,
  };
}
