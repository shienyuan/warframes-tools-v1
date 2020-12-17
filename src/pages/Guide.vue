<template>
    <Layout>
        <template v-slot:header>
            Guides
        </template>

        <b-row
            @click="$router.push(p.node.path)"
            style="cursor: pointer"
            class="text-white mb-5"
            v-for="(p, i) in $page.post.edges"
            :key="i"
        >
            <b-col cols="12" md="4" class="mb-3 mb-lg-0">
                <b-img
                    class="w-100"
                    :src="p.node.image"
                    :alt="p.node.image_caption"
                />
            </b-col>
            <b-col cols="12" md="8">
                <h2 class="font-weight-bold">{{ p.node.title }}</h2>
                <div class="small mb-3">
                    <span>
                        <b-icon icon="calendar-date" class="mr-2"></b-icon>
                        <span>{{ formatDate(p.node.created_at) }}</span>
                    </span>
                </div>
                <p class="mb-0 text-white-50">
                    {{ formatExcerpt(p.node.excerpt) }}
                </p>
            </b-col>
        </b-row>
    </Layout>
</template>

<page-query>
query Post($page:Int) {
post: allPost(perPage: 6, page: $page, order: DESC, sortBy: "created_at") @paginate  {
totalCount
pageInfo {
totalPages
currentPage
}
edges {
node {
title,
excerpt,
path,
created_at,
image,
image_caption,
}
}
}
}
</page-query>

<script>
import { formatDate } from '~/utils/dateUtil';

export default {
    metaInfo: {
        title: 'GUIDES'
    },
    components: {
        pageHeader: () => import('~/components/PageHeader')
    },
    methods: {
        formatExcerpt(val) {
            return `${val.slice(0, 200)}...`;
        },
        formatDate
    }
};
</script>
