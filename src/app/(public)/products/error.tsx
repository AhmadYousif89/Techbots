"use client";
import { useRouter } from "next/navigation";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type ErrorBoundaryProps = {
  error: Error;
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const router = useRouter();

  return (
    <main className="max-view mx-auto grid min-h-screen place-content-center bg-background">
      <Card className="min-w-96 max-w-screen-sm p-4">
        <CardHeader className="space-y-4">
          <CardTitle className="pb-2">Error!</CardTitle>
          <CardDescription className="text-lg font-medium">
            Unexpected error happened while retirving the data.
          </CardDescription>
          <CardDescription className="text-lg font-medium">
            {error.message}
          </CardDescription>
        </CardHeader>

        <CardFooter className="gap-4">
          <Button className="w-20 text-xs" onClick={() => router.back()}>
            Back
          </Button>
          <Button variant={"outline"} onClick={reset} className="text-xs">
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
