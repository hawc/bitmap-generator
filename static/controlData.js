const controlData = {
    textStyles: {
        textContent: {
            title: 'Text',
            type: 'text',
        },
        font: {
            title: 'Font',
            type: 'select',
            options: {
                Futura: 'Futura',
                Garamond: 'Garamond',
                Verdana: 'Verdana',
                'Trebuchet MS': 'Trebuchet MS',
                'Arial Black': 'Arial Black',
                Impact: 'Impact',
                'Comic Sans MS': 'Comic Sans MS',
                Wingdings: 'Wingdings',
            },
        },
        color: {
            title: 'Color',
            type: 'color',
        },
        blur: {
            title: 'Blur',
            type: 'range',
            min: 1,
            max: 100,
            step: 0.1,
        },
        outline: {
            title: 'Outline',
            type: 'range',
            min: 1,
            max: 20,
            step: 0.1,
        },
        blurColor: {
            title: 'Blur Color',
            type: 'color',
        },
        fontsize: {
            title: 'Font Size',
            type: 'range',
            min: 1,
            max: 20,
            step: 0.1,
        },
        letterSpacing: {
            title: 'Letter Spacing',
            type: 'range',
            min: -2,
            max: 10,
            step: 0.1,
        },
        yTranslate: {
            title: 'Position',
            type: 'range',
            min: -1,
            max: 1,
            step: 0.01,
        },
    },
    backgroundStyles: {
        pattern: {
            title: 'Pattern',
            type: 'range',
            min: 1,
            max: 5,
            step: 1,
            binding: 'usePattern',
        },
        backgroundColor: {
            title: 'Background Color',
            type: 'color',
            binding: 'useColor',
        },
        image: {
            title: 'Background Image',
            type: 'file',
            binding: 'useImage',
        },
    },
    renderingStyles: {
        zoom: {
            title: 'Pixelation',
            type: 'range',
            min: 1,
            max: 8,
            step: 1,
        },
        treshold: {
            title: 'Treshold',
            type: 'range',
            min: 0,
            max: 255,
            step: 1,
        },
        algorithm: {
            title: 'Algorithm',
            type: 'select',
            options: {
                bayer: 'Bayer',
                floydsteinberg: 'Floyd-Steinberg',
                atkinsons: 'Atkinsons',
                none: '- no dithering -',
            },
        },
        dimensions: {
            title: 'Dimensions',
            type: 'select',
            options: {
                0: 'fullscreen',
                1: '10x15 cm',
                2: 'DIN A4',
            },
        },
    },
};

export { controlData };
