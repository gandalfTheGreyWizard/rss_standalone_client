export interface UserConfig {
  createdAt?: Date;
  feedName: string;
  feedUrl: string;
  id?: number;
  updatedAt?: Date;
  userId: number;
}

export interface DecodedTokenObject {
  firstName: string;
  lastName: string;
  id: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  iat: string;
  exp: string;
  status: string;
}
