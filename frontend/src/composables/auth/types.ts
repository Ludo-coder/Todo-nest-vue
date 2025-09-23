export interface ILoginPayload {
  email: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    profileUrl: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
