<template>
    <form v-if="showForm" id="profile-form" @submit.prevent="submit" novalidate>
        <div class="text-center lead text-warning" v-if="prices.isEarlyBird">
            <i class="fa fa-award"></i>Early Bird Promo
        </div>

        <div class="row">
            <div class="col-md-6">
                <vInput
                    label="Name"
                    placeholder="Name"
                    class="mb-3"
                    v-model.trim="form.name"
                    required
                    :readonly="isPMAPMember"
                    :error="propertyValue(isValid, 'name.message', false) || getParticipantError( 0, 'name')"
                />

                <vInput
                    label="Email Address"
                    placeholder="Email Address"
                    class="mb-3"
                    v-model.trim="form.email"
                    required
                    :readonly="isPMAPMember"
                    :error="propertyValue(isValid, 'email.message', false) || getParticipantError( 0, 'email')"
                />

                <vInput
                    label="Contact Number"
                    placeholder="Contact Number (e.g. 09123456789)"
                    class="mb-3"
                    v-model.trim="form.contactNumber"
                    required
                    :readonly="isPMAPMember"
                    :error="propertyValue(isValid, 'contactNumber.message', false) || getParticipantError( 0, 'contact_number')"
                />
            </div>
            <div class="col-md-6">
                <vInput
                    class="mb-3"
                    required
                    :error="propertyValue(isValid, 'company.message', false) || getParticipantError( 0, 'company_name')"
                    placeholder="Company Name"
                >
                    <label>Company Name</label>
                    <span class="label-required">*</span>
                    <input
                        class="form-control"
                        placeholder="Company Name"
                        v-model="form.company"
                        :readonly="companyDetailsReadOnly"
                    />
                </vInput>

                <vInput
                    class="mb-3"
                    label="TIN of Company"
                    required
                    :readonly="companyDetailsReadOnly"
                    v-model.trim="form.company_tin"
                    :error="propertyValue(isValid, 'company_tin.message', false) || getParticipantError( 0, 'company_tin')"
                    placeholder="Tin of Company (e.g. 800000000008)"
                />

                <vInput
                    class="mb-3"
                    required
                    label="Company Address"
                    v-model.trim="form.company_address"
                    :readonly="companyDetailsReadOnly"
                    :error="propertyValue(isValid, 'company_address.message', false) || getParticipantError( 0, 'company_address')"
                    placeholder="Company Address"
                />
            </div>
        </div>

        <Button @click="addParticipant">Add Participant</Button>

        <!-- participants -->
        <div class="row pt-3" :key="i" v-for="(participant,i) in $v.participants.$each.$iter">
            <hr />
            <div class="col-lg-12">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="row">
                            <div class="col-lg-12">
                                <b>Partipant #{{parseInt(i)+2}}</b>
                            </div>
                            <div class="col-lg-12" v-if="companyDetailsReadOnly">
                                <div class="form-group form-inline">
                                    <label>
                                        PMAP Member?
                                        <vSwitch
                                            @input="value => changeMemberType(value, i)"
                                            v-model="participant.isMember.$model"
                                            class="ml-2"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6 text-right">
                        <Button type="danger" @click="removeParticipant(i)">Remove</Button>
                    </div>
                </div>
            </div>

            <div class="col-lg-6">
                <vInput
                    label="Name"
                    placeholder="Name"
                    class="mb-3"
                    v-if="participant.isMember.$model"
                    required
                    :error="getErrorMessage(participant.name, 'Name') || getParticipantError( parseInt(i+1), 'name')"
                >
                    <vSelect
                        label="fullName"
                        track-by="fullName"
                        placeholder="Search Member"
                        :loading="participant.isSearching.$model"
                        v-model.trim="participant.searchData.$model"
                        :options="participant.memberList.$model "
                        @select="(selectedOption) => { populateParticipantField(selectedOption, i) }"
                        @search-change="value => searchParticipant(value, i)"
                    ></vSelect>
                </vInput>

                <vInput
                    label="Name"
                    placeholder="Name"
                    class="mb-3"
                    v-if="!participant.isMember.$model"
                    v-model.trim="participant.name.$model"
                    :error="getErrorMessage(participant.name, 'Name') || getParticipantError( parseInt(i+1), 'name')"
                    required
                />

                <vInput
                    label="Email Address"
                    placeholder="Email Address"
                    class="mb-3"
                    v-model.trim="participant.email.$model"
                    :error="getErrorMessage(participant.email, 'Email')  || getParticipantError( parseInt(i+1), 'email')"
                    required
                    :readonly="participants[i].isMember"
                />

                <vInput
                    label="Contact Number"
                    placeholder="Contact Number (e.g. 09123456789)"
                    class="mb-3"
                    v-model.trim="participant.contactNumber.$model"
                    :error="getErrorMessage(participant.contactNumber, 'Contact Number') || getParticipantError( parseInt(i+1), 'contact_number')"
                    required
                    :readonly="participants[i].isMember"
                />
            </div>
            <div class="col-lg-6">
                <vInput
                    class="mb-3"
                    required
                    :error="getErrorMessage(participant.company, 'Company') || getParticipantError( parseInt(i+1), 'company_name')"
                >
                    <label>Company Name</label>
                    <span class="label-required">*</span>
                    <input
                        class="form-control"
                        placeholder="Company Name"
                        v-model="participant.company.$model"
                        :readonly="participants[i].isMember"
                    />
                </vInput>

                <vInput
                    class="mb-3"
                    label="TIN of Company"
                    required
                    :readonly="participants[i].isMember"
                    v-model.trim="participant.company_tin.$model"
                    :error="getErrorMessage(participant.company_tin, 'Company Tin') || getParticipantError( parseInt(i+1), 'company_tin')"
                    placeholder="Tin of Company (e.g. 800000000008)"
                />

                <vInput
                    class="mb-3"
                    required
                    label="Company Address"
                    v-model.trim="participant.company_address.$model"
                    :error="getErrorMessage(participant.company_address, 'Company Address') || getParticipantError( parseInt(i+1), 'company_address')"
                    placeholder="Company Address"
                    :readonly="participants[i].isMember"
                />
            </div>
        </div>

        <div class="text-center">
            <Button type="primary" native-type="submit" class="my-4" :disabled="isFormLoading">
                <span class="fa fa-spin fa-spinner" v-show="isFormLoading"></span>
                Submit
            </Button>
            <Button type="info" outline class="my-4" @click="getSummary">See Summary</Button>
        </div>

        <RegisteredEventInfo ref="summaryTable" :data="summaryData" v-show="false" />
    </form>
</template>

<script>
import vInput from "~/Framework/Plugins/Argon/Components/BaseInput";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";
import Dropdown from "~/Framework/Plugins/Argon/Components/BaseDropdown";
import vSwitch from "~/Framework/Plugins/Argon/Components/BaseSwitch";
import RegisteredEventInfo from "~/Framework/Components/Widgets/RegisteredEventInfo";

import UserRegEventModel from "~/Application/Models/Event/UserEvent";

import ReservationRequest from "~/Application/Services/V2/Event/Requests/ReservationRequest";
import V2EventsService from "~/Application/Services/V2/Event/Reservation";
import UserService from "~/Application/Services/V2/User";

import EventsService from "~/Application/Services/Events";

import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { validate } from "~/Framework/Helpers/Validation";

import CookieManager from "~/Infrastructure/Cookies";
import ProfileModel from "~/Application/Models/Profile";
import EventReservationModel from "~/Application/Models/EventReservation";

import CompanyService from "~/Application/Services/Entities/Company";

import {
    propertyValue,
    each,
    cleanSource,
    lodashGet
} from "~/Framework/Helpers";

import { BFormDatalist } from "bootstrap-vue";
import vSelect from "vue-multiselect";

import { currency } from "~/Framework/Helpers/String";

export default {
    name: "ProfileForm",

    components: {
        Button,
        vInput,
        Dropdown,
        BFormDatalist,
        vSwitch,
        vSelect,
        RegisteredEventInfo
    },

    mixins: [validationMixin],

    validations: {
        form: {
            name: {
                required
            },
            email: {
                required,
                email
            },
            contactNumber: {
                required
            },
            company: {
                required
            },
            company_tin: {},
            company_address: {
                required
            }
        },
        participants: {
            required,
            $each: {
                name: {
                    required
                },
                email: {
                    required,
                    email
                },
                contactNumber: {
                    required
                },
                company: {
                    required
                },
                company_tin: {},
                company_address: {
                    required
                },
                memberList: {},
                isMember: {},
                searchData: {},
                isSearching: {}
            }
        }
    },

    data() {
        return {
            form: {
                name: "",
                email: "",
                contactNumber: "",
                company: "",
                company_address: "",
                company_tin: "",
                isMember: this.isMember,
                price: 0,
                company_others: !this.isMember
            },
            participants: [],
            companies: [],
            searchDebounceTimer: null,
            apiErrors: {},
            isFormLoading: false,
            companyOthers: ""
        };
    },

    methods: {
        otherCompanyToggle(i) {
            this.participants[i].company_others = !this.participants[i]
                .company_others;
            this.participants[i].company = "";
        },

        getParticipantError(index, property) {
            return lodashGet(
                this.apiErrors,
                `participants.${index}.${property}`,
                ""
            );
        },
        propertyValue,
        currency,
        addParticipant() {
            this.participants.push({
                name: "",
                email: "",
                contactNumber: "",
                isMember: false,
                company: "",
                company_tin: "",
                company_address: "",
                price: this.prices.nonMemberPrice,
                memberList: [],
                user_id: "",
                company_others: !this.isMember,
                searchData: {},
                isSearching: false
            });
        },
        removeParticipant(index) {
            this.participants.splice(index, 1);
        },

        getErrorMessage(vProp, name) {
            if (vProp.$dirty && vProp.$error) {
                if (!vProp.required) {
                    return `${name} is Required.`;
                }

                if (!vProp.email) {
                    return `${name} is not a valid Email Address.`;
                }
            }
            return "";
        },

        changeMemberType(value, i) {
            const participant = this.participants[i];

            this.participants[i].price = participant.isMember
                ? this.prices.memberPrice
                : this.prices.nonMemberPrice;

            this.participants[i].name = "";
            this.participants[i].email = "";
            this.participants[i].contactNumber = "";
            this.participants[i].company = "";
            this.participants[i].company_tin = "";
            this.participants[i].company_address = "";
            this.participants[i].memberList = [];
            this.participants[i].searchData = {};

            this.participants[i].user_id = "";
        },

        searchParticipant(value, i) {
            if (value.length < 3) {
                return true;
            }

            if (this.searchDebounceTimer) {
                clearTimeout(this.searchDebounceTimer);
            }

            this.searchDebounceTimer = setTimeout(() => {
                this.participants[i].isSearching = true;
                UserService.memberSearch(value)
                    .then(data => {
                        this.participants[i].memberList = data;
                    })
                    .finally(() => (this.participants[i].isSearching = false));
            }, 1000);
        },

        populateParticipantField(
            {
                contactNumber,
                email,
                company,
                companyTin = "",
                companyAddress = "",
                id = "",
                fullName = ""
            },
            i
        ) {
            this.participants[i].name = fullName;
            this.participants[i].email = email;
            this.participants[i].contactNumber = contactNumber;

            this.participants[i].company = this.form.company;
            this.participants[i].company_tin = this.form.company_tin;
            this.participants[i].company_address = this.form.company_address;

            this.participants[i].user_id = id;
        },

        reset() {
            this.form.name = "";
            this.form.company_address = "";
            this.form.contactNumber = "";
            this.form.email = "";
            this.form.company = "";
            this.form.company_tin = "";
            this.form.company_others = !this.isMember;

            if (this.isLoggedIn) {
                for (let formName in this.form) {
                    this.form[formName] = this.profile[formName];
                }
            }

            this.participants = [];
            this.apiErrors = {};

            this.$v.$reset();
        },

        removeEmptyParticipants() {
            this.participants = this.participants.filter(p => p.name !== "");
        },

        getPreparedData() {
            let participants = cleanSource(this.participants).map(p => {
                if (typeof p.name === "object") {
                    p.name = p.name.fullName;
                }
                return p;
            });
            participants.unshift(this.form);
            return new ReservationRequest({ participants });

            // let request = new RegisterEventRequest(this.form);
            // request.total = this.grandTotal;

            // request.participants = cleanSource(this.participants).map(p => {
            //     if (typeof p.name === "object") {
            //         p.name = p.name.name;
            //     }
            //     return p;
            // });
            // request.registrantPrice = this.mainParticipantPrice;
            // request.eventId = this.eventId;

            // return request;
        },

        getSummary() {
            this.$v.$touch();
            this.removeEmptyParticipants();

            if (this.$v.form.$invalid) {
                return false;
            }

            if (
                this.$v.participants.$model.length > 0 &&
                this.$v.participants.$invalid
            ) {
                return false;
            }

            const summaryTable = this.$refs.summaryTable.$el;

            const data = {
                title: null,
                content:
                    `<h4>${this.eventData.title}</h4>` + summaryTable.innerHTML,
                large: true
            };

            this.$store.dispatch("intent/showGenericModal", data);
        },

        submit() {
            this.$v.$touch();
            this.removeEmptyParticipants();

            if (this.$v.form.$invalid) {
                return false;
            }

            if (
                this.$v.participants.$model.length > 0 &&
                this.$v.participants.$invalid
            ) {
                return false;
            }

            if (this.prices.length === 0) {
                this.$toasted
                    .error("Please wait for the price to be loaded", {
                        position: "bottom-right"
                    })
                    .goAway(3000);
                return false;
            }

            let request = this.getPreparedData();
            this.isFormLoading = true;

            V2EventsService.handle(request, this.eventId)
                .then(response => {
                    if (response.getErrorMessages) {
                        //validation from backend
                        this.apiErrors = response.getErrorMessages();
                        return;
                    }

                    this.$v.$reset();

                    this.$emit("formSubmitted", true);

                    this.$toasted
                        .success(
                            "Event Reservation Success! Please check your email for more details",
                            {
                                position: "bottom-right"
                            }
                        )
                        .goAway(15000);

                    this.reset();
                    this.$router.push({
                        name: "ticket-search-route",
                        params: { code: response.code }
                    });
                })
                .catch(e => {
                    this.$v.$reset();
                })
                .finally(() => {
                    this.isFormLoading = false;
                });
        }
    },

    props: {
        eventId: {
            required: true
        },
        eventData: {
            default: {},
            required: true
        }
    },

    computed: {
        prices() {
            return {
                nonMemberPrice: this.eventData.nonMemberPrice,
                memberPrice: this.eventData.memberPrice
            };
        },

        isPMAPMember() {
            return this.profile.isMember;
        },

        companyDetailsReadOnly() {
            return this.isPMAPMember && this.profile.companyId !== 0;
        },

        //summary data
        summaryData() {
            let participants = cleanSource(this.participants);
            participants.map(p => {
                p.company_name = p.company;
                return p;
            });
            let form = cleanSource(this.form);
            form.company_name = this.form.company;
            form.price = this.isMember
                ? this.prices.memberPrice
                : this.prices.nonMemberPrice;
            participants.unshift(form);

            return new EventReservationModel({
                event: this.eventData,
                participants,
                total_price: participants.reduce((a, b) => a + b.price, 0)
            });
        },

        grandTotal() {
            return this.participants.reduce(
                (a, b) => a + b.price,
                this.mainParticipantPrice
            );
        },
        isValid() {
            return validate(this.$v.form);
        },
        isParticipantValid() {
            return validate(this.$v.participants);
        },
        isLoggedIn() {
            return this.$store.state.session.isLoggedIn;
        },
        isMember() {
            return this.profile.isMember;
        },
        profile() {
            return this.$store.state.profile.profile;
        },
        showForm() {
            let conditions = [
                Object.keys(this.eventData).length > 0,
                Object.keys(this.prices).length > 0
            ];

            if (this.isLoggedIn) {
                conditions.push(Object.keys(this.profile).length > 0);
            }

            return conditions.every(condition => condition);
        }
    },

    watch: {
        showForm: {
            immediate: true,
            async handler(newVal) {
                if (this.isLoggedIn && newVal) {
                    //company is not on our db
                    let memberCompany = {};
                    if (this.profile.companyId === 0) {
                        memberCompany.name = this.profile.otherCompany;
                    } else {
                        try {
                            memberCompany = await CompanyService.get(
                                this.profile.companyId
                            );
                        } catch (e) {}
                    }

                    this.form = {
                        name: this.profile.fullName,
                        email: this.profile.email,
                        contactNumber: this.profile.contactNumber,
                        company: memberCompany.name || "",
                        company_address: memberCompany.address || "",
                        company_tin: memberCompany.TIN || ""
                    };
                }
            }
        }
    }
};
</script>