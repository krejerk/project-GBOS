// Helper function to resolve asset paths correctly for both dev and production
export const getAssetPath = (path: string): string => {
    // Remove leading slash if present
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    // In production, BASE_URL will be '/project-GBOS/', in dev it will be '/'
    return import.meta.env.BASE_URL + cleanPath;
};
