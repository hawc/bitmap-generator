<template>
    <div id="app" class="container">
        <renderer :settings="settings"></renderer>
        <box :position="'left'">
            <h1 class="title">
                Bitmap Generator
            </h1>
            <h2>
                A dithering playground.
            </h2>
        </box>
        <box left>
            <description></description>
        </box>
        <box :position="'right'">
            <controls @change-settings="changeSettings"></controls>
        </box>
    </div>
</template>

<script>
    import description from '~/components/description';
    import renderer from '~/components/renderer';
    import controls from '~/components/controls';
    import box from '~/components/box';

    export default {
        components: {
            description,
            renderer,
            controls,
            box,
        },
        data() {
            return {
                settings: {},
            }
        },
        methods: {
            changeSettings(settings) {
                this.settings = settings;
            }
        }
    }
</script>

<style>
    .container {
        height: 100vh;
        width: 100vw;
        position: relative;
    }
</style>
