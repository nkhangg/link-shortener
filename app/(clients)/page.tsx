'use client';
import CreateShort from '@/components/create-short';
import ItemShort from '@/components/item-short';
import Loader from '@/components/loader';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Scissors } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { delay } from '../features/delay';

export default function URLShortener() {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const { data, error, isFetching, refetch } = useQuery({
        queryKey: ['links', currentPage], // cache theo từng page
        queryFn: async () => {
            await delay(400);

            const from = (currentPage - 1) * itemsPerPage;
            const to = from + itemsPerPage - 1;

            const { data, error, count } = await supabase
                .from('links')
                .select('*', { count: 'exact' }) // lấy cả tổng số record
                .order('created_at', { ascending: false }) // sắp xếp mới nhất trước
                .range(from, to);

            if (error) throw error;

            return { data, count };
        },
    });

    const totalPages = useMemo(() => {
        if (!data?.count) return 1; // ít nhất phải có 1 trang
        return Math.ceil(data.count / itemsPerPage);
    }, [data, itemsPerPage]);

    const goToPage = (page: number) => {
        setCurrentPage(page);
    };

    const goToPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const getPaginationItems = () => {
        const items = [];
        const maxVisiblePages = 5;

        if (totalPages <= maxVisiblePages) {
            // Nếu ít hơn hoặc bằng 5 trang, hiển thị tất cả
            for (let i = 1; i <= totalPages; i++) {
                items.push(i);
            }
        } else {
            // Logic phức tạp hơn cho nhiều trang
            if (currentPage <= 3) {
                // Đầu danh sách: 1, 2, 3, 4, ..., last
                items.push(1, 2, 3, 4, '...', totalPages);
            } else if (currentPage >= totalPages - 2) {
                // Cuối danh sách: 1, ..., last-3, last-2, last-1, last
                items.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                // Giữa danh sách: 1, ..., current-1, current, current+1, ..., last
                items.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
            }
        }

        return items;
    };

    useEffect(() => {
        console.log({ data: data?.data });
    }, [data?.data]);

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="border-b border-border bg-card/50">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                            <Scissors className="w-5 h-5 text-primary-foreground" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-foreground">LinkCut</h1>
                            <p className="text-sm text-muted-foreground">Rút gọn link cá nhân</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {/* URL Shortener Form */}
                <CreateShort onSubmitted={refetch} />
                {/* Shortened URLs List */}
                {!isFetching && (data?.data.length || 0) > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-foreground">Link đã rút gọn ({data?.count})</h2>
                            <div className="text-sm text-muted-foreground">
                                Trang {currentPage} / {totalPages}
                            </div>
                        </div>

                        <div className="grid gap-4">
                            {data?.data.map((item) => (
                                <ItemShort onDeleted={refetch} data={item} key={item?.id} />
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-6">
                                <Button variant="outline" size="sm" onClick={goToPrevious} disabled={currentPage === 1} className="flex items-center gap-2 bg-transparent">
                                    <ChevronLeft className="w-4 h-4" />
                                    Trước
                                </Button>

                                <div className="flex items-center gap-1">
                                    {getPaginationItems().map((item, index) => (
                                        <div key={index}>
                                            {item === '...' ? (
                                                <span className="px-3 py-2 text-muted-foreground">...</span>
                                            ) : (
                                                <Button
                                                    variant={currentPage === item ? 'default' : 'outline'}
                                                    size="sm"
                                                    onClick={() => goToPage(item as number)}
                                                    className="w-10 h-10"
                                                >
                                                    {item}
                                                </Button>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                <Button variant="outline" size="sm" onClick={goToNext} disabled={currentPage === totalPages} className="flex items-center gap-2 bg-transparent">
                                    Sau
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                )}

                {isFetching && <Loader />}

                {/* Empty State */}
                {data?.data?.length === 0 && (
                    <Card className="text-center py-12">
                        <CardContent>
                            <div className="flex flex-col items-center gap-4">
                                <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full">
                                    <Scissors className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-foreground mb-2">Chưa có link nào được rút gọn</h3>
                                    <p className="text-muted-foreground">Nhập URL ở trên để bắt đầu rút gọn link của bạn</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </main>

            {/* Footer */}
            <footer className="border-t border-border bg-card/50 mt-16">
                <div className="container mx-auto px-4 py-6">
                    <div className="text-center text-sm text-muted-foreground">
                        <p>© 2024 LinkCut - Công cụ rút gọn link cá nhân</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
