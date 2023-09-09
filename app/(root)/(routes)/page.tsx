"use client";

import { useStoreModal } from "@/hooks/UseStoreModal";
import { useEffect } from "react";

export default function RootPage() {
  const { onOpen, isOpen } = useStoreModal();

  useEffect(() => {
    // initially open Modal to choose store
    if (!isOpen) onOpen();
  }, [isOpen, onOpen]);

  return null;
}
