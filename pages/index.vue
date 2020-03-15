<template>
    <div id="app"
         class="container">
        <renderer ref="renderer"
                  :settings="settings" />
        <box>
            <description />
        </box>
        <box :position="'right'">
            <controls @change-settings="changeSettings"
                      @action="triggerAction" />
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
            settings: null,
        };
    },
    methods: {
        changeSettings(settings) {
            this.settings = settings;
        },
        triggerAction(action) {
            this.$refs.renderer[action]();
        },
    },
};
</script>

<style>
    .container {
        height: 100vh;
        width: 100vw;
        position: relative;
    }
</style>
