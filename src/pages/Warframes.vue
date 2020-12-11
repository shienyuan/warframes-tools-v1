<template>
    <Layout>
        <b-jumbotron
            class="header-bg text-white text-center mb-5"
            header-level="5"
            bg-variant="light"
        >
            <div
                class=" p-3 d-inline-block"
                style="background-color: rgba(53,53,53,0.9)"
            >
                <h1>Warframe Acquisition List</h1>
                <p class="mb-0">
                    A compact collection of all Warframe acquisitions
                </p>
            </div>
        </b-jumbotron>

        <b-form-input
            v-model="search"
            placeholder="Search for Warframe..."
            class="mb-4"
            size="lg"
        />
        <b-card-group columns>
            <warframe-card
                v-for="w in getWarframes"
                :key="w.node.id"
                :name="w.node.name"
                :img="w.node.img"
                :blueprint="w.node.blueprint"
                :component="w.node.component"
                :chances="w.node.chances"
                :expected="w.node.expected"
                :guaranteed="w.node.guaranteed"
                :link="w.node.link"
            />
        </b-card-group>
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
}
component{
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
        warframeCard: () => import('../components/warframes/warframe-card')
    },
    data() {
        return {
            search: ''
        };
    },
    computed: {
        getWarframes() {
            if (this.search === '') return this.$page.warframes.edges;

            return this.$page.warframes.edges.filter(w =>
                w.node.name.toLowerCase().includes(this.search.toLowerCase())
            );
        }
    }
};
</script>

<style scoped>
.header-bg {
    background-image: url('https://ik.imagekit.io/seaw0jfghdk/bg-1_-UKzgcFbk.jpg');
    background-position: center;
    background-size: cover;
}
</style>
