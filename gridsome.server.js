// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = function (api) {
    api.loadSource(({ addCollection, addMetadata }) => {
        const mrcMethods = require('./data/masteryPoints.json');
        const mrcRanks = require('./data/masteryRanks.json');
        const meta = require('./data/meta.json');

        addMetadata('version', meta);

        const mrcMethodsCol = addCollection({
            typeName: 'mrcMethods',
        });

        const mrcRanksCol = addCollection({
            typeName: 'mrcRanks',
        });

        for (const m of mrcMethods) {
            mrcMethodsCol.addNode(m);
        }

        for (const r of mrcRanks) {
            mrcRanksCol.addNode(r);
        }

        // warframe
        const warframe = require('./data/warframe.json');
        const warframeCol = addCollection({
            typeName: 'warframe',
        });
        for (const w of warframe) {
            warframeCol.addNode(w);
        }

        // primary
        const primary = require('./data/primary.json');
        const primaryCol = addCollection({
            typeName: 'primary',
        });
        for (const p of primary) {
            primaryCol.addNode(p);
        }

        // secondary
        const secondary = require('./data/secondary.json');
        const secondaryCol = addCollection({
            typeName: 'secondary',
        });
        for (const s of secondary) {
            secondaryCol.addNode(s);
        }

        // melee
        const melee = require('./data/melee.json');
        const meleeCol = addCollection({
            typeName: 'melee',
        });
        for (const m of melee) {
            meleeCol.addNode(m);
        }
    });

    api.createPages(async ({ graphql, createPage }) => {
        const { data } = await graphql(`
            {
                allWarframe {
                    edges {
                        node {
                            id
                            name
                            description
                            imageName
                            components {
                                name
                                itemCount
                                imageName
                                drops {
                                    location
                                    type
                                    chance
                                    rarity
                                }
                            }
                        }
                    }
                }
            }
        `);

        data.allWarframe.edges.forEach(({ node }) => {
            createPage({
                path: `/warframe/${node.name}`,
                component: './src/templates/Warframe.vue',
                context: {
                    id: node.id,
                },
            });
        });
    });
};
