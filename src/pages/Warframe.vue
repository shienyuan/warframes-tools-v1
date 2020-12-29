<template>
    <Layout>
        <template v-slot:header> Warframe List</template>

        <b-row>
            <b-col
                cols="4"
                md="3"
                xl="2"
                v-for="w in $page.warframes.edges"
                :key="w.id"
            >
                <b-card
                    no-body
                    class="mb-4"
                    bg-variant="dark"
                    @click="$router.push(`/warframe/${w.node.name}`)"
                >
                    <b-card-img
                        :src="getImgUrl + w.node.imageName"
                    ></b-card-img>

                    <template #footer>
                        <p
                            class="m-0 text-center"
                            style="
                                white-space: nowrap;
                                text-overflow: ellipsis;
                                overflow: hidden;
                            "
                        >
                            {{ w.node.name }}
                        </p>
                    </template>
                </b-card>
            </b-col>
        </b-row>
    </Layout>
</template>

<page-query>
query {
warframes: allWarframe(sortBy:"name" order: ASC) {
edges {
node {
id
name
imageName
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
            title: 'Warframe Acquisition List',
            keywords: 'warframe,warframes,warframe acquisition',
            description:
                'A compact collection of all Warframe acquisitions, easily check out ways to get certain warframe',
        });
    },
    components: {
        warframeCard: () => import('~/components/warframe/warframe-card'),
    },
    data() {
        return {
            filter: null,
            fields: [
                {
                    label: '',
                    key: 'node.img',
                    class: 'text-center',
                },
                {
                    label: 'Name',
                    key: 'node.name',
                    sortable: true,
                },
                {
                    label: 'Blueprint',
                    key: 'node.blueprint',
                },
                {
                    label: 'Neuroptics',
                    key: 'node.neuroptics',
                },
                {
                    label: 'Chassis',
                    key: 'node.chassis',
                },
                {
                    label: 'Systems',
                    key: 'node.systems',
                },
            ],
        };
    },
    filters: {
        formatPrice(val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },
    },
    computed: {
        getImgUrl() {
            return `https://cdn.warframestat.us/img/`;
        },
        getWikiUrl() {
            return `${process.env.GRIDSOME_WIKI_URL}/`;
        },
    },
    methods: {
        handleWarframeClick() {
            console.log('123');
        },
    },
};
</script>
