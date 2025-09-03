import type { DetailedHTMLProps } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ILoaderProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  size?: "sm" | "md" | "lg" | "xl" | number; // thêm number để tùy chỉnh trực tiếp
  showLabel?: boolean;
  color?: "black" | "white";
}

export default function Loader({
  size = "sm",
  color = "black",
  showLabel = false,
  ...props
}: ILoaderProps) {
  const sizeClasses =
    typeof size === "string"
      ? {
          sm: "w-4 h-4",
          md: "w-6 h-6",
          lg: "w-8 h-8",
          xl: "w-10 h-10",
        }[size]
      : `w-[${size}px] h-[${size}px]`;

  const colorClasses = color === "white" ? "text-white" : "text-black";

  return (
    <div
      {...props}
      className={cn(
        "flex items-center justify-center flex-col gap-4",
        props.className
      )}
    >
      <Loader2 className={cn("animate-spin", sizeClasses, colorClasses)} />
      {showLabel && <span className={colorClasses}>Đang tải...</span>}
    </div>
  );
}
