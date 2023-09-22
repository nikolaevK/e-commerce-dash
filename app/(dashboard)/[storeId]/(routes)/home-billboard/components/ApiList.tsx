"use client";
import ApiAlert from "@/components/ui/ApiAlert";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface ApiListInterface {
  routeName: string;
  routeNameId: string;
}

export default function ApiList({ routeName, routeNameId }: ApiListInterface) {
  const { storeId } = useParams();
  const [baseURL, setBaseURL] = useState("");

  useEffect(() => {
    const origin = window.location.origin;
    setBaseURL(`${origin}/api/${storeId}`);
  }, []);

  return (
    <>
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseURL}/${routeName}`}
      />
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseURL}/${routeName}/{${routeNameId}}`}
      />
      <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseURL}/${routeName}`}
      />
      <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseURL}/${routeName}/{${routeNameId}}`}
      />
      <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseURL}/${routeName}/{${routeNameId}}`}
      />
    </>
  );
}
