<template>
    <Layout>
        <div class="mx-auto" style="max-width: 680px">
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
                    class="mb-3 mt-2"
                    width="680"
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
title_meta,
created_at,
read_min,
excerpt,
image,
image_caption
}
}
</page-query>

<script>
import { formatDate } from '../utils/dateUtil';

export default {
    metaInfo() {
        return {
            title: this.$page.post.title_meta,
            meta: [
                {
                    key: 'description',
                    name: 'description',
                    content: this.$page.post.excerpt.slice(0, 160)
                }
            ]
        };
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
