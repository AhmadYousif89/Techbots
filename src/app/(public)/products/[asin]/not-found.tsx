import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <main className="max-view mx-auto grid min-h-screen place-content-center bg-background">
      <Card className="min-w-96 p-4">
        <CardHeader className="space-y-4">
          <CardTitle className="pb-2">Not Found :/</CardTitle>
          <CardDescription className="text-lg font-medium">
            The product you are looking for is not available.
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button
            variant={"outline"}
            className="text-xs font-medium text-muted-foreground"
          >
            <Link href="/products">Back To Shop</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
