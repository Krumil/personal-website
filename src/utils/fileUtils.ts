// File handling utilities
export const isImageFile = (file: File): boolean => file.type.startsWith("image/");

export const validateFileSize = (file: File, maxSizeMB: number = 10): boolean => {
    return file.size <= maxSizeMB * 1024 * 1024;
};

export const processImageFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!isImageFile(file)) {
            reject(new Error("Only image files are allowed"));
            return;
        }

        if (!validateFileSize(file, 10)) {
            reject(new Error("File too large (max 10MB)"));
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            resolve(e.target?.result as string);
        };
        reader.onerror = () => {
            reject(new Error("Failed to read file"));
        };
        reader.readAsDataURL(file);
    });
};

export const getImageFilesFromItems = (items: DataTransferItemList): File[] => {
    const files: File[] = [];
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
            const file = items[i].getAsFile();
            if (file) {
                files.push(file);
            }
        }
    }
    return files;
};

export const getImageFilesFromFileList = (fileList: FileList): File[] => {
    return Array.from(fileList).filter(isImageFile);
};
