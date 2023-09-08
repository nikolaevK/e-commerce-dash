"use client";

import StoreModal from "@/components/modals/StoreModal";
import React, { useEffect, useState } from "react";

type Props = {};

export default function ModalProvider({}: Props) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return <StoreModal />;
}
