"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { push } = useRouter();
  useEffect(() => {
    const token = Cookies.get("insp_token");
    if (!token) {
      push("/");
    }
  }, [push]);

  return children;
}
