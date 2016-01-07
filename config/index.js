var config = {
	local: {
		mode: 'local',
		port: 3000
	},
	staging: {
		mode: 'staging',
		port: 4000
	},
	production: {
		mode: 'production',
		port: process.env.PORT
	}
}
module.exports = function(mode) {
	return config[mode || process.argv[2] || 'local'] || config.local;
}
