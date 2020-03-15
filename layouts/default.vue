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
        display: inline-block;
        border-radius: 4px;
        text-decoration: none;
        padding: 10px 30px;
    }

    .button--primary {
        border: 1px solid #000;
        color: #fff;
        &:hover {
            background-color: #111;
        }
    }

    .button--secondary {
        border: 1px solid #ddd;
        color: #fff;
        &:hover {
            background-color: #eee;
        }
    }
</style>
