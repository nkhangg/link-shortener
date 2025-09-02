import { supabase } from '@/lib/supabase';
import { notFound, redirect } from 'next/navigation';

export interface IShortProps {
    params: Promise<{ id: string }>;
}

const getData = async (id: string) => {
    // Lấy original_url
    const { data, error } = await supabase.from('links').select('original_url, clicks').eq('id', id).single();

    if (error || !data) {
        notFound();
    }

    // Tăng clicks lên 1
    const { error: updateError } = await supabase
        .from('links')
        .update({ clicks: (data.clicks ?? 0) + 1 })
        .eq('id', id);

    if (updateError) {
        console.error('Update clicks failed:', updateError.message);
    }

    return data;
};

export default async function Short({ params }: IShortProps) {
    const { id } = await params;

    const data = await getData(id);

    redirect(data.original_url);
}
