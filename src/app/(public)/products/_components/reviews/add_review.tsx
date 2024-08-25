"use client";

import { toast } from "sonner";
import { useState, useTransition } from "react";
import { Ban, CheckSquare, Star } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SignUpButton, useAuth } from "@clerk/nextjs";

export function AddReview({ asin }: { asin: string }) {
  const { userId } = useAuth();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  if (!userId) {
    return (
      <Button asChild>
        <SignUpButton mode="redirect" fallbackRedirectUrl={`/products/${asin}`}>
          Write a review
        </SignUpButton>
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={"sm"} className="text-xs">
          Write a review
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-sm">Customer Review</DialogTitle>
          <DialogDescription className="text-xs">
            Review this product and share your thoughts with other customers
          </DialogDescription>
        </DialogHeader>
        <div className="mb-4 grid">
          <div className="mb-4 flex items-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <Button
                key={index}
                variant={"ghost"}
                onClick={() => setRating(index + 1)}
                className="group size-8 rounded-full p-0"
              >
                <Star
                  className={cn(
                    "size-5 text-input group-hover:text-muted-foreground",
                    rating >= index + 1
                      ? "fill-yellow-500 text-yellow-500"
                      : "",
                  )}
                />
              </Button>
            ))}
          </div>
          <Textarea
            id="name"
            value={content}
            className="col-span-3"
            placeholder="Type your review here."
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              if (rating == 0) {
                toast.custom(
                  () => (
                    <div className="flex items-center gap-4">
                      <Ban className="text-red-400" />
                      <p className="text-sm">Please select a rating</p>
                    </div>
                  ),
                  { duration: 5000 },
                );
                return;
              }
              if (!content || content.length < 10) {
                toast.custom(
                  () => (
                    <div className="flex items-center gap-4">
                      <Ban className="text-red-400" />
                      <p className="text-sm">
                        Review must have at least 10 characters
                      </p>
                    </div>
                  ),
                  { duration: 5000 },
                );
                return;
              }
              setOpen(false);
              toast.custom(() => {
                return (
                  <div className="flex items-center gap-4">
                    <CheckSquare className="text-green-400" />
                    <p className="text-sm">Review submitted successfully</p>
                  </div>
                );
              });
            }}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
