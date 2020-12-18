<template>
    <main>
        <div class="bg-info">
            <b-container>
                <Navbar class="p-0 pt-2 pb-2" />

                <section v-if="showHeader" class="pt-2 pb-4 m-0 text-white h2">
                    <slot name="header" />
                </section>
            </b-container>
        </div>

        <b-container tag="aside" class="mt-4">
            <b-alert :show="true" variant="success">
                <b-icon icon="info-circle-fill" class="mr-1"></b-icon>
                New update! v{{ $static.metadata.version.version }} -
                {{ $static.metadata.version.update }}
            </b-alert>
        </b-container>

        <b-container class="my-4" tag="section">
            <slot />
        </b-container>

        <Footer class="mt-5" />
    </main>
</template>

<static-query>
query {
metadata {
version {
version
update
}
}
}
</static-query>

<script>
export default {
    name: 'Default',
    components: {
        Navbar: () => import('./Navbar'),
        Footer: () => import('./Footer')
    },
    props: {
        showHeader: {
            type: Boolean,
            default: true
        }
    },
    metaInfo() {
        return {
            link: [
                {
                    rel: 'canonical',
                    href: `https://waframes.tools${this.$route.path}`
                }
            ]
        };
    }
};
</script>
