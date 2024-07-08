import {currentUser} from "@clerk/nextjs/server";

export async function isUserAdmin() {
  const _currentUser = await currentUser();
  return _currentUser?.privateMetadata.role === 'admin';
}