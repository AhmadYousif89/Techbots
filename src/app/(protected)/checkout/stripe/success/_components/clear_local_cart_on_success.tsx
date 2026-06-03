"use client";

import { useEffect } from "react";

import { clearCart } from "@/app/(protected)/cart/_store/cart";

export function ClearLocalCartOnSuccess() {
  useEffect(() => {
    clearCart();
  }, []);

  return null;
}
