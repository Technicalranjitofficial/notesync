/**
 * In-memory profile store.
 *
 * ⚠️  Replace this with a real database (Prisma/Mongoose/etc.) in production.
 *     The Map resets on every server restart.
 *
 * Key:   user email (string)
 * Value: UserProfile
 */

export interface UserProfile {
  email: string;
  name: string;
  phone: string;
  personalEmail: string;
  university: string;
  branch: string;
  semester: number;
  yearOfJoining: number;
  rollNumber?: string;
  bio?: string;
  createdAt: string;
}

// Singleton Map — persists across requests within the same server process
const store = new Map<string, UserProfile>();

export const profileStore = {
  /** Check if a profile exists for the given email */
  has(email: string): boolean {
    return store.has(email);
  },

  /** Retrieve a profile by email */
  get(email: string): UserProfile | undefined {
    return store.get(email);
  },

  /** Save or update a profile */
  set(email: string, profile: UserProfile): void {
    store.set(email, profile);
  },

  /** Delete a profile */
  delete(email: string): void {
    store.delete(email);
  },
};
