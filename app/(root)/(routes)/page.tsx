"use client";

import { useStoreModal } from "@/hooks/UseStoreModal";
import { useEffect } from "react";

export default function RootPage() {
  const { onOpen, isOpen } = useStoreModal();

  // Does not allow to close the modal
  useEffect(() => {
    // initially open Modal to choose or create new store
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return null;
}
