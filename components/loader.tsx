import type { DetailedHTMLProps } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ILoaderProps extends DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    size?: string;
    showLabel?: boolean;
    color?: 'black' | 'white';
}

export default function Loader({ color = 'black', ...props }: ILoaderProps) {
    return (
        <div {...props} className={cn('flex items-center justify-center flex-col gap-4', props.className)}>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />

            {props.showLabel && <span>Đang tải...</span>}
        </div>
    );
}
