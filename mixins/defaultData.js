const defaultData = {
    data() {
        return {
            textContent: 'Hi ✌️',
            fontsize: 3,
            font: 'Futura',
            letterSpacing: 0,
            zoom: 2,
            background: 'useColor',
            pattern: 1,
            image: null,
            color: '#ff0000',
            blur: 0,
            outline: 0,
            blurColor: '#000000',
            backgroundColor: '#dedede',
            treshold: 129,
            dimensions: 1,
            yTranslate: getRandom(-1, 1, 0.1),
            algorithm: 'atkinsons',
            // gameBoyMode: false,
        };
    },
};

function getRandom(min, max, interval = 1) {
    const r = Math.floor(Math.random() * (max - min + interval) / interval);
    return r * interval + min;
}

export { defaultData };
