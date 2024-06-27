import { SignInButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export async function Profile() {
  const user = await currentUser();

  if (!user) {
    return (
      <div className='px-3 py-3 text-xs rounded-md bg-zinc-100 font-medium hover:opacity-80'>
        <SignInButton mode='modal'>Sign In</SignInButton>
      </div>
    );
  }

  return (
    <Avatar>
      <AvatarImage src={user.imageUrl} alt={user.fullName ?? ''} />
      <AvatarFallback>{user.firstName}</AvatarFallback>
    </Avatar>
  );
}
