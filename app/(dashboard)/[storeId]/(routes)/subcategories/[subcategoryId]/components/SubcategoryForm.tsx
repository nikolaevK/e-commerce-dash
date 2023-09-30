"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/Heading";
import { HomeBillboard, Subcategories } from "@prisma/client";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SubcategoryFormProps {
  subcategory: Subcategories;
  homeBillboards: HomeBillboard[];
}

const formSchema = z.object({
  homeBillboardId: z.string().min(7),
  subcategory1: z.string().min(3).max(25),
  subcategory2: z.string().min(3).max(25),
  subcategory3: z.string().min(3).max(25),
  description1: z.string().min(3).max(85),
  description2: z.string().min(3).max(85),
  description3: z.string().min(3).max(85),
});

type SubcategoriesFormType = z.infer<typeof formSchema>;

export default function SubcategoryForm({
  homeBillboards,
  subcategory,
}: SubcategoryFormProps) {
  const params = useParams();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  const form = useForm<SubcategoriesFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: subcategory || {
      homeBillboardId: "",
      subcategory1: "",
      subcategory2: "",
      subcategory3: "",
      description1: "",
      description2: "",
      description3: "",
    },
  });

  const title = subcategory ? "Edit subcategory" : "Create subcategory";
  const description = subcategory ? "Edit subcategory" : "Add new subcategory";
  const toastMessage = subcategory
    ? "Subcategory updated"
    : "Subcategory created";
  const action = subcategory ? "Save changes" : "Create";

  async function onSubmit(data: SubcategoriesFormType) {
    try {
      setLoading(true);

      if (subcategory) {
        await axios.patch(
          `/api/${params.storeId}/subcategories/${params.subcategoryId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/subcategories`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/subcategories`);
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
        `/api/${params.storeId}/subcategories/${params.subcategoryId}`
      );

      router.refresh();
      router.push(`/${params.storeId}/subcategories`);
      toast.success("Subcategory deleted");
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
        {subcategory && (
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
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              // This allows Input field to have current store's name
              name="subcategory1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory 1</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="title" {...field} />
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
              name="subcategory2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory 2</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="title" {...field} />
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
              name="subcategory3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subcategory 3</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="title" {...field} />
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
              name="description1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 1</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="title" {...field} />
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
              name="description2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 2</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="title" {...field} />
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
              name="description3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description 3</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="title" {...field} />
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
              name="homeBillboardId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HomeBillboard</FormLabel>
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
                          placeholder="Select home billboard"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {homeBillboards.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>
                          {billboard.title}
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
          </div>
          <Button disabled={loading}>{action}</Button>
        </form>
      </Form>
      <Separator />
    </>
  );
}
