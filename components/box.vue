<template>
    <div class="box"
         :class="position === 'left' ? 'box--left' : 'box--right'">
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        position: {
            type: String,
            default: 'left',
        },
    },
};
</script>

<style scoped lang="scss">
    .box {
        position: absolute;
        top: 20px;
        width: 240px;
        padding: 20px;
        background: white;
        border-radius: 3px;
        box-shadow: 0 0 40px rgba(0,0,0,0.25);
        &--left {
            left: 20px;
        }
        &--right {
            right: 20px;
        }
    }
</style>
