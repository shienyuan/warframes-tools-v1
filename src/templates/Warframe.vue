<template>
    <Layout>
        <template v-slot:header>
            {{ data.name }}
        </template>

        <b-breadcrumb
            class="bg-dark"
            :items="[
                {
                    text: 'Warframes',
                    to: '/warframe',
                },
                {
                    text: this.data.name,
                    active: true,
                },
            ]"
        />

        <div class="text-center mb-4">
            <b-img height="250" :src="getImgUrl + data.image_name"></b-img>
        </div>

        <b-row class="mb-4">
            <b-col cols="12" md="6">
                <b-card bg-variant="dark" header="STATS" class="mb-4">
                    <b-row class="mb-2">
                        <b-col>Health</b-col>
                        <b-col>{{ data.health }}</b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col>Shield</b-col>
                        <b-col>{{ data.shield }}</b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col>Armor</b-col>
                        <b-col>{{ data.armor }}</b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col>Power</b-col>
                        <b-col>{{ data.power }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col>Sprint</b-col>
                        <b-col>{{ data.sprint }}</b-col>
                    </b-row>
                </b-card>

                <b-card bg-variant="dark" header="BUILD INFO">
                    <b-row class="mb-2">
                        <b-col>Mastery</b-col>
                        <b-col>{{ data.mastery_req }}</b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col>Build Price</b-col>
                        <b-col>{{ data.build_price }}</b-col>
                    </b-row>

                    <b-row class="mb-2">
                        <b-col>Build Time</b-col>
                        <b-col>{{ data.build_time | formatBuildTime }}</b-col>
                    </b-row>

                    <b-row>
                        <b-col>Build Skip</b-col>
                        <b-col>{{ data.build_skip_price }}</b-col>
                    </b-row>
                </b-card>
            </b-col>

            <b-col cols="12" md="6">
                <b-card bg-variant="dark" header="ABILITY">
                    <div
                        :class="
                            i === data.abilities.length - 1 ? 'mb-0' : 'mb-4'
                        "
                        v-for="(a, i) in data.abilities"
                        :key="i"
                    >
                        <p class="mb-2">
                            <small
                                class="bg-secondary rounded px-2 py-1 mr-2 font-weight-bold"
                                >Key {{ i + 1 }}</small
                            >
                            <span>{{ a.name }}</span>
                        </p>
                        <p class="m-0 text-white-50">{{ a.description }}</p>
                    </div>
                </b-card>
            </b-col>
        </b-row>

        <b-row>
            <b-col>
                <b-card header="OBTAIN" bg-variant="dark">
                    <div
                        :class="
                            i === data.components.length - 1 ? 'mb-0' : 'mb-4'
                        "
                        v-for="(c, i) in data.components"
                        :key="i"
                    >
                        <p>
                            <small
                                class="bg-secondary rounded px-2 py-1 mr-2 font-weight-bold"
                                >{{ c.item_count }}</small
                            >
                            <span>{{ c.name }}</span>
                        </p>

                        <b-card
                            v-if="c.drops.length > 0"
                            bg-variant="secondary"
                            header="Drops"
                        >
                            <div
                                v-for="(d, i) in c.drops.slice(0, 3)"
                                :class="
                                    i === c.drops.length - 1 || i === 2
                                        ? 'mb-0'
                                        : 'mb-4 border-bottom border-secondary pb-4'
                                "
                            >
                                <b-row class="mb-2">
                                    <b-col>Location</b-col>
                                    <b-col>{{ d.location }}</b-col>
                                </b-row>

                                <b-row class="mb-2">
                                    <b-col>Rarity</b-col>
                                    <b-col>{{ d.rarity }}</b-col>
                                </b-row>

                                <b-row>
                                    <b-col>Chance</b-col>
                                    <b-col
                                        >{{ (d.chance * 100).toFixed(2) }}%
                                    </b-col>
                                </b-row>
                            </div>
                        </b-card>
                    </div>
                </b-card>
            </b-col>
        </b-row>
    </Layout>
</template>

<page-query>
query ($id: ID) {
warframeNormal(id: $id) {
id
name
image_name
description
health
shield
armor
power
sprint
mastery_req
build_price
build_time
build_skip_price
abilities {
name
description
}
components {
name
item_count
drops {
location
chance
rarity
}
}
}
}
</page-query>

<script>
import dayjs from 'dayjs';
import { getSeo } from '../utils/seoUtil';

export default {
    name: 'Warframe',
    metaInfo() {
        return getSeo({
            path: this.$route.path,
            title: this.data.name,
            keywords: `warframe,warframes,${this.data.name}`,
            description: this.data.description,
        });
    },
    filters: {
        formatBuildTime(value) {
            return `${value / (60 * 60)}h`;
        },
    },
    computed: {
        data() {
            return this.$page.warframeNormal;
        },
        getImgUrl() {
            return `https://cdn.warframestat.us/img/`;
        },
    },
    methods: {
        dropsFilter(drops, isDropShowLess) {
            if (isDropShowLess) {
                return drops.slice(0, 3);
            } else {
                return drops;
            }
        },
    },
};
</script>

<style scoped></style>
