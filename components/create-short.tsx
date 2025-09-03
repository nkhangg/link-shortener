"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { Link as LinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import Loader from "./loader";
import { delay } from "@/app/features/delay";
import { useUserStore } from "@/stores/user-store";

// Zod schema: bắt buộc http/https và URL hợp lệ
const formSchema = z.object({
  url: z
    .string()
    .min(1, "Vui lòng nhập URL")
    .url("URL không hợp lệ")
    .refine(
      (v) => /^https?:\/\//i.test(v),
      "URL phải bắt đầu bằng http:// hoặc https://"
    ),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateShort({
  onSubmitted,
}: {
  onSubmitted: () => void;
}) {
  const { user } = useUserStore();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: "" },
    mode: "onTouched",
  });

  async function handleSubmit(values: FormValues) {
    mutation.mutate({ url: values.url });
    form.reset();
  }

  const mutation = useMutation({
    mutationKey: ["create-links"],
    mutationFn: async ({ url }: { url: string }) => {
      await delay(400);

      const { data, error } = await supabase
        .from("links")
        .insert([{ original_url: url, user_id: user?.id } as IShortenedUrl])
        .select(); // lấy lại row vừa insert

      if (error) {
        console.error("Insert error:", error);
        return null;
      }

      return data;
    },
    onSuccess: () => {
      onSubmitted();
    },
  });

  return (
    <Card className="mb-8">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-balance">
          Rút gọn URL của bạn
        </CardTitle>
        <CardDescription className="text-lg text-pretty">
          Tạo link ngắn gọn, dễ chia sẻ từ URL dài của bạn
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex gap-2"
            noValidate
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="sr-only">URL</FormLabel>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="Nhập URL cần rút gọn (ví dụ: https://example.com/very-long-url)"
                        className="pl-10"
                        {...field}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            form.handleSubmit(handleSubmit)();
                          }
                        }}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="px-8"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? <Loader color="white" /> : "Rút gọn"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
