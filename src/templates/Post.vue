<template>
    <Layout>
        <div class="mx-auto" style="max-width: 680px">
            <b-button class="mb-3" to="/guide">
                <b-icon icon="arrow-left"></b-icon>
                BACK
            </b-button>

            <header class="text-white">
                <h1 class="font-weight-bold">
                    {{ data.title }}
                </h1>
                <p class="small text-secondary">
                    {{ formatDate(data.created_at) }} ·
                    {{ `${data.read_min} read` }}
                </p>
                <b-img
                    :alt="data.image_caption"
                    class="mb-3 mt-2 w-100"
                    :src="data.image"
                ></b-img>
                <div class="lead">{{ $page.post.excerpt }}</div>
            </header>

            <hr />

            <article class="text-white">
                <VueRemarkContent />
            </article>
        </div>
    </Layout>
</template>

<!-- Front-matter fields can be queried from GraphQL layer -->
<page-query>
query Post ($id: ID!) {
post(id: $id) {
title,
created_at,
read_min,
excerpt,
image,
image_caption,
keywords
}
}
</page-query>

<script>
import { formatDate } from '../utils/dateUtil';
import { getSeo } from '../utils/seoUtil';

export default {
    metaInfo() {
        return getSeo({
            path: this.$route.path,
            title: this.$page.post.title,
            keywords: this.$page.post.keywords,
            description: this.$page.post.excerpt
        });
    },
    computed: {
        data() {
            return this.$page.post;
        }
    },
    methods: {
        formatDate
    }
};
</script>
