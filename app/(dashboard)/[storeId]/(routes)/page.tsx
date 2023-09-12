import prismadb from "@/lib/prismadb";

interface DashBoardPageProps {
  params: { storeId: string };
}

export default async function DashBoardPage({
  params: { storeId },
}: DashBoardPageProps) {
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
    },
  });

  if (!store) return;

  const { name: storeName } = store;

  return <div>{storeName}</div>;
}
