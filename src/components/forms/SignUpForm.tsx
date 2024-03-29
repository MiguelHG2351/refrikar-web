'use client';

import * as React from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
// import { ClerkAPIErrorJSON, SignUpResource } from '@clerk/types';
import InputAuth from '@/components/forms/InputAuth';


const  SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = React.useState(false);
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const router = useRouter();
  const [code, setCode] = React.useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
 
    try {
      const completeSignUp = await signUp!.attemptEmailAddressVerification({
        code
      });
 
      if (completeSignUp.status !== "complete") {
        // The status can also be `abandoned` or `missing_requirements`
        // Please see https://clerk.com/docs/references/react/use-sign-up#result-status for  more information
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
 
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/");
      }
    }
    catch (err: any) {
      // This can return an array of errors.
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    
    try {
      await signUp!.create({
        emailAddress, password
      });
 
      await signUp!.prepareEmailAddressVerification({
        strategy: 'email_code'
      });
 
      setVerifying(true);
    }
    catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling to learn about error handling
      console.error('Error:', JSON.stringify(err, null, 2));
    }
  }

  if (verifying) {
    return (
      <form onSubmit={handleVerify} className='px-4'>
        <InputAuth fieldName='code' fieldValue={code} label='Ingresa el código enviado por correo' setFieldValue={setCode} />
        <button className='bg-blue-600 text-white w-full py-2 rounded-md mt-2' type="submit">Completar registro</button>
      </form>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='px-4'>
    <div className="flex flex-col gap-y-4">
      <InputAuth fieldName='email' fieldValue={emailAddress} label='Email address' setFieldValue={setEmailAddress} />
      <InputAuth fieldName='password' fieldValue={password} label='Password' setFieldValue={setPassword} />
      <div className='flex'>
        <button className='bg-blue-600 text-white w-full py-2 rounded-md' type="submit">Registrarse</button>
      </div>
    </div>
  </form>
  )
}

export default SignUpForm;
