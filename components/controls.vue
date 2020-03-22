<template>
    <div v-if="controlData">
        <h2>Text styles</h2>
        <control v-for="(control, name, index) in controlData.textStyles"
                 :control="control"
                 :name="name"
                 :key="index" />
        <h2>Background styles</h2>
        <control v-for="(control, name, index) in controlData.backgroundStyles"
                 :control="control"
                 :name="name"
                 :key="index"
                 @set-image="setImage" />
        <h2>Rendering styles</h2>
        <control v-for="(control, name, index) in controlData.renderingStyles"
                 :control="control"
                 :name="name"
                 :key="index" />
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
            textContent: 'Hi ✌️',
            fontsize: this.getValue('textStyles', 'fontsize'),
            font: 'Futura',
            letterSpacing: 0,
            zoom: this.getValue('renderingStyles', 'zoom'),
            background: 'usePattern',
            pattern: this.getValue('backgroundStyles', 'pattern'),
            image: null,
            color: '#ff0000',
            blur: this.getValue('textStyles', 'blur'),
            outline: this.getValue('textStyles', 'outline'),
            blurColor: '#000000',
            backgroundColor: '#dedede',
            treshold: 129,
            dimensions: 1,
            yTranslate: this.getValue('textStyles', 'yTranslate'),
            algorithm: 'atkinsons',
        };
    },
    watch: {
        $data: {
            handler(settings) {
                console.log('set', settings);
                this.$emit('change-settings', settings);
            },
            deep: true,
        },
    },
    mounted() {
        this.$emit('change-settings', this.$data);
    },
    methods: {
        getValue(category, property) {
            return this.getRandom(controlData[category][property].min, controlData[category][property].max, controlData[category][property].step);
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
