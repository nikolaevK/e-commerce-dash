import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
    // Authenticating using Clerk authentication
    const { userId } = auth();
    const body = await req.json();

    const {
      homeBillboardId,
      subcategory1,
      subcategory2,
      subcategory3,
      description1,
      description2,
      description3,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!homeBillboardId) {
      return new NextResponse("Home Billboard is required", { status: 400 });
    }

    if (!subcategory1 || !subcategory2 || !subcategory3) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!description1 || !description2 || !description3) {
      return new NextResponse("Description is required", { status: 400 });
    }

    const usersStore = await prismadb.store.findFirst({
      where: {
        id: storeId,
        userId,
      },
    });

    if (!usersStore) {
      return new NextResponse("Not your store", { status: 403 });
    }

    const subcategories = await prismadb.subcategories.create({
      data: {
        storeId,
        homeBillboardId,
        subcategory1,
        subcategory2,
        subcategory3,
        description1,
        description2,
        description3,
      },
    });

    return NextResponse.json(subcategories);
  } catch (error) {
    console.log("[SUBCATEGORIES_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// Public Route
export async function GET(
  req: Request,
  { params: { storeId } }: { params: { storeId: string } }
) {
  try {
    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const subcategories = await prismadb.subcategories.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(subcategories);
  } catch (error) {
    console.log("[SUBCATEGORIES_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
