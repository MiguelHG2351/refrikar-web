import { clerkClient, currentUser } from "@clerk/nextjs/server";
import {NextRequest, NextResponse} from "next/server";

const requiredFields = ['firstName', 'lastName', 'email', 'password'];

export async function POST(req: NextRequest) {
  const body = await req.json();

  console.log(Object.keys(body))
  if (!requiredFields.every((field) => Object.keys(body).includes(field))) {
    return new Response('Missing required fields', { status: 400 });
  }
  const _currentUser = await currentUser();
  const user = await clerkClient.users.getUser(_currentUser!?.id)

  console.log(user.privateMetadata)

  // const { firstName, lastName, email, password } = body;

  // const user = await clerkClient.users.createUser({
  //   firstName,
  //   lastName,
  //   emailAddress: [email],
  //   password,
  // });

  return NextResponse.json({ message: 'User created' }, { status: 201 })
}