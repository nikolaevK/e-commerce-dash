import { auth, UserButton } from "@clerk/nextjs";
import NavRoutes from "@/components/NavRoutes";
import StoreOptionsModal from "@/components/StoreOptionsModal";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";

interface NavbarInterface {}

export default async function Navbar({}: NavbarInterface) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  let stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  if (!stores) {
    stores = [];
  }
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
