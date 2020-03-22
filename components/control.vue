<template>
    <div class="setting">
        <label :for="name">
            <input v-if="hasBgRadio.indexOf(name) !== -1"
                   v-model="$parent.background"
                   :value="control.binding"
                   name="background"
                   type="radio">
            {{ control.title }}:
        </label>
        <input v-if="inputTypes.indexOf(control.type) !== -1"
               :id="name"
               v-model="$parent[name]"
               :type="control.type">
        <input v-if="control.type === rangeType"
               :id="name"
               v-model="$parent[name]"
               :type="control.type"
               :min="control.min"
               :max="control.max"
               :step="control.step">
        <input v-if="control.type === imageType"
               :id="name"
               @change="changeFileInput"
               :type="control.type">
        <select v-else-if="control.type === selectType"
                :id="name"
                v-model="$parent[name]">
            <option v-for="(key, option, index) in control.options"
                    :value="option"
                    :key="index">
                {{ key }}
            </option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
        },
        control: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            inputTypes: ['text', 'password', 'color'],
            rangeType: 'range',
            selectType: 'select',
            imageType: 'file',
            hasBgRadio: ['pattern', 'backgroundColor', 'image'],
        };
    },
    methods: {
        changeFileInput(event) {
            this.$emit('set-image', event.target.files);
        },
    },
};
</script>
<style scoped lang="scss">
    .setting {
        display: flex;
        flex-direction: row;
        font-size: 14px;
        &:not(:last-child) {
            margin-bottom: 10px;
        }
    }
    input[type="checkbox"] {
        width: 20px;
        margin: 0;
    }
    label {
        display: inline-block;
        width: 110px;
        padding-right: 10px;
        input[type="checkbox"] + span & {
            width: 80px;
        }
    }
    label + * {
        display: inline-block;
        width: calc(100% - 110px);
        margin: 0;
    }
</style>
