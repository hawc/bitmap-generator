<template>
    <div class="box" :class="left || !right ? 'box--left' : 'box--right'">
        <slot></slot>
    </div>
</template>

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