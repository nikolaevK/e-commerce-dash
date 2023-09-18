"use client";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/DataTable";
import { BillBoardColumnType, columns } from "./Columns";
import { Plus } from "lucide-react";
import ApiList from "./ApiList";

interface BillBoardClientProps {
  billboards: BillBoardColumnType[];
}

export default function BillBoardClient({ billboards }: BillBoardClientProps) {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Manage billboards"
          title={`Billboards (${billboards.length})`}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={billboards} />
      <Heading description="API calls for Billboards" title="API" />
      <Separator />
      <ApiList routeName="billboards" routeNameId="billboardId" />
    </>
  );
}
