import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import DefaultLayout from '~/layouts/Default.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import ImageKit from 'imagekitio-vue';
export default function(Vue, { _, head, __ }) {
    head.meta.push({
        name: 'keywords',
        content: 'warframe,tools,gaming,game tutorial,game tool'
    });

    head.meta.push({
        name: 'author',
        content: 'sy97 WAY Studio'
    });

    head.meta.push({
        name: 'robots',
        content: 'index, follow'
    });

    head.link.push({
        rel: 'canonical',
        href: 'https://warframes.tools'
    });

    library.add(faGithub);
    Vue.use(BootstrapVue);
    Vue.use(BootstrapVueIcons);
    Vue.component('faIcon', FontAwesomeIcon);
    Vue.component('Layout', DefaultLayout);

    Vue.use(ImageKit, {
        urlEndpoint: 'https://ik.imagekit.io/seaw0jfghdk'
    });
}
