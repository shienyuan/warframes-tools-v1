<template>
    <Layout>
        <page-header title="WARFRAMES" />

        <p class="font-italic text-white-50 text-right small">
            Last updated at: 15/12/2020
        </p>

        <b-table
            stacked="lg"
            dark
            hover
            :fields="fields"
            :items="$page.warframes.edges"
        >
            <template #cell(node.img)="data">
                <b-img
                    :src="getImgUrl + data.value + '?tr=w-50,h-50,fo-top'"
                ></b-img>
            </template>

            <template #cell(node.name)="data">
                <b-link :href="getWikiUrl + data.item.node.link" target="_blank"
                    >{{ data.value }}
                </b-link>
            </template>

            <template #cell(node.blueprint)="data">
                <span v-if="data.value.length === 0">
                    <b-img
                        src="https://ik.imagekit.io/seaw0jfghdk/Credits64_B3FTEVn9h.png?tr=h-15,w-15"
                    />
                    <span> {{ data.item.node.price }}</span>
                </span>
                <div v-else v-for="(b, i) in data.value" :key="i">
                    <b-link :href="getWikiUrl + b.link" target="_blank"
                        >{{ b.name }}
                    </b-link>
                </div>
            </template>

            <template #cell(node.components)="data">
                <li v-for="(c, i) in data.value" :key="i">
                    <b-link :href="getWikiUrl + c.link" target="_blank"
                        >{{ c.name }}
                    </b-link>
                </li>
            </template>

            <template #cell(node.chances)="data">
                <p class="mb-1">
                    <span class="text-white-50">Neuroptics:</span>
                    {{ data.value.neuroptics }}%
                </p>
                <p class="mb-1">
                    <span class="text-white-50">Chassis:</span>
                    {{ data.value.chassis }}%
                </p>
                <p class="mb-0">
                    <span class="text-white-50">Systems:</span>
                    {{ data.value.systems }}%
                </p>
            </template>
        </b-table>
    </Layout>
</template>

<page-query>
query {
warframes: allWarframes(sortBy:"name" order: ASC) {
edges {
node {
id
name
price
img
blueprint{
name
link
}
components{
name
link
}
chances{
neuroptics
chassis
systems
}
link
}
}
}
}
</page-query>

<script>
import { getSeo } from '../utils/seoUtil';

export default {
    name: 'Warframes',
    metaInfo() {
        return getSeo({
            path: this.$route.path,
            title: 'Warframe Acquisition List',
            keywords: 'warframe,warframes,warframe acquisition',
            description:
                'A compact collection of all Warframe acquisitions, ways and method to get certain warframe'
        });
    },
    components: {
        pageHeader: () => import('~/components/PageHeader'),
        warframeCard: () => import('../components/warframes/warframe-card')
    },
    data() {
        return {
            search: '',
            fields: [
                {
                    label: '',
                    key: 'node.img',
                    class: 'text-center'
                },
                {
                    label: 'Name',
                    key: 'node.name',
                    sortable: true
                },
                {
                    label: 'Blueprint',
                    key: 'node.blueprint'
                },
                {
                    label: 'Component',
                    key: 'node.components'
                },
                {
                    label: 'Chances',
                    key: 'node.chances'
                }
            ]
        };
    },
    computed: {
        getImgUrl() {
            return `${process.env.GRIDSOME_IMG_URL}/warframes/`;
        },
        getWikiUrl() {
            return `${process.env.GRIDSOME_WIKI_URL}/`;
        }
    }
};
</script>
