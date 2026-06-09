import mongoose, { Schema, Document } from 'mongoose'

export interface INotification extends Document {
  userId: mongoose.Types.ObjectId
  type: 'challenge' | 'hobby' | 'circle-of-life' | 'smartwatch' | 'reminder'
  title: string
  body: string
  category?: string
  readAt?: Date
  createdAt: Date
  updatedAt: Date
}

const NotificationSchema = new Schema<INotification>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['challenge', 'hobby', 'circle-of-life', 'smartwatch', 'reminder'], required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  category: String,
  readAt: Date,
}, { timestamps: true })

export default mongoose.models.Notification || mongoose.model<INotification>('Notification', NotificationSchema)
