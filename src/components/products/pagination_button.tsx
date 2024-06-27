'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, ReactNode } from 'react';

import { Button } from '../ui/button';

type PaginationButtonProps = {
  href: string;
  children: ReactNode;
  isDisabled?: boolean;
  reviewsSectionId?: string;
};

const PaginationButton = ({
  href,
  children,
  isDisabled,
  reviewsSectionId
}: PaginationButtonProps) => {
  const router = useRouter();
  const reviewsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (reviewsSectionId) {
      reviewsRef.current = document.getElementById(reviewsSectionId) as HTMLElement;
    }
  }, [reviewsSectionId]);

  const handleClick = () => {
    if (reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    router.push(href);
  };

  return (
    <Button onClick={handleClick} size={'icon'} variant={'outline'} disabled={isDisabled}>
      {children}
    </Button>
  );
};

export default PaginationButton;
