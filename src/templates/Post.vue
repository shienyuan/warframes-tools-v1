<template>
    <Layout>
        <template v-slot:header>
            <b-button class="mr-3" variant="danger" to="/guide">
                <b-icon icon="arrow-left"></b-icon>
                BACK
            </b-button>
        </template>

        <div class="mx-auto p-sm-3" style="max-width: 680px">
            <header class="text-white">
                <h1 class="font-weight-bold">
                    {{ data.title }}
                </h1>
                <p class="small">
                    Published
                    {{ formatDate(data.created_at) }}
                    <span> · </span>
                    <span>{{ `${data.read_min} read` }}</span>
                </p>
                <b-img
                    :alt="data.image_caption"
                    class="mb-3 mt-2 w-100"
                    :src="data.image"
                ></b-img>
                <div class="lead">{{ $page.post.excerpt }}</div>
            </header>

            <hr class="my-4 bg-white" />

            <article class="text-white">
                <VueRemarkContent />
            </article>

            <hr class="my-5 bg-white" />

            <ClientOnly>
                <Disqus />
            </ClientOnly>
        </div>
        <script v-html="jsonld" type="application/ld+json" />
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
import { getSeo, formatUrl, formatDesc } from '../utils/seoUtil';

export default {
    metaInfo() {
        return getSeo({
            path: this.$route.path,
            title: this.$page.post.title,
            keywords: this.$page.post.keywords,
            description: this.$page.post.excerpt,
            img: this.$page.post.image
        });
    },
    data() {
        return {
            jsonld: {}
        };
    },
    created() {
        this.jsonld = {
            '@context': 'http://schema.org',
            '@type': 'Article',
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': formatUrl(this.$route.path)
            },
            headline: this.data.title,
            image: {
                '@type': 'ImageObject',
                url: this.data.image,
                height: 600,
                width: 800
            },
            datePublished: this.data.created_at,
            dateModified: this.data.created_at,
            author: {
                '@type': 'Person',
                '@id': 'https://warframes.tools',
                name: 'Warframes Tools'
            },
            publisher: {
                '@type': 'Organization',
                '@id': 'https://warframes.tools',
                name: 'Warframes Tools',
                logo: {
                    '@type': 'ImageObject',
                    url:
                        'https://ik.imagekit.io/seaw0jfghdk/logo-white_oE-VCZ9u4.png',
                    height: 70,
                    width: 70
                }
            },
            description: formatDesc(this.data.excerpt)
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
