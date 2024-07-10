import { clerkClient, currentUser } from "@clerk/nextjs/server";
import {NextRequest, NextResponse} from "next/server";
import {isUserAdmin} from "@/utils/backendUtils";
import {UserEditRequest} from "@/dtos";

const requiredFields = ['firstName', 'lastName', 'email', 'password', 'role'];

export async function POST(req: NextRequest) {
  const _isAdmin = await isUserAdmin();
  if (!_isAdmin) return NextResponse.json({ message: 'No tienes permisos para acceder' }, {
    status: 401,
  });
  const body = await req.json();

  if (!requiredFields.every((field) => Object.keys(body).includes(field))) {
    return new Response('Missing required fields', { status: 400 });
  }
  const { firstName, lastName, email, password, role } = body;

  try {
    const user = await clerkClient().users.createUser({
      firstName,
      lastName,
      emailAddress: [email],
      password,
      privateMetadata: {
        role
      },
      publicMetadata: {
        role
      }
    });
    console.log(user)
    return NextResponse.json({ message: 'User created' }, { status: 201 })
  } catch(e) {
    // @ts-ignore
    console.log(e?.status)
    // @ts-ignore
    if (e!?.status === 422) {
      return NextResponse.json({ message: 'Ya existe un usuario con este correo' }, { status: 422 })
    }
    return NextResponse.json({ message: 'Error creando el usuario' }, { status: 422 })
  }

}

export async function GET(req: NextRequest) {
  const _isAdmin = await isUserAdmin();
  if (!_isAdmin) return NextResponse.json({ message: 'No tienes permisos para acceder' }, {
    status: 401,
  });

  const response = await clerkClient().users.getUserList({
    limit: 10,
    orderBy: '+created_at',
  });


  const userList = response.data.map((user) => ({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses[0].emailAddress,
    role: user.privateMetadata.role,
    createdAt: user.createdAt
  }));
  return NextResponse.json(userList);
}

export async function PATCH(req: NextRequest) {
  const _isAdmin = await isUserAdmin();
  if (!_isAdmin) return NextResponse.json({ message: 'No tienes permisos para acceder' }, {
    status: 401,
  });
  const body: UserEditRequest = await req.json();
  const { id, ...rest } = body;

  const _restWithoutEmptyFields = Object.keys(rest).reduce((acc, key) => {
    // @ts-ignore
    if (rest[key]) {
      // @ts-ignore
      acc[key] = rest[key];
    }
    return acc;
  }, {});

  try {
    const user = await clerkClient().users.updateUser(id, {
      ...rest
    });
    return NextResponse.json({message: 'User updated'}, {status: 200});
  } catch(e) {
    return NextResponse.json({message: 'Error updating user'}, {status: 400});
  }
}
