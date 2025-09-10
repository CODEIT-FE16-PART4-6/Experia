import z from 'zod';

export const NotificationSchema = z.object({
  id: z.number(),
  teamId: z.string(),
  userId: z.number(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  deletedAt: z.union([z.string(), z.null()]),
});

export type Notification = z.infer<typeof NotificationSchema>;

export const NotificationsSchema = z.object({
  totalCount: z.number(),
  notifications: z.array(NotificationSchema),
  cursorId: z.union([z.number(), z.null()]),
});

export type Notifications = z.infer<typeof NotificationsSchema>;
