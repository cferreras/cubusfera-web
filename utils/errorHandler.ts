export const handleError = (error: any) => {
    console.error('Error detectado:', error);
    throw error instanceof Error ? error : new Error(String(error));
};