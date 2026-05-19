import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  provider: 'email' | 'google' | 'apple'
  googleId?: string
  appleId?: string
  image?: string
  resetToken?: string
  resetTokenExpiry?: Date
  onboardingCompleted: boolean
  permissions: {
    notifications: boolean
    healthData: boolean
    smartwatch: boolean
  }
  smartwatchProvider?: 'garmin'
  profile: {
    genderIdentity?: string
    ageCohort?: string
    nationality?: string
    maritalStatus?: string
    relaxationTriggers: string[]
    fatigueState?: string
    microDesire?: string
    environmentalComfort?: string
    primaryMotivators: string[]
    stressCoping: string[]
    contentFilters: string[]
    focalPriority?: string
    productivityWindows: string[]
    targetIntervention?: string
  }
  subscription: {
    plan: 'free_trial' | 'monthly' | 'yearly' | 'none'
    status: 'active' | 'cancelled' | 'expired'
    trialEndsAt?: Date
    currentPeriodEnd?: Date
    stripeCustomerId?: string
    stripeSubscriptionId?: string
  }
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: String,
  provider: { type: String, enum: ['email', 'google', 'apple'], default: 'email' },
  googleId: String,
  appleId: String,
  image: String,
  resetToken: String,
  resetTokenExpiry: Date,
  onboardingCompleted: { type: Boolean, default: false },
  permissions: {
    notifications: { type: Boolean, default: false },
    healthData: { type: Boolean, default: false },
    smartwatch: { type: Boolean, default: false },
  },
  smartwatchProvider: { type: String, enum: ['garmin'] },
  profile: {
    genderIdentity: String,
    ageCohort: String,
    nationality: String,
    maritalStatus: String,
    relaxationTriggers: [String],
    fatigueState: String,
    microDesire: String,
    environmentalComfort: String,
    primaryMotivators: [String],
    stressCoping: [String],
    contentFilters: [String],
    focalPriority: String,
    productivityWindows: [String],
    targetIntervention: String,
  },
  subscription: {
    plan: { type: String, enum: ['free_trial', 'monthly', 'yearly', 'none'], default: 'free_trial' },
    status: { type: String, enum: ['active', 'cancelled', 'expired'], default: 'active' },
    trialEndsAt: Date,
    currentPeriodEnd: Date,
    stripeCustomerId: String,
    stripeSubscriptionId: String,
  },
}, { timestamps: true })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
