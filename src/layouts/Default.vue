<template>
    <main>
        <b-navbar class="bg-dark" toggleable="lg" type="dark">
            <b-navbar-brand class="d-flex" href="#">
                <img
                    style="height: 30px"
                    class="mr-3"
                    src="../assets/logo.png"
                    alt="warframes-tools-logo"
                />
                <span>{{ $static.metadata.siteName }}</span>
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
                        <fa-icon :icon="['fab', 'github']" />
                    </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <b-alert class="m-3" :show="true" variant="success">
            <b-icon icon="info-circle-fill" class="mr-1"></b-icon>
            New update! v{{ $static.metadata.version.version }} -
            {{ $static.metadata.version.update }}
        </b-alert>

        <b-container class="my-5" tag="section">
            <slot />
        </b-container>

        <footer class="bg-dark text-white py-4 text-center">
            <p class="mb-1">Warframe's tools is an MIT open source project</p>
            <p class="mb-0">
                Supported with <span class="text-danger">♥️</span> by
                <b-link href="https://github.com/sy97" target="_blank"
                    >sy97
                </b-link>
                <span class="text-secondary">@</span>
                <b-link href="https://waystudio.pro/" target="_blank"
                    >WAY Studio
                </b-link>
            </p>
        </footer>
    </main>
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
    name: 'Default',
    data() {
        return {
            navs: [
                {
                    label: 'Mastery Calculator',
                    path: '/'
                },
                {
                    label: 'Tutorials',
                    path: '/tutorial'
                }
            ]
        };
    }
};
</script>

<style>
body {
    background-color: #0f2b3c;
}
</style>
