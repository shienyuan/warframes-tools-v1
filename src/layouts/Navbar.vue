<template>
    <div>
        <b-navbar class="bg-dark" toggleable="lg" type="dark">
            <b-navbar-brand class="d-flex" :href="index">
                <b-img
                    alt="warframes-tools-logo"
                    height="30"
                    src="https://ik.imagekit.io/seaw0jfghdk/logo-white_oE-VCZ9u4.png"
                />
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item
                        v-for="(n, i) in navs"
                        :key="i"
                        :active="$route.path === n.path"
                        :to="n.path"
                        >{{ n.label }}</b-nav-item
                    >
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto m-0 p-0">
                    <b-nav-item
                        class="m-0 p-0"
                        href="https://github.com/sy97/warframes-tools-v1"
                        target="_blank"
                    >
                        <span class="mr-2"
                            >v{{ $static.metadata.version.version }}</span
                        >
                        <fa-icon
                            style="width: 16px"
                            :icon="['fab', 'github']"
                        />
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>

        <b-alert class="m-3" :show="true" variant="success">
            <b-icon icon="info-circle-fill" class="mr-1"></b-icon>
            New update! v{{ $static.metadata.version.version }} -
            {{ $static.metadata.version.update }}
        </b-alert>
    </div>
</template>

<static-query>
query {
metadata {
siteName
version {
version
update
}
}
}
</static-query>

<script>
export default {
    name: 'Navbar',
    data() {
        return {
            index: '/',
            navs: [
                {
                    label: 'Mastery Calculator',
                    path: '/mastery-calculator'
                },
                {
                    label: 'Guides',
                    path: '/guide'
                }
            ]
        };
    }
};
</script>

<style scoped></style>
