<template>
    <Layout :showHeader="false">
        <b-container class="text-center">
            <b-row class="my-5">
                <h1 class="header-text h2 font-weight-light text-white mx-auto">
                    Useful Warframe tools & guides to level Up your Warframe
                    experience
                </h1>
            </b-row>

            <!--            <b-row>-->
            <!--                <b-col cols="12" md="6">-->
            <!--                    <h5 class="text-left text-white mb-3">Warframe</h5>-->
            <!--                    <b-form-input placeholder="Search for warframe..." />-->
            <!--                    <b-row class="mt-4">-->
            <!--                        <b-col cols="4" v-for="(w, i) in getWarframes" :key="i">-->
            <!--                            <div-->
            <!--                                class="d-flex align-items-end mb-3 bg-dark rounded-lg"-->
            <!--                                style="height: 150px; background-size: cover; background-position: top"-->
            <!--                                :style="-->
            <!--                                    `background-image: url('${getImgUrl}/${-->
            <!--                                        w.node.img-->
            <!--                                    }?tr=h-300')`-->
            <!--                                "-->
            <!--                            >-->
            <!--                                <div-->
            <!--                                    class="bg-info w-100 py-1 text-white rounded-bottom"-->
            <!--                                >-->
            <!--                                    {{ w.node.name }}-->
            <!--                                </div>-->
            <!--                            </div>-->
            <!--                        </b-col>-->
            <!--                    </b-row>-->
            <!--                    <b-button-->
            <!--                        block-->
            <!--                        class="border-0"-->
            <!--                        to="/warframe"-->
            <!--                        style="background-color: rgba(255,255,255,0.1)"-->
            <!--                        >All Warframes-->
            <!--                    </b-button>-->
            <!--                </b-col>-->
            <!--                <b-col cols="12" md="6"> </b-col>-->
            <!--            </b-row>-->
        </b-container>
    </Layout>
</template>

<script>
import { getSeo } from '../utils/seoUtil';

export default {
    name: 'Index',
    metaInfo() {
        return getSeo({
            path: this.$route.path,
            title: 'Useful Warframe tools and guides',
        });
    },
    components: {
        navbar: () => import('../layouts/Navbar'),
    },
    computed: {
        getWarframes() {
            return this.$page.warframes.edges;
        },
        getImgUrl() {
            return process.env.GRIDSOME_IMG_URL + '/warframes';
        },
    },
};
</script>
