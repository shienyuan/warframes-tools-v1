<template>
    <Layout>
        <template v-slot:header>
            Warframe List
        </template>

        <b-row align-v="center" class="mb-3">
            <b-col>
                <b-form-input
                    v-model="filter"
                    placeholder="Search by Warframe name"
                />
            </b-col>
            <b-col>
                <p class="mb-0 font-italic text-white-50 text-right small">
                    Last updated at: 15/12/2020
                </p>
            </b-col>
        </b-row>

        <!--        <b-tabs>-->
        <!--            <b-tab title="First"><p>I'm the first tab</p></b-tab>-->
        <!--            <b-tab title="Second"><p>I'm the second tab</p></b-tab>-->
        <!--        </b-tabs>-->

        <b-table
            stacked="lg"
            dark
            hover
            :filter="filter"
            :fields="fields"
            sort-by="node.name"
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
                <div class="mb-2" v-for="(b, i) in data.value" :key="i">
                    <small class="text-white-50" v-if="data.value.length > 1"
                        >{{ i + 1 }}.
                    </small>
                    <b-link :href="getWikiUrl + b.link" target="_blank">
                        {{ b.name }}
                    </b-link>
                    <span v-if="b.price > 0">
                        <b-img
                            class="mr-1"
                            src="https://ik.imagekit.io/seaw0jfghdk/Credits64_B3FTEVn9h.png?tr=h-15,w-15"
                        />
                        <span>{{ b.price | formatPrice }}</span>
                    </span>
                </div>
            </template>

            <template #cell(node.neuroptics)="data">
                <div v-for="(n, i) in data.value" :key="i">
                    <small class="text-white-50" v-if="data.value.length > 1"
                        >{{ i + 1 }}.
                    </small>
                    <b-link :href="getWikiUrl + n.link" target="_blank"
                        >{{ n.name }}
                    </b-link>
                </div>
            </template>

            <template #cell(node.chassis)="data">
                <div v-for="(c, i) in data.value" :key="i">
                    <small class="text-white-50" v-if="data.value.length > 1"
                        >{{ i + 1 }}.
                    </small>
                    <b-link :href="getWikiUrl + c.link" target="_blank"
                        >{{ c.name }}
                    </b-link>
                </div>
            </template>

            <template #cell(node.systems)="data">
                <div v-for="(s, i) in data.value" :key="i">
                    <small class="text-white-50" v-if="data.value.length > 1"
                        >{{ i + 1 }}.
                    </small>
                    <b-link :href="getWikiUrl + s.link" target="_blank"
                        >{{ s.name }}
                    </b-link>
                </div>
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
img
blueprint{
name
link
price
}
neuroptics{
name
link
}
neuroptics{
name
link
}
chassis{
name
link
}
systems{
name
link
}
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
                'A compact collection of all Warframe acquisitions, easily check out ways to get certain warframe'
        });
    },
    data() {
        return {
            filter: null,
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
                    label: 'Neuroptics',
                    key: 'node.neuroptics'
                },
                {
                    label: 'Chassis',
                    key: 'node.chassis'
                },
                {
                    label: 'Systems',
                    key: 'node.systems'
                }
            ]
        };
    },
    filters: {
        formatPrice(val) {
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
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
