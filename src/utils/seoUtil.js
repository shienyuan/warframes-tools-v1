import config from '../../gridsome.config';

export const formatDesc = d => d.slice(0, 160);
export const formatUrl = p => `https://warframes.tools${p}`;

const defaultKeywords = 'warframe,video games,game,online games,free games';
const defaultDesc =
    'Warframes tools is a website that contains several useful Warframe tools and guides to help' +
    ' Warframe players having a better gaming experience';
const defaultImg =
    'https://ik.imagekit.io/seaw0jfghdk/warframe-tools-logo_K162YLZFL.png';

export const defaultTags = [
    {
        name: 'author',
        content: 'sy97 WAY Studio'
    },
    {
        name: 'robots',
        content: 'index, follow'
    },
    //OG
    {
        key: 'og:type',
        property: 'og:type',
        content: 'website'
    },
    {
        property: 'og:site_name',
        content: config.siteName
    },
    // twitter og
    {
        name: 'twitter:card',
        content: 'summary_large_image'
    },
    {
        property: 'twitter:domain',
        content: 'https://warframes.tools'
    }
];

export function getSeo({
    title,
    description = defaultDesc,
    keywords = defaultKeywords,
    img = defaultImg,
    path
}) {
    return {
        title: title,
        meta: [
            {
                key: 'description',
                name: 'description',
                content: formatDesc(description)
            },
            {
                key: 'keywords',
                name: 'keywords',
                content: keywords
            },
            //OG
            {
                key: 'og:title',
                property: 'og:title',
                content: title
            },
            {
                key: 'og:description',
                name: 'description',
                content: formatDesc(description)
            },
            {
                key: 'og:url',
                property: 'og:url',
                content: formatUrl(path)
            },
            {
                key: 'og:image',
                property: 'og:image',
                content: img
            },
            //twitter
            {
                key: 'twitter:url',
                property: 'twitter:url',
                content: formatUrl(path)
            },
            {
                key: 'twitter:title',
                name: 'twitter:title',
                content: title
            },
            {
                key: 'twitter:description',
                name: 'twitter:description',
                content: formatDesc(description)
            },
            {
                key: 'twitter:image',
                property: 'twitter:image',
                content: img
            }
        ]
    };
}
