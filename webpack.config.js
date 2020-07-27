module.exports = {
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							// you can also read from a file, e.g. `variables.scss`
							// use `data` here if sass-loader version < 8
							prependData: '$color: red;'
						}
					}
				]
			}
		]
	}
};
