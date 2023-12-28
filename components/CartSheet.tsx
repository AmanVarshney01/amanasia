"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Button } from "./ui/button";
import { DeleteIcon, ShoppingCartIcon } from "lucide-react";
import useCartStore from "@/store/useCartStore";
import { urlForImage } from "@/sanity/lib/image";

export default function CartSheet() {
  const { cart, removeFromCart }: any = useCartStore();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify(cart),
    })
      .then(() => alert("Success!"))
      .catch((error) => alert(error));

  };
  return (
    <Sheet>
      <SheetTrigger className=" relative ml-0 md:ml-auto">
        {/* <div className={`${cart.length != 0 ? "after:absolute after:-top-1 after:-right-1 after:text-red-500 after:w-2 after:h-2 after:bg-red-500 after:rounded-full" : ""}`}> */}
        <ShoppingCartIcon size={22} />
        {/* {cart.length !== 0 ? (
            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>
          ) : null} */}
        {/* </div> */}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <SheetDescription className="mb-4 text-gray-500">
          {cart.length === 0 ? "Empty" : ""}
        </SheetDescription>
        {cart.map((product: any) => (
          <div
            key={product.id}
            className="relative mb-2 flex gap-4 rounded-lg border bg-white/50 p-2 text-lg"
          >
            <Image
              src={urlForImage(product.images[0])}
              width={100}
              height={100}
              alt={product.name}
              className="rounded-lg"
            />
            <div className="flex flex-col gap-2">
              <div className=" ">{product.name}</div>
              <div className="text-red-500">₹ {product.price}</div>
            </div>
            <Button
              className="absolute bottom-2 right-2"
              variant={"destructive"}
              size={"icon"}
              onClick={() => removeFromCart(product)}
            >
              <DeleteIcon size={22} />
            </Button>
          </div>
        ))}
        <SheetFooter>
          <form method="post" name="cart"  onSubmit={handleSubmit} data-netlify="true">
          <input type="hidden" name="form-name" value="cart" />
            <SheetClose asChild>
              <Button type="submit">Submit</Button>
            </SheetClose>
          </form>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
