<template>
    <div>
        <nuxt />
    </div>
</template>

<style lang="scss">
    html {
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        -ms-text-size-adjust: 100%;
        -webkit-text-size-adjust: 100%;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;
    }

    body {
        overflow: hidden;
        background: #fefefe;
    }

    *,
    *:before,
    *:after {
        box-sizing: border-box;
        margin: 0;
    }

    .button {
        height: 25px;
        width: auto;
        appearance: none;
        color: #fff;
        background-color: #000;
        border: none;
        border-radius: 3px;
        transition: background-color 0.3s;
        &:not(:last-child) {
            margin-right: 7px;
        }
        &--primary {
            &:hover {
                background-color: #222;
            }
        }

        &--secondary {
            color: #000;
            background-color: #ddd;
            &:hover {
                background-color: #eee;
            }
        }
    }

</style>
