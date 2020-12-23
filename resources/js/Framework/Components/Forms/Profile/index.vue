<template>
    <form id="profile-form" @submit.prevent="submit" novalidate>
        <Input
            class="my-4 display-4 text-center text-primary"
        >Profile
        </Input>

        <Input
            v-for="(val,formName) in form"
            v-if="uniqueFields.indexOf(formName) === -1"
            :key="formName"
            :label="placeholders[formName]"
            :placeholder="placeholders[formName]"
            class="mb-3"
            v-model.trim="form[formName]"
            :error="isValid[formName].message || getApiErrors(formName)"
            required
        />

        <Input
            class="mb-3"
            label="Company"
            :error="apiErrors['company']"
            :placeholder="placeholders['Company']"
        >
            <select class="form-control" v-model="form['company']">
                <option disabled value="">Please select one</option>
                <option
                    v-text="company.name"
                    v-for="company in companies"
                    :key="company.id"
                    :value="company.id"
                ></option>
                <option value="0">
                    Others
                </option>
            </select>
        </Input>

        <Input
            class="mb-3"
            label="Company"
            v-if="form['company'] == 0"
            v-model.trim="form['otherCompany']"
            :error="apiErrors['company']"
            placeholder="Name of your Company"
        />

        <Input
            required
            :error="isValid['region_code'].message"
            label="Region"
            class="no-error-icon"
            >
            <AddressDivisionDropdown
                placeholder="Select Region"
                type='region'
                v-on:selected="setAddressDivision"
                :service-call="CommonService.regions"
                ref="region"
            />
        </Input>

        <Input
            required
            :error="isValid['province_code'].message"
            label="Province"
            class="no-error-icon"
            >
            <AddressDivisionDropdown
                placeholder="Select Province"
                type='province'
                ref="province"
                v-on:selected="setAddressDivision"
                :service-call="CommonService.provinces"
                :code="profile.province_code"
            />
        </Input>

        <Input
            required
            :error="isValid['city_code'].message"
            label="City/Municipality"
            class="no-error-icon"
            >
            <AddressDivisionDropdown
                placeholder="Select City/Municipality"
                type='city'
                ref="city"
                v-on:selected="setAddressDivision"
                :service-call="CommonService.cities"
            />
        </Input>

        <Input
            required
            :error="isValid['barangay_code'].message"
            label="Barangay"
            class="no-error-icon"
            >
            <AddressDivisionDropdown
                placeholder="Select Barangay"
                type='barangay'
                ref="barangay"
                v-on:selected="setAddressDivision"
                :service-call="CommonService.barangays"
            />
        </Input>

        <div class="text-center">
            <Button type="primary" native-type="submit" class="my-4" :disabled="isLoading">
                <span class="fa fa-spin fa-spinner" v-show="isLoading"></span>
                Update Profile
            </Button>
        </div>
    </form>
</template>

<script>
import Input from "~/Framework/Plugins/Argon/Components/BaseInput";
import Button from "~/Framework/Plugins/Argon/Components/BaseButton";
import Dropdown from "~/Framework/Plugins/Argon/Components/BaseDropdown";

import ProfileUpdateRequest from "~/Application/Services/Profile/Requests/ProfileUpdateRequest";
import ProfileService from "~/Application/Services/Profile";

import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import { validate } from "~/Framework/Helpers/Validation";

import CookieManager from "~/Infrastructure/Cookies";
import ProfileModel from '~/Application/Models/Profile';

import CommonService from "~/Application/Services/V2/Common";
import CompanyService from "~/Application/Services/Company";

import vSelect from 'vue-multiselect';

import AddressDivisionDropdown from '~/Framework/Components/Widgets/AddressDivisionDropdown';

export default {
    name: "ProfileForm",

    components: {
        Button,
        Input,
        Dropdown,
        vSelect,
        AddressDivisionDropdown,
    },

    mixins: [validationMixin],

    validations: {
        form: {
            email: {
                required,
                email
            },
            firstName: {
                required,
            },
            middleName: {
                required,
            },
            lastName: {
                required,
            },
            contactNumber: {
                required,
            },
            address1: {
                required,
            },
            address2: {
                required,
            },
            barangay_code: {
                required
            },
            city_code: {
                required
            },
            province_code: {
                required
            },
            region_code: {
                required
            },
        },
    },

    data() {
        return {
            isLoading: false,
            uniqueFields: [
                'company',
                'country',
                'barangay_code',
                'city_code',
                'province_code',
                'region_code',
                'otherCompany'
            ],
            form: {
                email: "",
                firstName: "",
                middleName: "",
                lastName: "",
                contactNumber: "",
                address1:  "",
                address2:  "",
                company: "",
                otherCompany: "",
                barangay_code: "",
                city_code: "",
                province_code: "",
                region_code: "",
            },
            placeholders: {
                email: "Email",
                firstName: "First Name",
                middleName: "Middle Name",
                lastName: "Last Name",
                contactNumber: "Contact Number",
                address1: "Address",
                address2: "Address",
                company: 'Company'
            },
            apiErrors: {},
            companies: [],

            regions: [],
            provinces: [],
            cities: [],
            barangays: [],

            //////
            CommonService

        };
    },

    mounted() {
        this.reset();
        this.callNeededServices();
    },

    methods: {
        getApiErrors(key) {
            const formErrorMap = {
                firstName: 'first_name',
                middleName: 'middle_name',
                lastName: 'last_name',
                contactNumber: 'contact_number',
                company: 'company_id',
                address1: 'address1',
                address2: 'address2',
                barangay_code: 'barangay_code',
                city_code: 'city_code',
                province_code: 'province_code',
                region_code: 'region_code',
                email: 'email',
            }
            return this.apiErrors[formErrorMap[key]] || ''
        },
        setAddressDivision({type, id}) {
            const typeTargetMap = {
                region: 'province',
                province: 'city',
                city: 'barangay',
                barangay: null,
            }

            const keys = Object.keys(typeTargetMap);
            let i = keys.indexOf(type) + 1;

            for(i; i < keys.length; i++) {
                this.$refs[keys[i]].reset();
                this.form[`${keys[i]}_code`] = null;
            }

            if(this.$refs[typeTargetMap[type]]) {
                this.$refs[typeTargetMap[type]].getOptions(id);
            }

            this.form[`${type}_code`] = id;

        },

        callNeededServices() {
            CompanyService.getAll().then(companies => this.companies = companies);


            if(
                this.profile.regionCode 
                && this.profile.provinceCode 
                && this.profile.cityCode 
                && this.profile.barangayCode) {

                this.$refs.region.getOptions('', this.profile.regionCode);
                this.form.region_code = this.profile.regionCode;

                this.$refs.province.getOptions(this.profile.regionCode, this.profile.provinceCode);
                this.form.province_code = this.profile.provinceCode;

                this.$refs.city.getOptions(this.profile.provinceCode, this.profile.cityCode);
                this.form.city_code = this.profile.cityCode;

                this.$refs.barangay.getOptions(this.profile.cityCode, this.profile.barangayCode);
                this.form.barangay_code = this.profile.barangayCode;

            } else {
                this.$refs.region.getOptions();
            }

        },

        setCountry(country) {
            this.selectedCountry = country.name
            this.form['country'] = country.name;
        },
        reset() {
            for(let formName in this.form) {
                this.form[formName] = this.profile[formName];
            }

            this.form.region_code = this.profile.regionCode;
            this.form.province_code = this.profile.provinceCode;
            this.form.city_code = this.profile.cityCode;
            this.form.barangay_code = this.profile.barangayCode;

            this.form['company'] = this.profile['companyId'];
            

            this.apiErrors = {};
        },
        submit() {
            this.$v.$touch();

            if (this.$v.form.$invalid) {
                return false;
            }
            
            let request = new ProfileUpdateRequest(this.form);
            request.id = this.profile.id;

            this.isLoading = true;

            ProfileService.update(request)
                .then(response => {

                    if (response.exception) {
                        this.apiErrors = response.getErrorMessages();
                        return;
                    }

                    this.$toasted.success(response.message, {
                        position: "bottom-right"
                    }).goAway(3000);

                    let {data} = response;
                    this.$store.dispatch("profile/setProfile", new ProfileModel(data));
                    this.$v.$reset();

                }).catch(e => {
                    console.log(e);
                }).finally(() => this.isLoading = false);
        },
       
    },

    computed: {
        isValid() {
            return validate(this.$v.form);
        },
        profile() {
            return this.$store.state.profile.profile;
        },
    }
};
</script>