<template>
    <div id="app" class="container">
        <renderer>
        </renderer>
        <box left>
            <h1 class="title">
                bitmap-generator
            </h1>
        </box>
        <box left>
            <description></description>
        </box>
        <box right>
            <controls></controls>
        </box>
    </div>
</template>

<script>
    import logo from '~/components/logo.vue'
    import description from '~/components/description.vue'
    import renderer from '~/components/renderer.vue'
    import controls from '~/components/controls.vue'
    import box from '~/components/box.vue'

    export default {
        components: {
            logo,
            description,
            renderer,
            controls,
            box,
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
