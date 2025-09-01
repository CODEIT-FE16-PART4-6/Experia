export interface ReviewUserType {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

export interface ReviewType {
  id: number;
  user: ReviewUserType;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}
