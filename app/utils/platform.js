import os from 'os';

/**
 * @typedef {Object} Platform
 * @property {string} arch
 * @property {string} platform
 */

/**
 * @param {Platform | Platform[]} args
 */
export const isOS = args => {
    if (Array.isArray(args)) {
        return Boolean(args.find(isOS));
    }
    if (args.platform && args.platform !== os.platform()) {
        return false;
    }
    if (args.arch && args.arch !== os.arch()) {
        return false;
    }
    return true;
};

export default {};
