<template>
    <b-navbar variant="info" toggleable="md" type="dark">
        <b-navbar-brand class="d-flex align-items-center" :href="index">
            <b-img
                class="mr-3"
                alt="warframes-tools-logo"
                height="45"
                width="45"
                :src="`${getImgUrl}/Frame_4_vJbrR7Y-6.svg?tr=h-100,w-100`"
            />
            <div>
                <h5 class="mb-0 font-weight-bold">
                    Warframes<span class="text-primary">tools</span>
                </h5>
                <p class="small text-white-50 font-weight-light mb-0">
                    Tools & Guides
                </p>
            </div>
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto m-0 p-0">
                <b-nav-item
                    v-for="(n, i) in navs"
                    :key="i"
                    active-class="text-primary"
                    :active="$route.path === n.path"
                    :to="n.path"
                    >{{ n.label }}</b-nav-item
                >
                <b-nav-item
                    class="m-0 p-0"
                    href="https://github.com/sy97/warframes-tools-v1"
                    target="_blank"
                >
                    <span class="mr-2">v{{ getMetaData.version.version }}</span>
                    <fa-icon style="width: 16px" :icon="['fab', 'github']" />
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<static-query>
query {
metadata {
version {
version
}
}
}
</static-query>

<script>
export default {
    name: 'Navbar',
    props: {
        siteName: String,
        version: String,
    },
    data() {
        return {
            index: '/',
            navs: [
                {
                    label: 'Warframes',
                    path: '/warframe',
                },
                {
                    label: 'Resources',
                    path: '/resource',
                },
                {
                    label: 'Mastery',
                    path: '/mastery',
                },
                {
                    label: 'Clan',
                    path: '/clan',
                },
                {
                    label: 'Guide',
                    path: '/guide',
                },
            ],
        };
    },
    computed: {
        getImgUrl() {
            return process.env.GRIDSOME_IMG_URL;
        },
        getMetaData() {
            return this.$static.metadata;
        },
    },
};
</script>

<style scoped></style>
