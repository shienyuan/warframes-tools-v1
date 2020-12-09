<template>
    <Layout> </Layout>
</template>

<script>
import { getSeo } from '../utils/seoUtil';

export default {
    name: 'MasteryRank',
    metaInfo() {
        return getSeo({
            path: this.$route.path,
            title: 'Useful Warframe tools and guides'
        });
    }
};
</script>
