"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/Heading";
import { Category, HomeBillboard } from "@prisma/client";
import { Trash } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
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

interface HomeBillboardFormProps {
  billboard: HomeBillboard;
  categories: Category[];
}

const formSchema = z.object({
  title: z.string().min(3).max(35),
  description: z.string().min(3),
  imageUrl: z.string().min(3),
});

type HomeBillboardFormType = z.infer<typeof formSchema>;

export default function BillboardForm({
  billboard,
  categories,
}: HomeBillboardFormProps) {
  const params = useParams();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const form = useForm<HomeBillboardFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: billboard || {
      imageUrl: "",
      title: "",
      description: "",
    },
  });

  const title = billboard ? "Edit billboard" : "Create billboard";
  const description = billboard ? "Edit billboard" : "Add new billboard";
  const toastMessage = billboard ? "Billboard updated" : "Billboard created";
  const action = billboard ? "Save changes" : "Create";

  async function onSubmit(data: HomeBillboardFormType) {
    try {
      setLoading(true);

      if (billboard) {
        await axios.patch(
          `/api/${params.storeId}/home-billboard/${params.billboardId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/home-billboard`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/home-billboard`);
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

      await axios.delete(
        `/api/${params.storeId}/home-billboard/${params.billboardId}`
      );

      router.refresh();
      router.push(`/${params.storeId}/home-billboard`);
      toast.success("Billboard deleted");
    } catch (error) {
      toast.error("Cannot delete");
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
        {billboard && (
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
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    urls={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(imageUrl) => field.onChange(imageUrl)}
                    onRemove={() => field.onChange("")}
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slide Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Slide title"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Describe slide"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage
                  // Displays the error message when invalid input
                  />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              // This allows Input field to have current store's name
              name="categoryName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
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
                        <SelectItem key={category.id} value={category.name}>
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
            /> */}
          </div>
          <Button disabled={loading}>{action}</Button>
        </form>
      </Form>
      <Separator />
    </>
  );
}
