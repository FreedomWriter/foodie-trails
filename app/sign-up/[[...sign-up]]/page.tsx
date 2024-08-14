import { SignUp } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-retroGreen'>
      <div className='w-full max-w-md p-8 bg-retroYellow rounded-lg shadow-lg border-4 border-retroBrown'>
        <h1 className='text-4xl font-pixel text-retroBrown mb-6 text-center'>
          Join the Trail
        </h1>
        <SignUp />
      </div>
    </div>
  );
}
