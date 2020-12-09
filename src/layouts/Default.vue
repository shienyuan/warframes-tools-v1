<template>
    <main>
        <Navbar />

        <b-container class="my-5" tag="section">
            <slot />
        </b-container>

        <Footer />
    </main>
</template>

<script>
export default {
    name: 'Default',
    components: {
        Navbar: () => import('./Navbar'),
        Footer: () => import('./Footer')
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
