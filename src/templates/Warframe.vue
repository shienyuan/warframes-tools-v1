<template>
    <Layout>
        <template v-slot:header>
            <b-button variant="danger" @click="$router.back()">BACK</b-button>
        </template>

        <div class="text-center">
            <b-img height="180" :src="getImgUrl + data.imageName"></b-img>
            <h1 class="m-0 mt-3 bg-dark p-2 rounded">{{ data.name }}</h1>
        </div>

        <h3 class="mt-5 mb-3">Obtain</h3>
        <b-row>
            <b-col v-for="(c, i) in components" :key="i" cols="12">
                <b-card bg-variant="dark" class="mb-3">
                    <b-row>
                        <b-col cols="4">
                            <b-card-img :src="getImgUrl + c.imageName" />
                        </b-col>

                        <b-col>
                            <b-row>
                                <b-col cols="5">Volume:</b-col>
                                <b-col>{{ c.itemCount }}</b-col>
                            </b-row>

                            <b-row v-if="c.drops.length > 0">
                                <b-col cols="5">Chance:</b-col>
                                <b-col
                                    >{{
                                        (c.drops[0].chance * 100).toFixed(2)
                                    }}%</b-col
                                >
                            </b-row>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </Layout>
</template>

<page-query>
query ($id: ID) {
warframe(id: $id) {
name
imageName
description
components {
name
itemCount
imageName
drops {
location
type
chance
rarity
}
}
}
}
</page-query>

<script>
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
    computed: {
        data() {
            return this.$page.warframe;
        },
        components() {
            const data = this.$page.warframe.components;
            const neuro = data.find((d) => d.name === 'Neuroptics');
            const chassis = data.find((d) => d.name === 'Chassis');
            const systems = data.find((d) => d.name === 'Systems');

            return [neuro, chassis, systems];
        },
        getImgUrl() {
            return `https://cdn.warframestat.us/img/`;
        },
    },
};
</script>

<style scoped></style>
