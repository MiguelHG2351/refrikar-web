export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: "admin" | "user";
  createdAt: Date;
}

export interface UserRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "user";
}
