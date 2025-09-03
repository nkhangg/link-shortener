import { genShortUrl } from "@/app/features/app";
import { supabase } from "@/lib/supabase";
import { useMutation } from "@tanstack/react-query";
import { Check, Copy, ExternalLink, Link, Trash2 } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";
import { ConfirmAlert } from "./btn/confirm-alert";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export interface IItemShortProps {
  data: IShortenedUrl;
  onDeleted?: () => void;
}

export default function ItemShort({ data, onDeleted }: IItemShortProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (shortUrl: string, id: string) => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
      toast.success("Đã sao chép!", {
        description: "Link rút gọn đã được sao chép vào clipboard",
      });
    } catch (err) {
      toast("Lỗi", {
        description: "Không thể sao chép link",
      });
    }
  };

  const delMutation = useMutation({
    mutationKey: ["del-links"],
    mutationFn: async ({ id }: { id: string }) => {
      const { data, error } = await supabase
        .from("links")
        .delete()
        .eq("id", id);

      return data;
    },
    onSuccess: () => {
      onDeleted?.();
    },
  });

  return (
    <Card
      key={data.id}
      className="hover:shadow-md transition-shadow max-w-full"
    >
      <CardContent className="p-6">
        <div className="space-y-3">
          {/* Short URL */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full">
                <Link className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0 max-w-[440px]">
                <p className="font-mono text-lg font-medium text-primary truncate">
                  {genShortUrl(data)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(genShortUrl(data), data.id)}
                className="flex items-center gap-2"
              >
                {copiedId === data.id ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                {copiedId === data.id ? "Đã sao chép" : "Sao chép"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`${genShortUrl(data)}`, "_blank")}
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Mở
              </Button>

              <ConfirmAlert
                description={`Link ${data.original_url} sẽ bị xóa. Bạn sẽ không thể truy cập bằng link rút gọn được nữa.`}
                onConfirm={() => delMutation.mutate({ id: data.id })}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="flex cursor-pointer items-center gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                  Xóa
                </Button>
              </ConfirmAlert>
            </div>
          </div>

          {/* Original URL */}
          <div className="pl-11">
            <p className="text-sm text-muted-foreground break-words whitespace-normal">
              <span className="font-medium">Gốc:</span> {data.original_url}
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between pl-11">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Tạo: {moment(data.created_at).format("DD/MM/YYYY")}</span>
              <Badge variant="secondary" className="text-xs">
                {data.clicks || 0} lượt click
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
