
// 이메일로 회원가입시 정상적으로 응답이 오면 아래와 같은 DTO로 응답
export interface CreateSignUpByEmailResponseOkDto {
  id: number,
  email: string,
  nickname: string,
  profileImageUrl?: string,
  createdAt: string,
  updatedAt: string
}
