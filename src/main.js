import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import DefaultLayout from '~/layouts/Default.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ImageKit from 'imagekitio-vue';
import config from '../gridsome.config';

export default function(Vue, { _, head, __ }) {
    head.meta.push(
        {
            key: 'keywords',
            name: 'keywords',
            content:
                'warframe,video games,game,computer games,online games,goods games,free games'
        },
        {
            name: 'author',
            content: 'sy97 WAY Studio'
        },
        {
            name: 'robots',
            content: 'index, follow'
        },
        { key: 'og:type', property: 'og:type', content: 'article' },
        { property: 'og:site_name', content: config.siteName },
        {
            key: 'og:description',
            property: 'og:description',
            content: config.siteDescription
        },
        {
            key: 'og:image',
            property: 'og:image',
            content:
                'https://ik.imagekit.io/seaw0jfghdk/warframe-tools-logo_K162YLZFL.png'
        }
    );

    library.add(faGithub);
    Vue.use(BootstrapVue);
    Vue.use(BootstrapVueIcons);
    Vue.component('faIcon', FontAwesomeIcon);
    Vue.component('Layout', DefaultLayout);

    Vue.use(ImageKit, {
        urlEndpoint: 'https://ik.imagekit.io/seaw0jfghdk'
    });
}
