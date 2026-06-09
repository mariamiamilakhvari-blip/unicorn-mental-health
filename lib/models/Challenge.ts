import mongoose, { Schema, Document } from 'mongoose'

export interface IChallenge extends Document {
  userId: mongoose.Types.ObjectId
  title: string
  description: string
  category: 'social' | 'business' | 'relationships'
  startDate: Date
  dueDate: Date
  reminderDate: Date
  completed: boolean
  completedAt?: Date
  checkIns: Date[]
  createdAt: Date
  updatedAt: Date
}

const ChallengeSchema = new Schema<IChallenge>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['social', 'business', 'relationships'], required: true },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  reminderDate: { type: Date, required: true },
  completed: { type: Boolean, default: false },
  completedAt: Date,
  checkIns: [Date],
}, { timestamps: true })

export default mongoose.models.Challenge || mongoose.model<IChallenge>('Challenge', ChallengeSchema)
