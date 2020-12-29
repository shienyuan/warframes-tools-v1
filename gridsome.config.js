module.exports = {
    siteName: 'WARFRAMES TOOLS',
    siteUrl: 'https://warframes.tools',
    siteDescription:
        'Warframes tools is a website that contains several Warframe third-party tools to' +
        ' help Warframe players having a better Warframe gaming experience',
    plugins: [
        {
            use: '@gridsome/plugin-sitemap',
        },
        {
            use: '@gridsome/vue-remark',
            options: {
                typeName: 'Post', // Required
                baseDir: './post', // Where .md files are located
                pathPrefix: '/guide', // Add route prefix. Optional
                template: './src/templates/Post.vue', // Optional
                remark: {
                    autolinkHeadings: false, // disable auto-adding links to headings
                },
            },
        },
    ],
};
