import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function InitialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Getting first available user created store
  // Passing the store ID to redirect and further validation on other page
  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });

  if (store) {
    // redirects to other page for that particular store
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
