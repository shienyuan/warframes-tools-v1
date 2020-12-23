import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue';
import './assets/bootstrap-theme.scss';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { defaultTags } from './utils/seoUtil';
import VueDisqus from 'vue-disqus';
import firebase from 'firebase/app';

export default function(Vue, { _, head, __, isClient }) {
    head.meta.push(...defaultTags);
    head.link.push({
        rel: 'stylesheet',
        href:
            'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap'
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
        shortname: 'warframes-tools'
    });

    if (isClient) {
        import('firebase/firestore');
        import('firebase/analytics');

        firebase.initializeApp({
            apiKey: process.env.GRIDSOME_API_KEY,
            authDomain: process.env.GRIDSOME_AUTH_DOMAIN,
            projectId: process.env.GRIDSOME_PROJECT_ID,
            storageBucket: process.env.GRIDSOME_STORAGE_BUCKET,
            messagingSenderId: process.env.GRIDSOME_MESSAGING_SENDER_ID,
            appId: process.env.GRIDSOME_APP_ID,
            measurementId: process.env.GRIDSOME_MEASUREMENT_ID
        });

        Vue.prototype.$db = firebase;
    }
}
