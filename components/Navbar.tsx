import { auth, UserButton } from "@clerk/nextjs";
import NavRoutes from "@/components/NavRoutes";
import StoreOptionsModal from "@/components/StoreOptionsModal";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

export default async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  let stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <section className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreOptionsModal items={stores} />
        <NavRoutes className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </section>
  );
}
