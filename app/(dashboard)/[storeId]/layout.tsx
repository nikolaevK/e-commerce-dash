import { auth } from "@clerk/nextjs";
import React from "react";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import Navbar from "@/components/Navbar";

interface LayoutInterface {
  children: React.ReactNode;
  params: { storeId: string };
}

// Server component
export default async function layout({
  children,
  params: { storeId },
}: LayoutInterface) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // We get the storeId from InitialLayout
  // Confirm that the store exists
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId,
    },
  });

  // If Store doesn't exist send back to initial page
  // or someones puts random id

  if (!store) {
    redirect("/");
  }

  return (
    <>
      {/* @ts-expect-error Async Server Component */}
      <Navbar />
      {children}
    </>
  );
}
