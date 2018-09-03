import EventEmitter from 'events';
import path from 'path';
import fs from 'fs';
import imagemin from 'imagemin';

import imageminAdvpng from 'imagemin-advpng';
import imageminOptipng from 'imagemin-optipng';
import imageminPngcrush from 'imagemin-pngcrush';
import imageminPngout from 'imagemin-pngout';
import imageminZopfli from 'imagemin-zopfli';

import imageminJpegoptim from 'imagemin-jpegoptim';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminMozjpeg from 'imagemin-mozjpeg';

import imageminSvgo from 'imagemin-svgo';

import imageminGiflossy from 'imagemin-giflossy';
import imageminGifsicle from 'imagemin-gifsicle';

const engineJpg = algorithm => {
    switch (algorithm) {
        case 'jpegoptim':
            return imageminJpegoptim({
                progressive: true,
            });
        case 'jpegtran':
            return imageminJpegtran({
                progressive: true,
            });
        case 'mozjpeg':
            return imageminMozjpeg({
                quality: 90,
            });
        default:
            return null;
    }
};

const enginePng = algorithm => {
    switch (algorithm) {
        case 'advpng':
            return imageminAdvpng({
                optimizationLevel: 4,
            });
        case 'optipng':
            return imageminOptipng();
        case 'pngcrush':
            return imageminPngcrush({
                reduce: true,
            });
        case 'pngout':
            return imageminPngout();
        case 'zopfli':
            return imageminZopfli({
                transparent: true,
            });
        default:
            return null;
    }
};

const engineSvg = algorithm => {
    switch (algorithm) {
        case 'svgo':
            return imageminSvgo();
        default:
            return null;
    }
};

const engineGif = algorithm => {
    switch (algorithm) {
        case 'giflossy':
            return imageminGiflossy({
                interlaced: true,
                optimizationLevel: 3,
                optimize: 3,
            });
        case 'gifsicle':
            return imageminGifsicle({
                interlaced: true,
                optimizationLevel: 3,
            });
        default:
            return null;
    }
};

const getPlugin = (fileType, algorithm) => {
    if (/image\/jpg/.test(fileType) || /image\/jpeg/.test(fileType)) {
        return engineJpg(algorithm);
    }
    if (/image\/png/.test(fileType)) {
        return enginePng(algorithm);
    }
    if (/image\/svg/.test(fileType) || /image\/svg\+xml/.test(fileType)) {
        return engineSvg(algorithm);
    }
    if (/image\/gif/.test(fileType)) {
        return engineGif(algorithm);
    }
    return undefined;
};

class Process extends EventEmitter {

    constructor(file, algorithms) {
        super();
        this.file = file;
        this.originalSize = file.size;
        this.size = file.size;
        this.dir = path.resolve(file.path, '..');
        this.algorithms = algorithms;
        this.currentAlgorithm = null;
        this.finishedAlgorithms = [];
        this.finished = false;
        this.error = null;
        Promise.map(algorithms, this._createJob, { concurrency: 1 })
            .then(this._done)
            .catch(this._error)
            .finally(this._finish);
    }

    getFile = () => this.file;

    getSize = () => this.size;

    getOriginalSize = () => this.originalSize;

    getAlgorithms = () => [...this.algorithms];

    getCurrentAlgorithm = () => ({ ...this.currentAlgorithm });

    isFinished = () => this.finished;

    getError = () => this.error;

    getFinishedAlgorithms = () => [...this.finishedAlgorithms];

    getSave = () => 100 - ((this.size / this.originalSize) * 100);

    _createJob = async (algorithm, index, length) => {
        this.currentAlgorithm = { algorithm, index, length };
        this.emit('start', this.currentAlgorithm);
        const newSize = await this._compressImage(algorithm);
        if (this.size !== newSize) {
            this.finishedAlgorithms.push(algorithm);
        }
        this.size = newSize;
        this.emit('end', this.currentAlgorithm, this.size);
    }

    _compressImage = algorithm => {
        return imagemin([this.file.path], this.dir, {
            plugins: [
                getPlugin(this.file.type, algorithm),
            ],
        }).then(files => {
            return fs.statSync(files[0].path).size;
        });
    }

    _done = () => {
        this.emit('done', this.size);
    }

    _error = ex => {
        this.error = ex;
        this.emit('error', ex);
    }

    _finish = () => {
        this.finished = true;
        this.emit('finish');
    }

}

export default Process;
