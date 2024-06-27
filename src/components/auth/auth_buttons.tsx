import { SignInButton, SignUpButton } from '@clerk/nextjs';

export function AuthButtons() {
  return (
    <div className='py-2 flex items-center gap-4'>
      <div className='bg-muted flex items-center justify-center w-28 h-10 rounded text-sm hover:bg-foreground/10 *:w-full *:px-6 *:py-2'>
        <SignInButton>Login</SignInButton>
      </div>
      <div className='bg-foreground flex items-center justify-center w-28 h-10 rounded text-sm text-background hover:bg-muted-foreground *:w-full *:px-6 *:py-2'>
        <SignUpButton>Sign up</SignUpButton>
      </div>
    </div>
  );
}
