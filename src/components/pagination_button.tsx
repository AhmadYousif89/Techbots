'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, ReactNode } from 'react';

import { Button, ButtonProps } from './ui/button';

type PaginationButtonProps = {
  href: string;
  elementId?: string;
} & ButtonProps;

const PaginationButton = ({ href, elementId, ...props }: PaginationButtonProps) => {
  const router = useRouter();
  const reviewsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (elementId) {
      reviewsRef.current = document.getElementById(elementId) as HTMLElement;
    }
  }, [elementId]);

  const handleClick = () => {
    if (reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    router.push(href);
  };

  return (
    <Button onClick={handleClick} size={'icon'} variant={'outline'} {...props}>
      {props.children}
    </Button>
  );
};

export default PaginationButton;
