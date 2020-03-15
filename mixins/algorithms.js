// dithering algorithms from https://github.com/meemoo/meemooapp/blob/master/src/nodes/image-monochrome-worker.js
const algorithms = {
    data: {
        bayerThresholdMap: [
            [15, 135, 45, 165],
            [195, 75, 225, 105],
            [60, 180, 30, 150],
            [240, 120, 210, 90]
        ],
        lumR: [],
        lumG: [],
        lumB: [],
        col1: [162, 185, 61],
        col2: [26, 54, 20],
    },
    methods: {
        monochrome(imageData, threshold, type) {
            let imageDataLength = imageData.data.length;
            let newPixel, err;

            // Greyscale luminance (sets r pixels to luminance of rgb)
            for (var i = 0; i <= imageDataLength; i += 4) {
                imageData.data[i] = Math.floor(this.lumR[imageData.data[i]] + this.lumG[imageData.data[i + 1]] + this.lumB[imageData.data[i + 2]]);
            }
            let w = imageData.width;
            //return imageData;//test
            switch (type) {
                case 'bayer':
                    imageData = this.bayer(imageData, imageDataLength, threshold, w, newPixel, err);
                    break;
                case 'floydsteinberg':
                    imageData = this.floydsteinberg(imageData, imageDataLength, threshold, w, newPixel, err);
                    break;
                case 'none':
                    imageData = this.noDithering(imageData, imageDataLength, threshold, w, newPixel, err);
                    break;
                case 'atkinsons':
                default:
                    imageData = this.atkinsons(imageData, imageDataLength, threshold, w, newPixel, err);
            }

            return imageData;
        },
        bayer(imageData, imageDataLength, threshold, w) {
            // 4x4 Bayer ordered dithering algorithm
            let lightPixel;
            for (var currentPixel = 0; currentPixel <= imageDataLength; currentPixel += 4) {
                var x = currentPixel / 4 % w;
                var y = Math.floor(currentPixel / 4 / w);
                var map = Math.floor((imageData.data[currentPixel] + this.bayerThresholdMap[x % 4][y % 4]) / 2);
                lightPixel = (map < threshold);
                imageData.data[currentPixel] = lightPixel ? 0 : 255;
                imageData = this.equalizeColors(imageData, currentPixel, lightPixel);
            }
            return imageData;
        },
        floydsteinberg(imageData, imageDataLength, threshold, w, newPixel, err) {
            // Floyd–Steinberg dithering algorithm
            let lightPixel;
            for (var currentPixel = 0; currentPixel <= imageDataLength; currentPixel += 4) {
                lightPixel = imageData.data[currentPixel] < threshold;
                newPixel = lightPixel ? 0 : 255;
                err = Math.floor((imageData.data[currentPixel] - newPixel) / 16);
                imageData.data[currentPixel] = newPixel;

                imageData.data[currentPixel + 4] += err * 7;
                imageData.data[currentPixel + 4 * w - 4] += err * 3;
                imageData.data[currentPixel + 4 * w] += err * 5;
                imageData.data[currentPixel + 4 * w + 4] += err * 1;
                imageData = this.equalizeColors(imageData, currentPixel, lightPixel);
            }
            return imageData;
        },
        atkinsons(imageData, imageDataLength, threshold, w, newPixel, err) {
            // Bill Atkinson's dithering algorithm
            let lightPixel;
            for (var currentPixel = 0; currentPixel <= imageDataLength; currentPixel += 4) {
                lightPixel = imageData.data[currentPixel] < threshold;
                newPixel = lightPixel ? 0 : 255;
                err = Math.floor((imageData.data[currentPixel] - newPixel) / 8);
                imageData.data[currentPixel] = newPixel;

                imageData.data[currentPixel + 4] += err;
                imageData.data[currentPixel + 8] += err;
                imageData.data[currentPixel + 4 * w - 4] += err;
                imageData.data[currentPixel + 4 * w] += err;
                imageData.data[currentPixel + 4 * w + 4] += err;
                imageData.data[currentPixel + 8 * w] += err;
                imageData = this.equalizeColors(imageData, currentPixel, lightPixel);
            }
            return imageData;
        },
        noDithering(imageData, imageDataLength, threshold) {
            for (var currentPixel = 0; currentPixel <= imageDataLength; currentPixel += 4) {
                imageData.data[currentPixel] = imageData.data[currentPixel] < threshold ? 0 : 255;
                imageData = this.equalizeColors(imageData, currentPixel);
            }
            return imageData;
        },
        equalizeColors(imageData, currentPixel, lightPixel) {
            if (this.gameBoyMode) {
                if (!lightPixel) {
                    imageData.data[currentPixel] = this.col1[0];
                    imageData.data[currentPixel + 1] = this.col1[1];
                    imageData.data[currentPixel + 2] = this.col1[2];
                } else {
                    imageData.data[currentPixel] = this.col2[0];
                    imageData.data[currentPixel + 1] = this.col2[1];
                    imageData.data[currentPixel + 2] = this.col2[2];
                }
            } else {
                imageData.data[currentPixel + 1] = imageData.data[currentPixel + 2] = imageData.data[currentPixel];
            }
            return imageData;
        },
    }
}

export { algorithms as default };