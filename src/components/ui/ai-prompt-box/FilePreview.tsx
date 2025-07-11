import React from "react";
import { motion } from "motion/react";
import { X } from "lucide-react";
import Image from "next/image";

import { Button } from "../button";

interface FilePreviewProps {
    files: File[];
    filePreviews: { [key: string]: string };
    onRemoveFile: (index: number) => void;
    onOpenImage: (imageUrl: string) => void;
    isVoiceMode: boolean;
}

export function FilePreview({ files, filePreviews, onRemoveFile, onOpenImage, isVoiceMode }: FilePreviewProps) {
    if (files.length === 0 || isVoiceMode) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap gap-3 p-2 pb-3 transition-all duration-300"
        >
            {files.map((file, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                >
                    {file.type.startsWith("image/") && filePreviews[file.name] && (
                        <div
                            className="w-16 h-16 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 border border-secondary/20 shadow-sm"
                            onClick={() => onOpenImage(filePreviews[file.name])}
                        >
                            <Image
                                src={filePreviews[file.name]}
                                alt={file.name}
                                className="w-full h-full object-cover"
                                width={64}
                                height={64}
                            />
                        </div>
                    )}
                    <Button
                        size="sm"
                        variant="ghost"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-md hover:bg-destructive/90"
                        onClick={() => onRemoveFile(index)}
                    >
                        <X className="h-3 w-3" />
                    </Button>
                </motion.div>
            ))}
        </motion.div>
    );
}
