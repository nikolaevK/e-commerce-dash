import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Public Route
export async function GET(
  // need request even though it is not used
  // params come as a second argument
  req: Request,
  { params: { subcategoryId } }: { params: { subcategoryId: string } }
) {
  try {
    if (!subcategoryId) {
      return new NextResponse("Subcategory id is required", { status: 400 });
    }

    const subcategory = await prismadb.subcategories.findUnique({
      where: {
        id: subcategoryId,
      },
    });

    return NextResponse.json(subcategory);
  } catch (error) {
    console.log("[SUBCATEGORY_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params: { subcategoryId, storeId },
  }: { params: { subcategoryId: string; storeId: string } }
) {
  try {
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
      return new NextResponse("Unauthorized", { status: 401 });
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

    const subcategory = await prismadb.subcategories.update({
      where: {
        id: subcategoryId,
      },
      data: {
        homeBillboardId,
        subcategory1,
        subcategory2,
        subcategory3,
        description1,
        description2,
        description3,
      },
    });

    return NextResponse.json(subcategory);
  } catch (error) {
    console.log("[SUBCATEGORIES_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  // need request even though it is not used
  // params come as a second argument
  req: Request,
  {
    params: { subcategoryId, storeId },
  }: { params: { storeId: string; subcategoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!subcategoryId) {
      return new NextResponse("Subcategory id is required", { status: 400 });
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

    const subcategory = await prismadb.subcategories.deleteMany({
      where: {
        id: subcategoryId,
      },
    });

    return NextResponse.json(subcategory);
  } catch (error) {
    console.log("[SUBCATEGORY_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
