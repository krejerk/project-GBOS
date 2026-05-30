
/**
 * Helper to determine the story chapter of a node or archive
 * based on the 9-chapter structure of Project GBOS.
 */
export const getNodeChapter = (id: string): number => {
    if (!id) return 0;

    if (id.includes('confession_')) {
        const numPart = id.split('_')[1];
        // Handle special IDs like 36A1, 36B1 by extracting just the numeric prefix
        const numMatch = numPart.match(/^\d+/);
        const num = numMatch ? parseInt(numMatch[0]) : 0;
        
        if (num <= 3) return 1;
        if (num <= 7) return 2;
        if (num <= 11) return 3;
        if (num <= 15) return 4;
        if (num <= 19) return 5;
        if (num <= 26) return 6;
        if (num <= 29) return 7;
        if (num <= 33) return 8;
        return 9;
    }
    
    // Archive/Clipping chapters mapping
    if (id.startsWith('clipping_')) {
        const numPart = id.split('_')[1];
        const numMatch = numPart.match(/^\d+/);
        const num = numMatch ? parseInt(numMatch[0]) : 0;

        if (num <= 4) return 1;
        if (num <= 7) return 2;
        if (num <= 10) return 3;
        if (num <= 13) return 4;
        if (num <= 16) return 5;
        // Chapter 6 has no clippings, but we map 17+ to 7+
        if (num <= 20) return 7;
        if (num <= 23) return 8;
        if (num <= 26) return 9;
    }

    // Legacy/Prefix-based mapping as fallback
    if (id.startsWith('me_') || id.startsWith('oh_') || id.startsWith('dc_') || id.startsWith('il_')) return 1;
    if (id.startsWith('va_') || id.startsWith('nv_')) return 2;
    if (id.startsWith('cin_') || id.startsWith('nas_') || id.startsWith('ky_')) return 3;
    if (id.startsWith('kan_') || id.startsWith('kc_') || id.startsWith('ia_')) return 4;
    if (id.startsWith('archive_') || id.startsWith('tx_')) return 5;
    if (id.startsWith('sf_')) return 7; 
    
    return 0; // Base nodes like 'capone'
};
