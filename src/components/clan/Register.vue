<template>
    <b-card bg-variant="dark">
        <b-overlay variant="dark" :show="isRegisterLoading" no-wrap></b-overlay>
        <b-form>
            <b-row>
                <b-col cols="12" md="6">
                    <b-form-group label="Name" label-for="name">
                        <b-form-input
                            id="name"
                            v-model="clan.name"
                            :state="validation.name"
                        />
                        <b-form-invalid-feedback :state="validation.name">
                            Please enter your clan name
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group label="Introduction" label-for="intro">
                        <b-form-textarea id="intro" v-model="clan.intro" />
                    </b-form-group>

                    <b-form-group label="Leader" label-for="leader">
                        <b-form-input
                            id="leader"
                            v-model="clan.leader"
                            placeholder="Leader or recruiter for contact in game"
                            :state="validation.leader"
                        />
                        <b-form-invalid-feedback :state="validation.leader">
                            Please enter clan leader name
                        </b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group label="Tier" label-for="tier">
                        <b-form-select
                            v-model="clan.tier"
                            :options="tierOptions"
                        />
                    </b-form-group>

                    <b-form-group label="Members" label-for="members">
                        <b-form-input
                            type="number"
                            id="members"
                            v-model.number="clan.members"
                        />
                    </b-form-group>
                </b-col>

                <b-col cols="12" md="6">
                    <b-form-group label="Alliance" label-for="alliance">
                        <b-form-input id="alliance" v-model="clan.alliance" />
                    </b-form-group>

                    <b-form-group label="Region" label-for="region">
                        <b-form-select
                            v-model="clan.region"
                            :options="regionOptions"
                        />
                    </b-form-group>

                    <b-form-group label="Platform" label-for="platform">
                        <b-form-select
                            v-model="clan.platform"
                            :options="platformOptions"
                        />
                    </b-form-group>

                    <b-form-group label="Features">
                        <div id="features">
                            <b-form-checkbox
                                v-model="clan.features.trading"
                                :value="true"
                                :unchecked-value="false"
                                >Trading</b-form-checkbox
                            >
                            <b-form-checkbox
                                v-model="clan.features.research"
                                :value="true"
                                :unchecked-value="false"
                                >Research</b-form-checkbox
                            >
                            <b-form-checkbox
                                v-model="clan.features.dryDock"
                                :value="true"
                                :unchecked-value="false"
                                >Dry dock (Railjack)</b-form-checkbox
                            >
                        </div>
                    </b-form-group>
                </b-col>
            </b-row>

            <b-button class="mt-4" block variant="primary" @click="onRegister"
                >REGISTER</b-button
            >
        </b-form>
    </b-card>
</template>

<script>
export default {
    name: 'Register',
    props: {
        isRegisterLoading: Boolean
    },
    data() {
        return {
            clan: {
                name: '',
                intro: '',
                img: null,
                tier: 'ghost',
                alliance: '',
                region: 'na',
                members: 0,
                leader: '',
                platform: 'pc',
                features: {
                    trading: false,
                    dryDock: false,
                    research: false
                },
                vote: 0
            },
            platformOptions: [
                { value: 'pc', text: 'Pc' },
                { value: 'xbox', text: 'Xbox' },
                { value: 'switch', text: 'Switch' },
                { value: 'ps', text: 'PS' },
                { value: 'other', text: 'Other' }
            ],
            regionOptions: [
                { value: 'asia', text: 'Asia' },
                { value: 'eu', text: 'Europe' },
                { value: 'na', text: 'North America' },
                { value: 'oce', text: 'Oceania' },
                { value: 'other', text: 'Other' }
            ],
            tierOptions: [
                { value: 'ghost', text: 'Ghost (10)' },
                { value: 'shadow', text: 'Shadow (30)' },
                { value: 'storm', text: 'Storm (100)' },
                { value: 'mountain', text: 'Mountain (300)' },
                { value: 'moon', text: 'Moon (1000)' }
            ],
            validation: {
                name: null,
                leader: null
            }
        };
    },
    methods: {
        onRegister() {
            this.validation.name = this.clan.name.length >= 1;
            this.validation.leader = this.clan.leader.length >= 1;

            if (this.validation.name && this.validation.leader) {
                this.$emit('onRegister', this.clan);
            }
        },
        resetForm() {
            this.validation = {
                name: null,
                leader: null
            };

            this.clan = {
                name: '',
                intro: '',
                img: null,
                tier: 'ghost',
                alliance: '',
                region: 'na',
                members: 1,
                leader: '',
                platform: 'pc',
                features: {
                    trading: false,
                    dryDock: false,
                    research: false
                },
                vote: 0
            };
        }
    }
};
</script>

<style scoped></style>
