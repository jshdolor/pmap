<template>
    <vSelect 
        :placeholder="placeholder"
        :options="options"
        :allow-empty="false"
        :loading="isLoading"
        :track-by="trackBy" 
        :label="label"
        :disabled="disabled"

        v-model="selectedOption"
        @select="select"
    ></vSelect>
</template>

<script>
import vSelect from 'vue-multiselect';

export default {
    name: 'AddressDivisionDropdown',

    components: {
        vSelect
    },

    data() {
        return {
            options: [],
            isLoading: false,
            selectedOption: null,
            endpoint: '/common/address',
            disabled: true
        }
    },

    props: {
        placeholder: {
            required: true,
            type: String
        },
        serviceCall: {
            required: true,
            type: Function
        },
        trackBy: {
            default: 'id'
        },
        label: {
            default: 'name'
        },
        type: {
            required: true,
            type: String
        },
        code: {
            default: false
        }

    },

    methods: {
        select(selectedOption, id) {
            this.$emit('selected', {
                type: this.type,
                id: selectedOption.id
            });
        },

        getOptions(code, selectedId) {
            this.isLoading = true;
            this.disabled = true;

            this.serviceCall(code).then(options => {
                
                this.options = options;

            }).finally(() => {

                if(selectedId) {
                    this.selectedOption = this.options.filter(option => option.id === selectedId);
                }

                this.isLoading = false;
                this.disabled = this.options.length === 0;
            })
        },

        reset() {
            this.options = [];
            this.selectedOption = null;
            this.disabled = true;
        }
    },


}
</script>