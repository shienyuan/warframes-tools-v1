<template>
    <Layout>
        <template v-slot:header>
            Clan Recruitment
        </template>

        <div class="text-right">
            <b-button v-b-toggle.collapse-1 class="mb-3" variant="info">
                <b-icon class="mr-2" icon="plus-circle-fill" />
                Register Clan
            </b-button>
        </div>

        <b-collapse class="mb-3" id="collapse-1">
            <ClientOnly>
                <register
                    ref="register"
                    @onRegister="handleRegister"
                    :isRegisterLoading="isRegisterLoading"
                />
            </ClientOnly>
        </b-collapse>

        <ClientOnly>
            <b-form-input
                v-model="filter"
                class="mb-3"
                placeholder="Search by clan name"
            ></b-form-input>

            <b-table
                bordered
                stacked="lg"
                dark
                sort-by="vote"
                sort-desc
                :filter="filter"
                :filter-included-fields="['name']"
                :items="clans"
                :fields="clanTableFields"
            >
                <!--            <template #cell(RANK)="data">-->
                <!--                {{ data.index + 1 }}-->
                <!--            </template>-->

                <template #cell(action)="data">
                    <b-button
                        :variant="data.detailsShowing ? 'info' : 'outline-info'"
                        size="sm"
                        class="mr-2"
                        @click="data.toggleDetails"
                    >
                        <b-icon class="text-white" icon="info-circle-fill" />
                    </b-button>

                    <!--                <b-button-->
                    <!--                    variant="outline-info"-->
                    <!--                    size="sm"-->
                    <!--                    class="mx-2"-->
                    <!--                    @click="handleShowJoin(data.item.name, data.item.leader)"-->
                    <!--                >-->
                    <!--                    <b-icon-->
                    <!--                        class="text-white mr-2"-->
                    <!--                        icon="arrow-up-circle-fill"-->
                    <!--                    />-->
                    <!--                    <span class="text-white">{{ data.item.vote }}</span>-->
                    <!--                </b-button>-->

                    <b-button
                        variant="outline-info"
                        size="sm"
                        @click="
                            handleShowJoin(data.item.name, data.item.leader)
                        "
                    >
                        <b-icon class="text-white mr-2" icon="chat-dots-fill" />
                        <span class="text-white">Join</span>
                    </b-button>
                </template>

                <template #row-details="row">
                    <b-card>
                        <p class="mb-0">
                            {{ row.item.intro || 'Nothing to show...' }}
                        </p>
                    </b-card>
                </template>

                <template #cell(features)="data">
                    <b-badge v-if="data.value.trading">Trading</b-badge>
                    <b-badge class="mx-2" v-if="data.value.research"
                        >Research
                    </b-badge>
                    <b-badge v-if="data.value.dryDock">Dry Dock</b-badge>
                </template>
            </b-table>
        </ClientOnly>

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
    components: {
        register: () => import('~/components/clan/Register')
    },
    data() {
        return {
            isRegisterLoading: false,
            joinText: '',
            clans: [],
            filter: null,
            clanTableFields: [
                // 'RANK',
                {
                    key: 'name',
                    label: 'NAME',
                    sortable: true
                },
                {
                    key: 'tier',
                    label: 'TIER',
                    sortable: true,
                    class: 'capitalize'
                },
                {
                    key: 'members',
                    label: 'MBR',
                    sortable: true,
                    thStyle: 'width:100px;'
                },
                {
                    key: 'platform',
                    label: 'PLAT',
                    sortable: true,
                    thStyle: 'width:100px;',
                    class: 'capitalize'
                },
                {
                    key: 'region',
                    label: 'RGN',
                    sortable: true,
                    thStyle: 'width:100px;',
                    class: 'capitalize'
                },
                {
                    key: 'features',
                    label: 'FEATURES'
                },
                {
                    key: 'alliance',
                    label: 'ALLIANCE',
                    sortable: true
                },
                {
                    key: 'action',
                    label: '',
                    class: 'text-center'
                }
            ]
        };
    },
    async mounted() {
        await this.getAllClans();
    },
    methods: {
        async getAllClans() {
            const snap = await this.$db
                .firestore()
                .collection(process.env.GRIDSOME_CLAN_COL)
                .get();
            this.clans = snap.docs.map(doc => doc.data());
        },
        async handleRegister(data) {
            try {
                this.isRegisterLoading = true;

                await this.$db
                    .firestore()
                    .collection(process.env.GRIDSOME_CLAN_COL)
                    .add(data);

                this.clans.push(data);

                this.$refs.register.resetForm();

                this.$bvToast.toast('Clan successfully registered', {
                    title: `Success`,
                    variant: 'success',
                    solid: true
                });
            } catch (e) {
                this.$bvToast.toast('Something went wrong, please try again', {
                    title: `Failed`,
                    variant: 'danger',
                    solid: true
                });
            } finally {
                this.isRegisterLoading = false;
            }
        },
        async handleShowJoin(name, leader) {
            this.joinText = `/w ${leader} Hi! I want to join your clan: ${name} (warframes.tools)`;
            await this.$bvModal.show('join');
            this.$refs.joinInput.select();
            this.$refs.joinInput.setSelectionRange(0, this.joinText.length);
        }
    }
};
</script>

<style>
.capitalize {
    text-transform: capitalize;
}
</style>
