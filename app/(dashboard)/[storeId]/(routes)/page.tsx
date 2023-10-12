import { getGraphRevenue } from "@/actions/getGraphRevenue";
import { getProductInStockCount } from "@/actions/getProductStockCount";
import { getSalesCount } from "@/actions/getSalesCount";
import { getTotalRevenue } from "@/actions/getTotalRevenue";
import Overview from "@/components/Overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import prismadb from "@/lib/prismadb";
import { formatCurrency } from "@/lib/utils";
import { Car, CreditCardIcon, DollarSign, Package } from "lucide-react";

interface DashBoardPageProps {
  params: { storeId: string };
}

export default async function DashBoardPage({
  params: { storeId },
}: DashBoardPageProps) {
  const totalRevenue = await getTotalRevenue(storeId);
  const salesCount = await getSalesCount(storeId);
  const productInStockCount = await getProductInStockCount(storeId);
  const getRevenue = await getGraphRevenue(storeId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {formatCurrency.format(totalRevenue)}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCardIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              +{salesCount}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {productInStockCount}
            </CardContent>
          </Card>
        </div>
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={getRevenue} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
