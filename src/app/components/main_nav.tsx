import Link from "next/link";
import { Button } from "../../components/ui/button";
import { CategoryNavMenu } from "./category_nav_menu";
import { getCategories } from "@/app/lib/products";

export async function MainNav() {
  const categories = getCategories();

  return (
    <nav className="hidden items-center lg:flex">
      <ul className="flex items-center space-x-6">
        <li>
          <Link href="/">
            <Button variant={"link"} className="text-secondary">
              Home
            </Button>
          </Link>
        </li>
        <li>
          <Link href="/products">
            <Button variant={"link"} className="text-secondary">
              Shop
            </Button>
          </Link>
        </li>
        <li>
          <CategoryNavMenu data={categories} />
        </li>
        <li>
          <Link href="/#blogs">
            <Button variant={"link"} className="text-secondary">
              Blogs
            </Button>
          </Link>
        </li>
        <li>
          <Link href="/#footer">
            <Button variant={"link"} className="text-secondary">
              Contact
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
