import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Public Route
export async function GET(
  // need request even though it is not used
  // params come as a second argument
  req: Request,
  { params: { colorId } }: { params: { colorId: string } }
) {
  try {
    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params: { colorId, storeId },
  }: { params: { colorId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { value, name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("HEX Value is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
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

    const color = await prismadb.color.updateMany({
      where: {
        id: colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  // need request even though it is not used
  // params come as a second argument
  req: Request,
  {
    params: { colorId, storeId },
  }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!storeId) {
      return new NextResponse("Store id is required", { status: 400 });
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

    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    const color = await prismadb.color.deleteMany({
      where: {
        id: colorId,
      },
    });

    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
