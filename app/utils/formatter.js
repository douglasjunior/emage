
export const formatBytes = bytes => {
    let converted = parseFloat(bytes);
    if (converted < 1024) {
        return `${converted.toFixed(2)} bytes`;
    }
    converted /= 1024.0;
    if (converted < 1024) {
        return `${converted.toFixed(2)} KB`;
    }
    converted /= 1024.0;
    if (converted < 1024) {
        return `${converted.toFixed(2)} MB`;
    }
    converted /= 1024.0;
    return `${converted.toFixed(2)} GB`;
};

export default {};
