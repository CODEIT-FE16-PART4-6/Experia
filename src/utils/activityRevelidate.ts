'use server';
import { revalidatePath, revalidateTag } from 'next/cache';

export async function revalidateActivity(id: string) {
  revalidatePath(`https://sp-globalnomad-api.vercel.app/16-6/activities/${id}`);
  revalidateTag('activity');
}
