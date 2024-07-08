import {User} from "@/dtos";

export const userAdapter = (responseData: any[]): User[] => {
  return responseData.map((data: User) => {
    return {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        role: data.role,
        createdAt: data.createdAt
      }
    })
}