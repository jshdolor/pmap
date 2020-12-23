<template>
    <div>
        <Card shadow class="my-4" no-body>
            <div class=" card-profile px-4">
                <div class="row justify-content-center">
                    <div class="col-lg-9">
                        <ProfileForm v-if="!!Object.keys(profile).length"/>
                    </div>
                </div>
            </div>
        </Card>
        <Card shadow class="mt-2" no-body>
            <div class=" card-profile px-4">
                <div class="row justify-content-center">
                    <div class="col-lg-9">
                        <ChangePasswordForm/>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>

<script>

import Card from "~/Framework/Plugins/Argon/Components/Card";

import ProfileForm from '~/Framework/Components/Forms/Profile';
import ChangePasswordForm from '~/Framework/Components/Forms/ChangePassword';
export default {
    name: "ProfileCard",
    components: {
        ProfileForm,
        ChangePasswordForm,
        Card
    },
    computed: {
        profile() {
            return this.$store.state.profile.profile;
        },
    },
    mounted() {
        
    }
};
</script>