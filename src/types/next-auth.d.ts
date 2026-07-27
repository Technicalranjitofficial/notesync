import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
      isPremium: boolean;
      university: string | null;
      /** true once the user has submitted the complete-profile form */
      profileComplete: boolean;
      /** JWT from the NestJS backend — used for API calls */
      authToken: string;
    };
  }

  interface User {
    isPremium?: boolean;
    university?: string | null;
    profileComplete?: boolean;
    authToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    isPremium: boolean;
    university: string | null;
    /** true once the user has submitted the complete-profile form */
    profileComplete: boolean;
    /** JWT from the NestJS backend */
    authToken: string;
  }
}
