<template>
    <Layout>
        <div class="text-white mx-auto" style="max-width: 680px">
            <header>
                <div>
                    <h1>
                        {{ $page.post.title }}
                    </h1>
                    <hr />
                    <div class="lead">{{ $page.post.excerpt }}</div>
                </div>
            </header>

            <article>
                <VueRemarkContent class="lead" />
            </article>
        </div>
    </Layout>
</template>

<!-- Front-matter fields can be queried from GraphQL layer -->
<page-query>
query Post ($id: ID!) {
post(id: $id) {
title,
title_color,
title_meta,
excerpt,
author,
created_at,
category,
image,
image_caption
}
}
</page-query>

<script>
export default {
    metaInfo() {
        return {
            title: this.$page.post.title_meta
        };
    }
};
</script>
