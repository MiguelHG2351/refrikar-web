'use client'
 
import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
 
export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
 
  // Handle the submission of the sign-in form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
 
    // Start the sign-in process using the email and password provided
    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });
 
      if (completeSignIn.status !== 'complete') {
        // The status can also be `needs_factor_on', 'needs_factor_two', or 'needs_identifier'
        // Please see https://clerk.com/docs/references/react/use-sign-in#result-status for  more information
        console.log(JSON.stringify(completeSignIn, null, 2));
      }
 
      if (completeSignIn.status === 'complete') {
        // If complete, user exists and provided password match -- set session active
        await setActive({ session: completeSignIn.createdSessionId });
        // Redirect the user to a post sign-in route
        router.push('/home/dashboard');
      }
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };
 
  // Display a form to capture the user's email and password
  return (
    <div className="flex justify-center items-center h-screen">
      <form className="shadow-card-secondary max-w-96 w-full px-4 py-2 rounded-xl" onSubmit={(e) => handleSubmit(e)}>
        <Image
            className="max-w-full mx-auto"
            src="/images/pingu-login.png"
            priority
            alt="Logo del login"
            width={125}
            height={125} />
        <h1 className="text-center font-bold text-2xl mb-4">Iniciar sesión</h1>
        <p>Sistema de control de inventario y registro de servicios o algo así</p>
        <div className="py-6 flex flex-col gap-y-2">
          <div>
            <input
                className="text-black border border-gray-400 w-full p-2 rounded-xl"
                placeholder="admin@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                value={email}
            />
          </div>
          <div>
            <input
                className="text-black border border-gray-400 w-full p-2 rounded-xl"
                placeholder="**********"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                type="password"
                value={password} />
          </div>
          <button type="submit" className="bg-primary w-full text-white rounded-md py-2 hover:bg-primary/30">Sign In</button>
        </div>
      </form>
    </div>
  );
}