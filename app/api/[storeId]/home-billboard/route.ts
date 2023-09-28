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

    const { title, imageUrl, description } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 });
    }

    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }

    if (!description) {
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

    const billboard = await prismadb.homeBillboard.create({
      data: {
        storeId,
        imageUrl,
        description,
        title,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[BILLBOARD_POST]", error);
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

    const homeBillboards = await prismadb.homeBillboard.findMany({
      where: {
        storeId,
      },
    });

    return NextResponse.json(homeBillboards);
  } catch (error) {
    console.log("[HOME-BILLBOARD_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
