"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function BillingButton({ isNew = false }: { isNew?: boolean }) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    const endpoint = isNew ? "/api/stripe/checkout" : "/api/stripe/portal";
    const res = await fetch(endpoint, { method: "POST" });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else setLoading(false);
  }

  return (
    <Button variant="outline" size="sm" onClick={handleClick} loading={loading}>
      {isNew ? "Subscribe — $9/mo" : "Manage billing"}
    </Button>
  );
}
