import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import './assets/bootstrap-theme.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defaultTags } from './utils/seoUtil';
import VueDisqus from 'vue-disqus';

export default function (Vue, { head }) {
    head.meta.push(...defaultTags);
    head.link.push({
        rel: 'stylesheet',
        href:
            'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap',
    });
    // bootstrapVue
    Vue.use(BootstrapVue);
    Vue.use(BootstrapVueIcons);
    // fontAwesome
    library.add(faGithub);
    Vue.component('faIcon', FontAwesomeIcon);
    // default layout
    Vue.component('Layout', () => import('~/layouts/Default.vue'));
    // Disqus
    Vue.use(VueDisqus, {
        shortname: 'warframes-tools',
    });
}
