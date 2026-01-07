import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface VehiclePhotosViewerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const VehiclePhotosViewer: React.FC<VehiclePhotosViewerProps> = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.9 }}
                        className="relative max-w-4xl w-full"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-[#d89853] tracking-[0.2em]">
                                    车辆证据照片
                                </h2>
                                <p className="text-sm text-[#94a3b8] font-mono">
                                    VEHICLE EVIDENCE PHOTOS
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 text-[#94a3b8] hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Photos */}
                        <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0f1419] p-8 rounded-lg border border-[#d89853]/20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Maine Photo */}
                                <div className="polaroid-photo transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                                    <img
                                        src="/assets/car-maine-original.jpg"
                                        alt="Maine Vehicle Evidence"
                                        className="w-full h-auto"
                                    />
                                    <div className="polaroid-caption">
                                        Maine: 412-88B<br />C.K. & R.C.
                                    </div>
                                </div>

                                {/* New Mexico Photo */}
                                <div className="polaroid-photo transform rotate-2 hover:rotate-0 transition-transform duration-300">
                                    <img
                                        src="/assets/car-newmexico-original.jpg"
                                        alt="New Mexico Vehicle Evidence"
                                        className="w-full h-auto"
                                    />
                                    <div className="polaroid-caption">
                                        NEW MEXICO: [SMUDGE] F★<br />OCT 26 '78
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mt-4 bg-[#0f172a]/80 border border-[#334155] rounded-lg p-4">
                            <p className="text-xs text-[#94a3b8]">
                                嫌疑人旅行期间使用的车辆。<br />
                                左：缅因州，车牌 412-88B（C.K. & R.C.），1978年10月25日<br />
                                右：新墨西哥州，1978年10月26日
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
