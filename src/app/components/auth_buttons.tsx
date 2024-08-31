import { useSideMenuState } from "@/app/lib/store";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useAuth,
} from "@clerk/nextjs";
import { Button } from "../../components/ui/button";

export function AuthButtons() {
  const { userId } = useAuth();
  const { setIsOpen } = useSideMenuState();

  return (
    <>
      {!userId ? (
        <div className="flex items-center justify-between gap-4 py-2">
          <div
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-28 items-center justify-center rounded border bg-muted text-sm *:w-full *:px-6 *:py-2 hover:bg-foreground/10"
          >
            <SignInButton fallbackRedirectUrl={location.pathname} mode="modal">
              Login
            </SignInButton>
          </div>
          <div
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-28 items-center justify-center rounded bg-foreground text-sm text-background *:w-full *:px-6 *:py-2 hover:bg-primary/80"
          >
            <SignUpButton fallbackRedirectUrl={location.pathname} mode="modal">
              Sign up
            </SignUpButton>
          </div>
        </div>
      ) : (
        <Button
          asChild
          onClick={() => setIsOpen(false)}
          className="*:w-full *:px-6 *:py-2"
        >
          <SignOutButton redirectUrl="/" />
        </Button>
      )}
    </>
  );
}
