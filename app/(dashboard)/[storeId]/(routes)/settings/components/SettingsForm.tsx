"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/Heading";
import { Store } from "@prisma/client";
import { Trash } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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

interface SettingsFormProps {
  store: Store;
}

const formSchema = z.object({
  name: z.string().min(3),
});

type SettingsFormType = z.infer<typeof formSchema>;

export default function SettingsForm({ store }: SettingsFormProps) {
  const params = useParams();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormType>({
    resolver: zodResolver(formSchema),
    defaultValues: store,
  });

  async function onSubmit({ name: storeName }: SettingsFormType) {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, { storeName });
      router.refresh();
      toast.success("Store updated");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function onDelete() {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store deleted");
    } catch (error) {
      toast.error("Make sure you remove all products and categories first");
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={openModal}
        loading={loading}
        onClose={() => setOpenModal(false)}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading title="Settings" description="Manage store preferences" />
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setOpenModal(true)}
          disabled={loading}
        >
          <Trash className="h-4 w-4" />
        </Button>
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
                      placeholder="Store name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage
                  // Displays the error message when invalid input
                  />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="">
            Save Changes
          </Button>
        </form>
      </Form>
    </>
  );
}
