import Link from "next/link";
import { Copyright } from "lucide-react";
import { capitalizeString } from "../lib/utils";
import { getCategories } from "../lib/products";

import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export async function Footer() {
  const categories = await getCategories();

  return (
    <footer id="footer" className="mt-8 bg-background px-6 py-20 lg:p-20">
      <div className="lg:max-view mx-auto grid max-w-screen-md gap-8 text-primary lg:grid-cols-2 lg:gap-y-0">
        <div className="lg:max-w-[50ch]">
          <Logo className="mb-2 place-self-start text-2xl text-primary" />
          <Separator />
          <p className="text-balance pt-2 text-sm font-medium text-muted-foreground">
            Techbots is a leading online shop for computers equipments and
            electronic gadgets. We provide a wide range of products at
            affordable prices and a highly detailed product specifications.
          </p>
        </div>

        <section className="lg:col-[2] lg:row-start-1 lg:row-end-3">
          <div className="mb-4">
            <h3 className="mb-2 text-2xl font-bold">Quick Links</h3>
            <Separator />
          </div>

          <div className="grid grid-cols-2 justify-between gap-4">
            <div className="flex flex-col gap-4 pl-4">
              <p className="text-lg font-medium text-muted-foreground">Main</p>
              <ul className="border-l">
                <li>
                  <Link href={"/"}>
                    <Button
                      variant={"link"}
                      className="text-xs hover:text-muted-foreground sm:text-sm"
                    >
                      Home
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href={"/products"}>
                    <Button
                      variant={"link"}
                      className="text-xs hover:text-muted-foreground sm:text-sm"
                    >
                      Products
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href={"/#blogs"}>
                    <Button
                      variant={"link"}
                      className="text-xs hover:text-muted-foreground sm:text-sm"
                    >
                      Blogs
                    </Button>
                  </Link>
                </li>
                <li>
                  <Link href={"/cart"}>
                    <Button
                      variant={"link"}
                      className="text-xs hover:text-muted-foreground sm:text-sm"
                    >
                      Shopping Cart
                    </Button>
                  </Link>
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-4 pl-4">
              <p className="text-lg font-medium text-muted-foreground">
                Categories
              </p>
              <ul className="grid max-w-xs border-l sm:grid-cols-2 lg:gap-x-8">
                {categories.map((category) => (
                  <li key={category}>
                    <Link href={`/products?cat=${category}`}>
                      <Button
                        variant={"link"}
                        className="text-xs hover:text-muted-foreground sm:text-sm"
                      >
                        {capitalizeString(category)}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="col-[1] space-y-2">
          <div className="lg:w-1/2">
            <h3 className="mb-2 text-xl font-bold">Contact Us</h3>
            <Separator />
          </div>
          <Link
            href={"https://github.com/AhmadYousif89"}
            className="block w-fit"
          >
            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <p>Connect with us on</p>
              <svg
                aria-hidden="true"
                height="24"
                width="24"
                viewBox="0 0 16 16"
                version="1.1"
                data-view-component="true"
                className="octicon octicon-mark-github v-align-middle color-fg-default"
              >
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
              </svg>
            </div>
          </Link>

          <p className="text-xs font-medium text-muted-foreground">
            40 Labor St, El Shaykh Zayed, GZ 1234, EG
          </p>
        </section>

        <p className="col-[1] mt-8 flex items-center gap-1 text-xs font-semibold text-muted-foreground lg:mt-16">
          Copyright <Copyright size={14} /> 2024 - Techbots
        </p>
      </div>
    </footer>
  );
}
