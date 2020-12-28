// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function(api) {
    api.loadSource(({ addCollection, addMetadata }) => {
        const mrcMethods = require('./data/masteryPoints.json');
        const mrcRanks = require('./data/masteryRanks.json');
        const meta = require('./data/meta.json');
        const warframes = require('./data/warframes.json');

        addMetadata('version', meta);

        const mrcMethodsCol = addCollection({
            typeName: 'mrcMethods'
        });

        const mrcRanksCol = addCollection({
            typeName: 'mrcRanks'
        });

        const warframesCol = addCollection({
            typeName: 'warframes'
        });

        for (const m of mrcMethods) {
            mrcMethodsCol.addNode(m);
        }

        for (const r of mrcRanks) {
            mrcRanksCol.addNode(r);
        }

        for (const w of warframes) {
            warframesCol.addNode(w);
        }

        // primary
        const primary = require('./data/primary.json');
        const primaryCol = addCollection({
            typeName: 'primary'
        });
        for (const p of primary) {
            primaryCol.addNode(p);
        }
    });

    api.createPages(async ({ graphql, createPage }) => {
        const { data } = await graphql(`
            {
                allWarframes {
                    edges {
                        node {
                            id
                            name
                        }
                    }
                }
            }
        `);

        data.allWarframes.edges.forEach(({ node }) => {
            createPage({
                path: `/warframe/${node.name}`,
                component: './src/templates/Warframe.vue',
                context: {
                    id: node.id
                }
            });
        });
    });
};
