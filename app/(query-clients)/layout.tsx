"use client";
import Loader from "@/components/loader";
import QueryProvider from "@/components/providers/query-provider";
import { supabase } from "@/lib/supabase";
import { useUserStore } from "@/stores/user-store";
import { useQuery } from "@tanstack/react-query";
import { redirect, usePathname } from "next/navigation";
import { useEffect } from "react";
import { ReactNode } from "react";

export interface IQueryClientsLayoutProps {
  children: ReactNode;
}

export default function QueryClientsLayout({
  children,
}: IQueryClientsLayoutProps) {
  const { setUser } = useUserStore();

  const pathname = usePathname();

  const { data, isLoading, isFetched } = useQuery({
    queryKey: ["get-user"],
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) return null;
      return data.user;
    },
  });

  // ✅ Luôn gọi useEffect, chỉ chạy redirect khi fetch xong và user null
  useEffect(() => {
    if (!isLoading && !data) {
      if (pathname.includes("/login")) return;
      redirect("/login");
    }

    console.log({ a: !isLoading && !data, data });
  }, [data, isLoading]);

  // ✅ Luôn gọi useEffect, chỉ set user khi user có dữ liệu
  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  // ✅ Không return sớm trước hook
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="flex flex-col gap-2">
          <Loader size={"lg"} />
          Loading...
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
