import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// Public Route
export async function GET(
  // need request even though it is not used
  // params come as a second argument
  req: Request,
  { params: { productId } }: { params: { productId: string } }
) {
  try {
    if (!productId) {
      return new NextResponse("Product id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        color: true,
        images: true,
        category: true,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params: { productId, storeId },
  }: { params: { productId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, price, categoryId, colorId, images, isFeatured, isArchived } =
      body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!images || !images.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
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

    await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        images: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  // need request even though it is not used
  // params come as a second argument
  req: Request,
  {
    params: { productId, storeId },
  }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!productId) {
      return new NextResponse("Product id is required", { status: 400 });
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

    const product = await prismadb.product.deleteMany({
      where: {
        id: productId,
      },
    });

    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
