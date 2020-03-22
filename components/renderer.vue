<template>
    <div>
        <canvas ref="canvas" />
        <img ref="targetimg"
             src
             alt="">
        <svg ref="svg1" />
        <img v-if="settings"
             ref="backgroundImage"
             :src="backgroundImageData[settings.pattern]"
             class="backgroundImage">
        <a ref="downloadButton"
           hidden
           href="#"
           download="image.png">Download</a>
    </div>
</template>

<script>
import { algorithms } from '~/mixins/algorithms';
import { backgroundImageData } from '~/static/backgroundImageData';

export default {
    mixins: [algorithms],
    props: {
        settings: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            backgroundImageData,
            fontbase: 16,
            generationDisabled: false,
            canvasWidth: this.settings && this.settings.canvasWidth ? this.settings.canvasWidth : 1,
            canvasHeight: this.settings && this.settings.canvasHeight ? this.settings.canvasHeight : 1,
        };
    },
    computed: {
        letterSpacingPx() {
            return `${ this.settings.letterSpacing * this.settings.fontsize }px`;
        },
    },
    watch: {
        settings: {
            handler() {
                this.fireChange();
            },
            deep: true,
        },
    },
    mounted() {
        if (this.settings) {
            this.resizeCanvas();
            window.addEventListener('resize', () => {
                this.resizeCanvas();
            });
        }
    },
    methods: {
        getCanvasWidth(dimensions) {
            switch (JSON.parse(dimensions)) {
            case 1:
                return this.getPxFromCm(15);
            case 2:
                return this.getPxFromCm(21);
            case 0:
            default:
                return window.innerWidth;
            }
        },
        getCanvasHeight(dimensions) {
            switch (JSON.parse(dimensions)) {
            case 1:
                return this.getPxFromCm(10);
            case 2:
                return this.getPxFromCm(29.7);
            case 0:
            default:
                return window.innerHeight;
            }
        },
        getCanvasCenter(horizontal = true) {
            const dimension = horizontal ? this.canvasWidth : this.canvasHeight;
            return dimension / window.devicePixelRatio / 2;
        },
        getPxFromCm(cm) {
            return (cm / 2.54) * 96;
        },
        prepareCanvas(settings) {
            this.$refs.canvas.style.letterSpacing = this.letterSpacingPx;
            const ctx = this.$refs.canvas.getContext('2d');
            const matrix = this.$refs.svg1.createSVGMatrix();
            ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            const x = this.getCanvasCenter(true);
            const y = this.getCanvasCenter(false);

            switch (settings.background) {
            case 'usePattern':
                if (settings.pattern) {
                    const texture = this.$refs.backgroundImage;
                    const pFill = ctx.createPattern(texture, 'repeat');
                    pFill.setTransform(matrix.scale(1 / settings.zoom));
                    ctx.fillStyle = pFill;
                    ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
                    this.finalizeBitmap(settings, ctx, x, y);
                }
                break;
            case 'useImage':
                if (settings.image) {
                    const reader = new FileReader();
                    reader.onload = event => {
                        const img = new Image();
                        img.onload = () => {
                            ctx.drawImage(img,
                                          x - (this.normalizeZoom(this.canvasWidth) / 2),
                                          y - (this.normalizeZoom(this.canvasWidth) * img.height / img.width) / 2,
                                          this.normalizeZoom(this.canvasWidth),
                                          this.normalizeZoom(this.canvasWidth) * img.height / img.width);
                            this.finalizeBitmap(settings, ctx, x, y);
                        };
                        img.src = event.target.result;
                    };
                    if (['image/jpeg', 'image/png', 'image/gif'].includes(settings.image.type)) {
                        reader.readAsDataURL(settings.image);
                        break;
                    }
                }
            // break omitted
            case 'useColor':
            default:
                ctx.fillStyle = settings.backgroundColor;
                ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
                this.finalizeBitmap(settings, ctx, x, y);
            }
        },
        normalizeZoom(value) {
            return value / this.settings.zoom / window.devicePixelRatio;
        },
        finalizeBitmap(settings, ctx, x, y) {
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = settings.color;
            const fontSize = this.normalizeZoom(this.fontbase * settings.fontsize);
            ctx.font = `${ fontSize }px ${ settings.font }, Georgia`;
            ctx.shadowColor = settings.blurColor;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = this.normalizeZoom(settings.blur);
            if (settings.outline) {
                ctx.strokeStyle = settings.blurColor;
                ctx.lineWidth = this.normalizeZoom(settings.outline);
                ctx.strokeText(settings.textContent, x, y * settings.yTranslate);
            }
            ctx.fillText(settings.textContent, x, y * settings.yTranslate);
            const ditheredImage = this.monochrome(ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight), settings.treshold, settings.algorithm);
            createImageBitmap(ditheredImage).then(ditheredImageBmp => {
                ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
                ctx.drawImage(ditheredImageBmp, (-x * settings.zoom) + x, (-y * settings.zoom) + y, this.canvasWidth / window.devicePixelRatio * settings.zoom, this.canvasHeight / window.devicePixelRatio * settings.zoom);
                this.generationDisabled = false;
            });
        },
        fireChange() {
            if (!this.generationDisabled && this.settings) {
                this.generationDisabled = true;
                setTimeout(() => {
                    this.resizeCanvas();
                    this.prepareCanvas(this.settings);
                }, 50);
            }
        },
        resizeCanvas() {
            this.canvasWidth = Math.round(this.getCanvasWidth(this.settings.dimensions));
            this.canvasHeight = Math.round(this.getCanvasHeight(this.settings.dimensions));
            this.$refs.canvas.setAttribute('width', this.canvasWidth);
            this.$refs.canvas.setAttribute('height', this.canvasHeight);
            const ctx = this.$refs.canvas.getContext('2d');
            // Normalize coordinate system to use css pixels.
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
            ctx.imageSmoothingEnabled = false;
            ctx.mozImageSmoothingEnabled = false;
            ctx.webkitImageSmoothingEnabled = false;
            ctx.msImageSmoothingEnabled = false;
            this.fireChange();
        },
        download() {
            const image = this.$refs.canvas.toDataURL('image/png');
            this.$refs.downloadButton.setAttribute('href', image);
            this.$refs.downloadButton.click();
        },
        print() {
            const dataUrl = this.$refs.canvas.toDataURL();
            const printWindow = window.open('', '', `width=${ this.canvasWidth },height=${ this.canvasHeight }`);
            const windowContent = `<!DOCTYPE html>
                                     <html>
                                         <head><title>Print canvas</title></head>
                                         <body style="margin:0;"><img src="${ dataUrl }" alt=""></body>
                                     </html>`;
            printWindow.document.open();
            printWindow.document.write(windowContent);
            printWindow.document.querySelector('img').addEventListener('load', () => {
                printWindow.focus();
                printWindow.print();
                printWindow.close();
            });
            printWindow.document.close();
        },
    },
};
</script>

<style scoped lang="scss">
    canvas {
        position: absolute;
        top: 50%;
        left: 50%;
        display: block;
        box-shadow: 0 0 40px rgba(0, 0, 0, 0.25);
        transform: translate(-50%, -50%);
        font-smooth: never;
        -webkit-font-smoothing: none;
        image-rendering: optimizeSpeed;
        image-rendering: -moz-crisp-edges;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: optimize-contrast;
        image-rendering: pixelated;
        -ms-interpolation-mode: nearest-neighbor;
    }
    .backgroundImage {
        display: none;
    }
</style>
