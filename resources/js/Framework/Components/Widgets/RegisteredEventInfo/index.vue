<template>
    <div>
        <div class="row" v-if="data.event">
            <div class="col-md-8">
                <h3>
                    <span v-html="data.event.title"></span>
                    <p>
                        <small v-html="data.event.venue"></small>
                        <br />
                        <small
                            v-html="
                                data.event.eventDate +
                                    ' ' +
                                    data.event.eventTime
                            "
                        ></small>
                    </p>
                </h3>
            </div>
            <div class="col-md-4" v-if="data.event.paymentLink">
                <Button
                    tag="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    :href="data.event.paymentLink"
                    type="success"
                    block
                    icon="fa fa-money-bill-wave"
                >
                    Payment
                </Button>
            </div>
        </div>

        <table class="table table-hovered table-responsive-xl">
            <tr>
                <th>Member</th>
                <th>Company</th>
                <th class="text-right">Price</th>
            </tr>
            <tr v-for="(participant, i) in data.participants" :key="i">
                <td>
                    <p>
                        {{ participant.name }}
                        <br />
                        <small class="muted">{{ participant.email }}</small>
                    </p>
                </td>
                <td v-html="participant.companyName"></td>
                <td
                    class="text-right"
                    v-html="currency(participant.price)"
                ></td>
            </tr>
            <tr>
                <td colspan="2">Total</td>
                <td class="text-right" v-html="currency(data.totalPrice)"></td>
            </tr>
        </table>
    </div>
</template>

<script>
    import { currency } from '~/Framework/Helpers/String';

    import Button from '~/Framework/Plugins/Argon/Components/BaseButton';

    export default {
        name: 'RegisteredEventInfo',

        components: {
            Button,
        },

        props: ['data'],

        methods: {
            currency,
        },

        mounted() {},
    };
</script>
