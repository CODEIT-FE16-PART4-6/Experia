
// 이메일로 회원가입시 정상적으로 응답이 오면 아래와 같은 DTO로 응답
export interface SignUpResponseDto {
  id: number,
  email: string,
  nickname: string,
  profileImageUrl?: string,
  createdAt: string,
  updatedAt: string
}

export interface MyActivitiesDto {
  date: string,
  reservations: {
    completed: number,
    confirmed: number,
    pending: number
  }
}
