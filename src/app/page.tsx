import { Suspense } from "react";

import { HomeSlider } from "@/app/components/slider";
import { LatestBlogs } from "./components/featured_blogs";
import { HotProducts } from "./components/hot_products";
import { PopularItemsSlide } from "./components/popular_items_slide";
import { TechDealsSlide } from "./components/tech_deals_slide";
import { MainPageSlideSkeleton } from "./components/skeletons/main_page_slide_skeleton";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <>
      <main className="max-view mx-auto min-h-svh">
        <HomeSlider />
        <HotProducts />
        <Suspense fallback={<MainPageSlideSkeleton />}>
          <PopularItemsSlide />
        </Suspense>
        <Suspense fallback={<MainPageSlideSkeleton />}>
          <TechDealsSlide />
        </Suspense>
        <LatestBlogs />
      </main>
      <Footer />
    </>
  );
}
