<template>
    <div>
        <h2>Text styles</h2>
        <div class="setting">
            <label for="text">Text:</label>
            <input id="text"
                   v-model="textContent"
                   type="text">
        </div>
        <div class="setting">
            <label for="font">Font:</label>
            <select id="font"
                    v-model="font">
                <option value="Futura">
                    Futura
                </option>
                <option value="Garamond">
                    Garamond
                </option>
                <option value="Verdana">
                    Verdana
                </option>
                <option value="Trebuchet MS">
                    Trebuchet MS
                </option>
                <option value="Arial Black">
                    Arial Black
                </option>
                <option value="Impact">
                    Impact
                </option>
                <option value="Comic Sans MS">
                    Comic Sans MS
                </option>
                <option value="Wingdings">
                    Wingdings
                </option>
            </select>
        </div>
        <div class="setting">
            <label for="color">Color:</label>
            <input id="color"
                   v-model="color"
                   type="color">
        </div>
        <div class="setting">
            <label for="blur">Blur:</label>
            <input id="blur"
                   v-model.number="blur"
                   type="range"
                   min="1"
                   max="100"
                   step=".1">
        </div>
        <div class="setting">
            <label for="blurColor">Blur color:</label>
            <input id="blurColor"
                   v-model="blurColor"
                   type="color">
        </div>
        <div class="setting">
            <label for="fontsize">Size:</label>
            <input id="fontsize"
                   v-model.number="fontsize"
                   type="range"
                   min="1"
                   max="20"
                   step=".1">
        </div>
        <div class="setting">
            <label for="yTranslate">Position:</label>
            <input id="yTranslate"
                   v-model.number="yTranslate"
                   type="range"
                   min="0"
                   max="2"
                   step=".01">
        </div>
        <h2>Background styles</h2>
        <div class="setting"
             :class="background === 'usePattern' ? '' : 'disabled'">
            <label for="pattern">
                <input
                    id="usePattern"
                    v-model="background"
                    name="background"
                    type="radio"
                    value="usePattern">
                <span>Pattern:</span>
            </label>
            <input
                id="pattern"
                v-model="pattern"
                type="range"
                min="1"
                max="5"
                step="1"
                :disabled="background !== 'usePattern'">
        </div>
        <div class="setting"
             :class="background === 'useColor' ? '' : 'disabled'">
            <label for="backgroundColor">
                <input id="useColor"
                       v-model="background"
                       name="background"
                       type="radio"
                       value="useColor">
                <span>Color:</span>
            </label>
            <input
                id="backgroundColor"
                v-model="backgroundColor"
                type="color"
                :disabled="background !== 'useColor'">
        </div>
        <div class="setting"
             :class="background === 'useImage' ? '' : 'disabled'">
            <label for="image">
                <input id="useImage"
                       v-model="background"
                       name="background"
                       type="radio"
                       value="useImage">
                <span>Image:</span>
            </label>
            <input
                id="image"
                ref="image"
                type="file"
                name="image"
                :disabled="background !== 'useImage'"
                @change="setImageData">
        </div>
        <h2>Rendering styles</h2>
        <div class="setting">
            <label for="zoom">Pixelation:</label>
            <input id="zoom"
                   v-model.number="zoom"
                   type="range"
                   min="1"
                   max="8"
                   step="1">
        </div>
        <div class="setting">
            <label for="treshold">Treshold:</label>
            <input id="treshold"
                   v-model.number="treshold"
                   type="range"
                   min="0"
                   max="255"
                   step="1">
        </div>
        <div class="setting">
            <label for="algorithm">Algorithm:</label>
            <select id="algorithm"
                    v-model="algorithm">
                <option value="bayer">
                    Bayer
                </option>
                <option value="floydsteinberg">
                    Floyd-Steinberg
                </option>
                <option value="atkinsons">
                    Atkinsons
                </option>
                <option value="none">
                    - no dithering -
                </option>
            </select>
        </div>
        <div class="setting">
            <label for="dimensions">Dimensions:</label>
            <select id="dimensions"
                    v-model="dimensions">
                <option value="0">
                    fullscreen
                </option>
                <option value="1">
                    10x15 cm
                </option>
                <option value="2">
                    DIN A4
                </option>
            </select>
        </div>
        <!--<div class="setting">
            <label for="gameBoyMode">GameBoyMode:</label>
            <input type="checkbox" id="gameBoyMode" v-model="gameBoyMode" />
        </div>-->
        <div class="setting buttons">
            <button type="button"
                    class="button button--secondary"
                    @click="$emit('action', 'reset')">
                Reset
            </button>
            <button type="button"
                    class="button button--primary"
                    @click="$emit('action', 'print')">
                Print
            </button>
            <button type="button"
                    class="button button--primary"
                    @click="$emit('action', 'download')">
                Download
            </button>
        </div>
    </div>
</template>

<script>
// import { defaultData } from '~/mixins/defaultData';

export default {
    // mixins:  [defaultData],
    data() {
        return {
            imageData: null,
            textContent: 'It works 😍',
            fontsize: 3,
            font: 'Futura',
            zoom: 2,
            background: 'useColor',
            pattern: 1,
            image: null,
            color: '#ff0000',
            blur: '0',
            blurColor: '#000',
            backgroundColor: '#dedede',
            treshold: 129,
            dimensions: 1,
            yTranslate: 1,
            algorithm: 'atkinsons',
            // gameBoyMode: false,
        };
    },
    watch: {
        $data: {
            handler(settings) {
                this.$emit('change-settings', settings);
            },
            deep: true,
        },
    },
    methods: {
        setImageData(value) {
            this.image = value;
            this.imageData = this.$refs.image.files[0];
        },
    },
    mounted() {
        this.$emit('change-settings', this.$data);
    },
};
</script>

<style scoped lang="scss">
    .setting {
        display: flex;
        flex-direction: row;
        font-size: 14px;
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
    h2 {
        margin: 0 0 10px;
        padding-bottom: 2px;
        font-size: 12px;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 1px;
        border-bottom: 1px solid #dedede;
        &:not(:first-child) {
            margin-top: 15px;
        }
    }
    input[type="checkbox"] {
        width: 20px;
        margin: 0;
    }
    label {
        display: inline-block;
        width: 110px;
        padding-right: 10px;
        input[type="checkbox"] + span & {
            width: 80px;
        }
    }
    label + * {
        display: inline-block;
        width: calc(100% - 110px);
        margin: 0;
    }
    .buttons {
        margin-top: 16px;
        justify-content: center;
    }
</style>
