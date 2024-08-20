import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='flex items-center justify-center bg-retroGreen'>
      <div className='w-full max-w-md p-4 bg-retroYellow rounded-lg shadow-lg border-4 border-retroBrown'>
        <h1 className='text-4xl font-pixel text-retroBrown mb-4 text-center'>
          Welcome Back
        </h1>
        <SignIn path='/sign-in' routing='path' />
      </div>
    </div>
  );
}
