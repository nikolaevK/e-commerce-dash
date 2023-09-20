"use client";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/DataTable";
import { ColorColumnType, columns } from "./Columns";
import { Plus } from "lucide-react";
import ApiList from "./ApiList";

interface ColorClientProps {
  colors: ColorColumnType[];
}

export default function ColorClient({ colors }: ColorClientProps) {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Colors (${colors.length})`}
          description="Manage colors for your products"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={colors} />
      <Heading title="API" description="API Calls for Colors" />
      <Separator />
      <ApiList routeName="colors" routeNameId="colorId" />
    </>
  );
}
