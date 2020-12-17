<template>
    <div>
        <navbar />

        <b-container class="text-center">
            <b-row class="my-5">
                <b-col cols="12">
                    <b-img
                        class="mb-5"
                        width="200"
                        src="https://ik.imagekit.io/seaw0jfghdk/logo-white_oE-VCZ9u4.png"
                    />
                </b-col>
                <b-col cols="12">
                    <h1 class="header-text text-white mx-auto">
                        Useful Warframe Tools & Guides To Level Up Your Warframe
                        Experience
                    </h1>
                </b-col>
            </b-row>
            <b-button size="lg" variant="primary" to="/mastery-calculator"
                >GET STARTED</b-button
            >
        </b-container>
    </div>
</template>

<script>
import { getSeo } from '../utils/seoUtil';

export default {
    name: 'Index',
    components: {
        navbar: () => import('../layouts/Navbar')
    },
    metaInfo() {
        return getSeo({
            path: this.$route.path,
            title: 'Useful Warframe tools and guides'
        });
    }
};
</script>

<style scoped>
@media only screen and (min-width: 768px) {
    .header-text {
        width: 60%;
    }
}
</style>
