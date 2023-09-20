"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/Heading";
import { Category, Color, Image, Product } from "@prisma/client";
import { Trash } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AlertModal from "@/components/modals/AlertModal";
import ImageUpload from "@/components/ui/ImageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductFormProps {
  product:
    | (Product & {
        images: Image[];
      })
    | null;
  colors: Color[];
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(3),
  colorId: z.string().min(3),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormType = z.infer<typeof formSchema>;

export default function ProductForm({
  product,
  categories,
  colors,
}: ProductFormProps) {
  const params = useParams();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const form = useForm<ProductFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: product
      ? {
          ...product,
          price: parseFloat(String(product.price)),
        }
      : {
          name: "",
          images: [],
          price: 0,
          categoryId: "",
          colorId: "",
          isFeatured: false,
          isArchived: false,
        },
  });

  const title = product ? "Edit product" : "Create product";
  const description = product ? "Edit product" : "Add new product";
  const toastMessage = product ? "Product updated" : "product created";
  const action = product ? "Save changes" : "Create";

  async function onSubmit(data: ProductFormType) {
    try {
      setLoading(true);

      if (product) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  }

  async function onDelete() {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);

      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success("Product deleted");
    } catch (error) {
      toast.error("Make sure you remove all categories");
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  }

  // waits until component loads in order to get client origin
  useEffect(() => {
    setUrl(window.location.origin);
  }, [url]);

  return (
    <>
      <AlertModal
        isOpen={openModal}
        loading={loading}
        onClose={() => setOpenModal(false)}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {product && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpenModal(true)}
            disabled={loading}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            // This allows Input field to have current store's name
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    urls={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange(
                        [...field.value].filter(
                          (current) => current.url !== url
                        )
                      )
                    }
                  />
                </FormControl>
                <FormMessage
                // Displays the error message when invalid input
                />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              // This allows Input field to have current store's name
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage
                  // Displays the error message when invalid input
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              // This allows Input field to have current store's name
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={loading}
                      placeholder="$$"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage
                  // Displays the error message when invalid input
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              // This allows Input field to have current store's name
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage
                  // Displays the error message when invalid input
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              // This allows Input field to have current store's name
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select color"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {colors.map((color) => (
                        <SelectItem key={color.id} value={color.id}>
                          {color.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage
                  // Displays the error message when invalid input
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 p-4 space-y-0 rounded-md border">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on home page
                    </FormDescription>
                  </div>
                  <FormMessage
                  // Displays the error message when invalid input
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex items-start space-x-3 p-4 space-y-0 rounded-md border">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear in store
                    </FormDescription>
                  </div>
                  <FormMessage
                  // Displays the error message when invalid input
                  />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading}>{action}</Button>
        </form>
      </Form>
      <Separator />
    </>
  );
}
