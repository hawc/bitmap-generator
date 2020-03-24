<template>
    <div v-if="controlData">
        <h2>Text styles</h2>
        <control v-for="(control, name, index) in controlData.textStyles"
                 :key="`textStyles${ index }`"
                 :control="control"
                 :name="name" />
        <h2>Background styles</h2>
        <control v-for="(control, name, index) in controlData.backgroundStyles"
                 :key="`backgroundStyles${ index }`"
                 :control="control"
                 :name="name"
                 @set-image="setImage" />
        <h2>Rendering styles</h2>
        <control v-for="(control, name, index) in controlData.renderingStyles"
                 :key="`renderingStyles${ index }`"
                 :control="control"
                 :name="name" />
        <div class="setting buttons">
            <button type="button"
                    class="button button--secondary"
                    @click="$emit('action', 'reset')">
                Randomize
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
import { controlData } from '~/static/controlData';
import control from '~/components/control';

export default {
    components: {
        control,
    },
    data() {
        return {
            controlData,
            textContent: 'Hi🖤',
            fontsize: this.getValue('textStyles', 'fontsize'),
            font: this.getValue('textStyles', 'font'),
            letterSpacing: 0,
            zoom: this.getValue('renderingStyles', 'zoom'),
            background: 'usePattern',
            pattern: this.getValue('backgroundStyles', 'pattern'),
            image: null,
            color: '#ff0000',
            blur: 0,
            outline: 0,
            blurColor: '#000000',
            backgroundColor: '#dedede',
            treshold: 129,
            dimensions: 1,
            yTranslate: 0,
            algorithm: this.getValue('renderingStyles', 'algorithm'),
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
    mounted() {
        this.$emit('change-settings', this.$data);
    },
    methods: {
        getValue(category, propertyName) {
            let returnValue;
            const property = controlData[category][propertyName];

            if (property.type === 'range') {
                returnValue = this.getRandom(property.min, property.max, property.step);
            } else if (property.type === 'select') {
                const random = this.getRandom(0, Object.keys(property.options).length - 1, 1);
                returnValue = Object.keys(property.options)[random];
            }

            return returnValue;
        },
        getRandom(min, max, interval = 1) {
            const r = Math.floor(Math.random() * (max - min + interval) / interval);

            return r * interval + min;
        },
        setImage(data) {
            this.image = data[0];
        },
    },
};
</script>

<style scoped lang="scss">
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
    .buttons {
        margin-top: 16px;
        justify-content: center;
    }
</style>
