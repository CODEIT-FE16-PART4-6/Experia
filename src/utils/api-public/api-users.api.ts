import { SignUpResponseDto } from './api';

import { REQUEST_URL } from '.';

const URL: string = `${REQUEST_URL}/users`;

export async function SignUpByEmail(
  email: string,
  nickname: string,
  password: string,
): Promise<{ status: number; body: SignUpResponseDto | { message: string } | null }> {
  const response = await fetch(`${URL}`, {
    method: 'post',
    body: JSON.stringify({ email, nickname, password }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  }).catch(err => {
    return err;
  });

  const status: number = response.status;

  let body: SignUpResponseDto | { message: string } | null = null;

  if (!response.ok) {
    body = await response.json();
  } else {
    body = (await response.json()) as unknown as SignUpResponseDto;
  }

  return {
    status,
    body,
  };
}
