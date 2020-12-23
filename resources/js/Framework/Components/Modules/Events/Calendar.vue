<template>
    <DatePicker :config="dateConfig" class="form-control  datepicker" :value="dates.range"></DatePicker>
</template>

<script>
import DatePicker from "vue-flatpickr-component";

export default {
    name: "EventCalendar",
    components: {
        DatePicker
    },

    props: {
        eventDate: {
            required: true
        }
    },

    data() {
        return {
            dateConfig: {
                inline: true,
                allowInput: false,
                mode: "single"
            },
            dates: {
                range: new Date(this.eventDate)
            }
        };
    },

    watch: {
        eventDate: {
            immediate: true,
            handler(newVal) {
                this.dates.range = new Date(newVal)
            }
        }
    },
  
};
</script>