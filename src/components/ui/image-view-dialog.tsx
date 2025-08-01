import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import { Dialog, DialogContent, DialogTitle } from "./dialog";

// ImageViewDialog Component
interface ImageViewDialogProps {
    imageUrl: string | null;
    onClose: () => void;
}

export const ImageViewDialog: React.FC<ImageViewDialogProps> = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;

    return (
        <Dialog open={!!imageUrl} onOpenChange={onClose}>
            <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-[90vw] md:max-w-[800px]">
                <DialogTitle className="sr-only">Image Preview</DialogTitle>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="relative bg-card rounded-2xl overflow-hidden shadow-2xl"
                >
                    <Image
                        src={imageUrl}
                        alt="Full preview"
                        className="w-full max-h-[80vh] object-contain rounded-2xl"
                        width={1000}
                        height={1000}
                    />
                </motion.div>
            </DialogContent>
        </Dialog>
    );
};
