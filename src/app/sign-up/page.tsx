import SignUpForm from "@/components/forms/SignUpForm";

export default function Page() {
  
  // Display the initial sign-up form to capture the email and password
  return (
    <section className='flex justify-center items-center min-h-screen'>
      <div>
        <div className="px-4">
          <h1 className='text-center text-4xl font-bold'>Refrikar</h1>
          <p className='text-center mb-8'>Panel de administración para los servicios ofrecidos por refrikar</p>
        </div>
        <SignUpForm />
      </div>
    </section>
  );
}
