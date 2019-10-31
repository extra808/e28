const mix = require('laravel-mix');

mix.js('src/script.js', 'js')
	.sourceMaps(false, 'source-map');

mix.options({
	hmrOptions: {
		host: 'p2.loc',
		port: 8080
	}
})
