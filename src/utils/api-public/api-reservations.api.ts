import fetchClientData from '@/utils/api-client/fetchClientData';

export interface CancelReservationRequest {
  status: 'canceled';
}

export interface CancelReservationResponse {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: 'pending' | 'canceled' | 'confirmed' | 'declined' | 'completed';
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

export async function cancelReservation(reservationId: number): Promise<CancelReservationResponse> {
  const response = await fetchClientData(`/my-reservations/${reservationId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status: 'canceled' }),
  });

  return response as CancelReservationResponse;
}
