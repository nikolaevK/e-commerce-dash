"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/Heading";
import { Billboard, Category, Color } from "@prisma/client";
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

interface ColorFormProps {
  color: Color | null;
}

const formSchema = z.object({
  name: z.string().min(3),
  value: z.string().min(4).max(9).regex(/^#/, {
    message: "String must be a valid hex code",
  }),
});

type ColorFormType = z.infer<typeof formSchema>;

export default function CategoryForm({ color }: ColorFormProps) {
  const params = useParams();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [url, setUrl] = useState("");

  const form = useForm<ColorFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: color || {
      name: "",
      value: "",
    },
  });

  const title = color ? "Edit color" : "Create color";
  const description = color ? "Edit color" : "Add new color";
  const toastMessage = color ? "Color updated" : "Color created";
  const action = color ? "Save changes" : "Create";

  async function onSubmit({ name, value }: ColorFormType) {
    try {
      setLoading(true);

      if (color) {
        await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, {
          value,
          name,
        });
      } else {
        await axios.post(`/api/${params.storeId}/colors`, {
          value,
          name,
        });
      }

      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success(toastMessage);
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete() {
    try {
      setLoading(true);

      await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);

      router.refresh();
      router.push(`/${params.storeId}/colors`);
      toast.success("Color deleted");
    } catch (error) {
      toast.error("Make sure you remove all products using this color");
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
        {color && (
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Color name"
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
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-x-4">
                      <Input
                        disabled={loading}
                        placeholder="Color value"
                        {...field}
                      />
                      <div
                        className="border p-4 rounded-full"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit" className="ml-auto">
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
}
