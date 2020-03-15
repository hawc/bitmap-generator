<template>
    <div id="app"
         class="container">
        <renderer ref="renderer"
                  :settings="settings" />
        <box :class="{ 'hidden': hide }">
            <description />
        </box>
        <div class="hideWrapper">
            <input type="checkbox"
                   class="hide"
                   id="hide"
                   v-model="hide" />
        </div>
        <box :position="'right'"
             :class="{ 'hidden': hide }">
            <controls :key="controlsKey"
                      @change-settings="changeSettings"
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
            hide: false,
            settings: null,
            controlsKey: 0,
        };
    },
    methods: {
        changeSettings(settings) {
            this.settings = settings;
        },
        triggerAction(action) {
            if (action === 'reset') {
                this.controlsKey = this.controlsKey + 1;
            } else {
                this.$refs.renderer[action]();
            }
        },
    },
};
</script>

<style scoped lang="scss">
    .container {
        height: 100vh;
        width: 100vw;
        position: relative;
    }
    .hideWrapper {
        position: absolute;
        top: 40px;
        right: 40px;
        line-height: 0;
        z-index: 1;
        &::before {
            content: '';
            position: absolute;
            top: -4px;
            right: 0;
            height: 20px;
            width: 20px;
            pointer-events: none;
            background-size: 100%;
            background-image: url('data:image/svg+xml;charset=UTF-8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M569.354 231.631C512.97 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-102.556 0-192.091-54.701-240-136 44.157-74.933 123.677-127.27 216.162-135.007C273.958 131.078 280 144.83 280 160c0 30.928-25.072 56-56 56s-56-25.072-56-56l.001-.042C157.794 179.043 152 200.844 152 224c0 75.111 60.889 136 136 136s136-60.889 136-136c0-31.031-10.4-59.629-27.895-82.515C451.704 164.638 498.009 205.106 528 256c-47.908 81.299-137.444 136-240 136z"/></svg>');
        }
    }
    .hide {
        position: relative;
        opacity: 0;
        z-index: 1;
    }
    .hidden {
        opacity: 50%;
        box-shadow: none;
    }
</style>
