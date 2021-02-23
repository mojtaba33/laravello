let mix = require('laravel-mix');

class GraphqlMix {
    dependencies() {
        return [
            'graphql',
            'graphql-tag'
        ]
    },
    webpackRules() {
        return {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loader: 'graphql-tag/loader'
        });
    }
}

mix.extend('graphql', new GraphqlMix());
