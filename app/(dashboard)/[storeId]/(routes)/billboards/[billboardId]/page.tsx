import prismadb from "@/lib/prismadb";
import BillboardForm from "./components/BillBoardForm";

interface BillboardPageProps {
  params: { billboardId: string };
}

export default async function BillboardPage({
  params: { billboardId },
}: BillboardPageProps) {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm billboard={billboard} />
      </div>
    </div>
  );
}
