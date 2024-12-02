'use client'
 
import * as React from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { Button } from "@nextui-org/react";

export default function SignInForm() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [isLoading, setIsLoading] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const router = useRouter();
  const inputPasswordRef = React.useRef<HTMLInputElement>(null);
 
  // Handle the submission of the sign-in form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }
 
    // Start the sign-in process using the email and password provided
    try {
      // check email and password
      if (!email || !password) {
        toast('Correo y contraseña son requeridos', {
          type: 'error'
        });
        return;
      }
      
      setIsLoading(true);
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });
 
      if (completeSignIn.status !== 'complete') {
        // The status can also be `needs_factor_on', 'needs_factor_two', or 'needs_identifier'
        // Please see https://clerk.com/docs/references/react/use-sign-in#result-status for  more information
        // console.log(JSON.stringify(completeSignIn, null, 2));
        setIsLoading(false);
        toast('Error al iniciar sesión', {
          type: 'error'
        });
      }
 
      if (completeSignIn.status === 'complete') {
        // If complete, user exists and provided password match -- set session active
        await setActive({ session: completeSignIn.createdSessionId });
        // Redirect the user to a post sign-in route
        toast('Inicio de sesión exitoso', {
          type: 'success'
        });
        router.push('/home/clientes');
      }
    } catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      setIsLoading(false);
      toast('Error al iniciar sesión', {
        type: 'error'
      });
      // console.error(JSON.stringify(err, null, 2));
    }
  };

  const showPassword = () => {
    if (inputPasswordRef.current) {
      inputPasswordRef.current.type = inputPasswordRef.current.type === 'password' ? 'text' : 'password';
    }
  }
 
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
        <h1 className="text-center font-bold text-2xl mb-4">Refrikar</h1>
        <h2 className="text-center font-bold text-1xl">Iniciar sesión</h2>
        <div className="py-6 flex flex-col gap-y-2">
          <div>
            <input
                className="text-black border border-gray-400 w-full p-2 rounded-xl"
                placeholder="Correo"
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                value={email}
            />
          </div>
          <div className="flex items-stretch border border-gray-400 rounded-xl bg-white overflow-hidden pr-2">
            <input
                className="text-black w-full p-2 border-none outline-transparent"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                ref={inputPasswordRef}
                type="password"
                value={password} />
            <button type="button" onClick={showPassword}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                    d="M12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9ZM12 17C10.6739 17 9.40215 16.4732 8.46447 15.5355C7.52678 14.5979 7 13.3261 7 12C7 10.6739 7.52678 9.40215 8.46447 8.46447C9.40215 7.52678 10.6739 7 12 7C13.3261 7 14.5979 7.52678 15.5355 8.46447C16.4732 9.40215 17 10.6739 17 12C17 13.3261 16.4732 14.5979 15.5355 15.5355C14.5979 16.4732 13.3261 17 12 17ZM12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5Z"
                    fill="black"/>
              </svg>
            </button>
          </div>
          <Button 
            type="submit"
            className="bg-primary w-full text-white rounded-md py-2 hover:bg-primary/30"
            isLoading={isLoading}
          >
            Iniciar sesión
          </Button>
        </div>
      </form>
    </div>
  );
}