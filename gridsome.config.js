// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// Add “modifiers” to your title tag (How to |The current year | Review |Best | Tips | Top |Find | Buy | Easy)
// Embed long tail keywords in title tags
// Add numbers to your title (9 Important HTML tags for your website to improve your SEO)
// Start your title tag with your main targeted keyword
// Don’t stuff your keywords
// Every page should have a unique title tag

module.exports = {
    siteName: 'WARFRAMES TOOLS',
    siteUrl: 'https://warframes.tools',
    siteDescription:
        'Warframes tools is a website that contains several Warframe third-party tools to' +
        ' help Warframe players having a better Warframe gaming experience',
    plugins: [
        {
            use: '@gridsome/plugin-sitemap'
        },
        {
            use: '@gridsome/vue-remark',
            options: {
                typeName: 'Post', // Required
                baseDir: './post', // Where .md files are located
                pathPrefix: '/guide', // Add route prefix. Optional
                template: './src/templates/Post.vue', // Optional
                remark: {
                    autolinkHeadings: false // disable auto-adding links to headings
                }
            }
        }
    ]
};
