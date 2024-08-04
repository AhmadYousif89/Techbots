import { useSideMenuState } from "@/app/lib/store";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  useAuth,
} from "@clerk/nextjs";

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
            <SignInButton fallbackRedirectUrl={"/products"} mode="modal">
              Login
            </SignInButton>
          </div>
          <div
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-28 items-center justify-center rounded bg-foreground text-sm text-background *:w-full *:px-6 *:py-2 hover:bg-primary/80"
          >
            <SignUpButton fallbackRedirectUrl={"/products"} mode="modal">
              Sign up
            </SignUpButton>
          </div>
        </div>
      ) : (
        <div
          onClick={() => setIsOpen(false)}
          className="rounded bg-primary text-secondary *:w-full *:px-6 *:py-2 hover:bg-foreground/80"
        >
          <SignOutButton redirectUrl="/" />
        </div>
      )}
    </>
  );
}
