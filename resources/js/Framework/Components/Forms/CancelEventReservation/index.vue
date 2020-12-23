<template>
    <form class="text-left">
        <Field v-model="reason" class="mt-2" required>
            <textarea v-model="reason" placeholder="Reason for Cancellation" class="form-control"></textarea>
        </Field>
        <Button type="white" block @click="submit" v-auth-required :disabled="isFormLoading">
            <span class="fa fa-spin fa-spinner" v-show="isFormLoading"></span>
            Cancel Reservation
        </Button>
    </form>
</template>

<script>
import Field from "~/Framework/Plugins/Argon/Components/BaseInput";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";

import CancelReservationRequest from "~/Application/Services/V2/Event/Requests/CancelReservationRequest";
import EventReservationService from "~/Application/Services/V2/Event/Reservation";

import { propertyValue } from "~/Framework/Helpers";

export default {
    name: "CancelEventReservationForm",

    components: {
        Field,
        Button
    },

    data() {
        return {
            reason: "",
            isFormLoading: false
        };
    },

    props: {
        code: {
            required: true
        }
    },

    methods: {
        submit() {
            const request = new CancelReservationRequest({
                reason: this.reason,
                code: this.code
            });

            this.isFormLoading = true;
            
            EventReservationService.cancelReservation(request)
                .then(response => {

                    if (response.getErrorMessages) {
                        if (
                            propertyValue(
                                response,
                                "exception.response.status", 0
                            ) === 400
                        ) {
                            const message = propertyValue(
                                response,
                                "exception.response.data.error.message",
                                "Please check your data"
                            );
                            this.$toasted.error(message, { duration: 4000 });
                            return;
                        }

                        const errorMessages = Object.values(
                            response.getErrorMessages()
                        );
                        errorMessages.forEach(message =>
                            this.$toasted.error(message, { duration: 4000 })
                        );

                        return;
                    }

                    this.$root.$emit("reload-page");
                    
                })
                .finally(() => {
                    this.isFormLoading = false;
                    this.reason = "";
                });
        }
    }
};
</script>