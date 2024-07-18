import { Loader } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-background max-view mx-auto'>
      <div className='flex flex-col items-center animate-pulse overflow-hidden'>
        <Loader className='size-20 md:size-28 animate-[spin_2s_linear_infinite]'></Loader>
      </div>
    </div>
  );
}
