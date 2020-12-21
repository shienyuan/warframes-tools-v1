<template>
    <Layout>
        <template v-slot:header>
            Clan Recruitment
        </template>

        <div class="text-right">
            <b-button v-b-toggle.collapse-1 class="mb-3" variant="info"
                ><b-icon class="mr-2" icon="plus-circle-fill" /> Register
                Clan</b-button
            >
        </div>

        <b-collapse class="mb-3" id="collapse-1">
            <b-card>
                <b-overlay
                    variant="dark"
                    :show="registerLoading"
                    no-wrap
                ></b-overlay>
                <b-form>
                    <b-row>
                        <b-col cols="12" md="6">
                            <b-form-group label="Name" label-for="name">
                                <b-form-input id="name" v-model="clan.name" />
                            </b-form-group>

                            <b-form-group
                                label="Introduction"
                                label-for="intro"
                            >
                                <b-form-textarea
                                    id="intro"
                                    v-model="clan.intro"
                                />
                            </b-form-group>

                            <b-form-group label="Leader" label-for="leader">
                                <b-form-input
                                    id="leader"
                                    v-model="clan.leader"
                                />
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
                                <b-form-input
                                    id="alliance"
                                    v-model="clan.alliance"
                                />
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

                    <b-button
                        class="mt-4"
                        block
                        variant="info"
                        @click="createClan"
                        >REGISTER</b-button
                    >
                </b-form>
            </b-card>
        </b-collapse>

        <b-table
            bordered
            stacked="lg"
            dark
            :items="clans"
            :fields="clanTableFields"
        >
            <template #cell(action)="data">
                <b-button
                    :variant="data.detailsShowing ? 'info' : 'outline-info'"
                    size="sm"
                    class="mr-2"
                    @click="data.toggleDetails"
                >
                    <b-icon class="text-white" icon="info-circle-fill" />
                </b-button>

                <b-button
                    variant="outline-info"
                    size="sm"
                    @click="showJoin(data.item.name, data.item.leader)"
                >
                    <b-icon class="text-white mr-2" icon="chat-dots-fill" />
                    <span class="text-white">Join</span>
                </b-button>
            </template>

            <template #row-details="row">
                <b-card>
                    <p class="mb-0">{{ row.item.intro }}</p>
                </b-card>
            </template>

            <template #cell(features)="data">
                <b-badge v-if="data.value.trading">Trading</b-badge>
                <b-badge class="mx-2" v-if="data.value.research"
                    >Research</b-badge
                >
                <b-badge v-if="data.value.dryDock">Dry Dock</b-badge>
            </template>
        </b-table>

        <b-modal id="join" centered hide-footer title="Chat to join">
            <b-form-input :autofocus="true" ref="joinInput" :value="joinText" />
            <p class="mb-0 mt-2 text-secondary">
                Copy paste the above text and send in game
            </p>
        </b-modal>
    </Layout>
</template>

<script>
import { getSeo } from '../utils/seoUtil';
import ClanModel from '../firestore/clanModel';

export default {
    name: 'Clan',
    metaInfo() {
        return getSeo({
            path: this.$route.path,
            title: 'Clan Recruitment',
            keywords: 'warframe, clan',
            description:
                'Warframe clan recruitment tool, helping clans to promote themselves and recruit new members'
        });
    },
    data() {
        return {
            registerLoading: false,
            model: {},
            joinText: '',
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
            clans: [],
            clanTableFields: [
                {
                    key: 'name',
                    label: 'Name',
                    sortable: true
                },
                {
                    key: 'tier',
                    label: 'Tier',
                    sortable: true
                },
                {
                    key: 'members',
                    label: 'Members',
                    sortable: true
                },
                {
                    key: 'platform',
                    label: 'Platform',
                    sortable: true
                },
                {
                    key: 'region',
                    label: 'Region',
                    sortable: true
                },
                {
                    key: 'features',
                    label: 'Features'
                },
                {
                    key: 'action',
                    label: '',
                    class: 'text-center'
                }
            ]
        };
    },
    async created() {
        this.model = new ClanModel();
        await this.getAllClans();
    },
    methods: {
        async getAllClans() {
            this.clans = await this.model.getAll();
        },
        async createClan() {
            this.registerLoading = true;
            await this.model.create(this.clan);
            this.clans.push(this.clan);
            this.clan = {
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
            };
            this.registerLoading = false;
        },
        async showJoin(name, leader) {
            this.joinText = `/w ${leader} Hi! I want to join your clan: ${name} (warframes.tools)`;
            await this.$bvModal.show('join');
            this.$refs.joinInput.select();
            this.$refs.joinInput.setSelectionRange(0, this.joinText.length);
        },
        resetForm() {
            this.clan = {
                name: '',
                intro: '',
                img: '',
                tier: 0,
                trading: false,
                dryDock: false,
                alliance: '',
                region: '',
                members: 0,
                warlord: '',
                platform: ''
            };
        }
    }
};
</script>

<style scoped></style>
