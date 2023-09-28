"use client";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/DataTable";
import { columns, HomeBillboardColumnType } from "./Columns";
import { Plus } from "lucide-react";
import ApiList from "./ApiList";

interface HomeBillboardClientProps {
  homeBillboard: HomeBillboardColumnType[];
}

export default function HomeBillboardClient({
  homeBillboard,
}: HomeBillboardClientProps) {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          description="Manage billboards"
          title={`Home Billboards (${homeBillboard.length})`}
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/home-billboard/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="title" columns={columns} data={homeBillboard} />
      <Heading description="API calls for Products" title="API" />
      <Separator />
      <ApiList routeName="home-billboard" routeNameId="billboardId" />
    </>
  );
}
