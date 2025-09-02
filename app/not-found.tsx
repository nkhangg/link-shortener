'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-md shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8 text-center">
                    {/* 404 Number */}
                    <div className="mb-6">
                        <h1 className="text-8xl font-bold text-cyan-500 mb-2">404</h1>
                        <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-amber-400 mx-auto rounded-full"></div>
                    </div>

                    {/* Error Message */}
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-slate-800 mb-3">Trang không tồn tại</h2>
                        <p className="text-slate-600 leading-relaxed">
                            Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Vui lòng kiểm tra lại URL hoặc quay về trang chủ.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Button asChild className="bg-cyan-500 hover:bg-cyan-600 text-white">
                            <Link href="/" className="flex items-center gap-2">
                                <Home className="w-4 h-4" />
                                Về trang chủ
                            </Link>
                        </Button>

                        <Button variant="outline" onClick={() => window.history.back()} className="border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Quay lại
                        </Button>
                    </div>

                    {/* Decorative Element */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <p className="text-sm text-slate-500">Hoặc bạn có thể tiếp tục sử dụng dịch vụ rút gọn link của chúng tôi</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
