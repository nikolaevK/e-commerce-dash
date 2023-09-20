"use client";

import AlertModal from "@/components/modals/AlertModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { ProductColumnType } from "./Columns";

interface RowActionInterface {
  productRow: ProductColumnType;
}

// Individual Row
export default function RowAction({ productRow }: RowActionInterface) {
  const [loading, setLoading] = useState(false);
  const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
  const { id: productId } = productRow;
  const router = useRouter();
  const params = useParams();
  const { storeId } = params;

  function onCopy() {
    navigator.clipboard.writeText(productId);
    toast.success("Id copied");
  }

  function onUpdate() {
    router.push(`/${storeId}/products/${productId}`);
  }

  async function onDelete() {
    try {
      setLoading(true);
      toast.loading("loading...");
      await axios.delete(`/api/${storeId}/products/${productId}`);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      toast.dismiss();
      setConfirmationModalOpen(false);
      setLoading(false);
    }
  }

  return (
    <>
      <AlertModal
        isOpen={confirmationModalOpen}
        loading={loading}
        onClose={() => setConfirmationModalOpen(false)}
        onConfirm={onDelete}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy id
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onUpdate}>
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setConfirmationModalOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
