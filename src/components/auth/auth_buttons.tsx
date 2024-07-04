import { useSideMenuState } from '@/lib/store';
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut
} from '@clerk/nextjs';

export function AuthButtons() {
  const { setIsOpen } = useSideMenuState();

  return (
    <>
      <SignedOut>
        <div className='py-2 flex items-center justify-between gap-4'>
          <div
            onClick={() => setIsOpen(false)}
            className='bg-muted flex items-center justify-center w-28 h-9 border rounded text-sm hover:bg-foreground/10 *:w-full *:px-6 *:py-2'>
            <SignInButton>Login</SignInButton>
          </div>
          <div
            onClick={() => setIsOpen(false)}
            className='bg-foreground flex items-center justify-center w-28 h-9 rounded text-sm text-background hover:bg-primary/80 *:w-full *:px-6 *:py-2'>
            <SignUpButton>Sign up</SignUpButton>
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <div
          onClick={() => setIsOpen(false)}
          className='bg-primary text-secondary rounded hover:bg-foreground/80 *:w-full *:px-6 *:py-2'>
          <SignOutButton redirectUrl='/' />
        </div>
      </SignedIn>
    </>
  );
}
