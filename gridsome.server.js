// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const axios = require('axios');

module.exports = async (api) => {
    const baseUrl = process.env.GRIDSOME_BASE_URL;

    await api.loadSource(async ({ addCollection, addMetadata }) => {
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

        const warframeNormal = await axios.get(
            `${baseUrl}/warframe?type=normal`
        );
        const warframePrime = await axios.get(`${baseUrl}/warframe?type=prime`);

        const warframeNormalCol = addCollection({
            typeName: 'warframeNormal',
        });

        const warframePrimeCol = addCollection({
            typeName: 'warframePrime',
        });

        for (const w of warframeNormal.data) {
            warframeNormalCol.addNode(w);
        }

        for (const w of warframePrime.data) {
            warframePrimeCol.addNode(w);
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
                allWarframeNormal {
                    edges {
                        node {
                            id
                            name
                            image_name
                            description
                            health
                            shield
                            armor
                            power
                            sprint
                            mastery_req
                            build_price
                            build_time
                            build_skip_price
                            abilities {
                                name
                                description
                            }
                            components {
                                name
                                item_count
                                drops {
                                    location
                                    chance
                                    rarity
                                }
                            }
                        }
                    }
                }
            }
        `);

        data.allWarframeNormal.edges.forEach(({ node }) => {
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
