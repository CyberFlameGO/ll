const fetch = require('node-fetch')

module.exports = {
	headers: [
		{
			source: '/(.*)',
			headers: [
				{
					key: 'cache-control',
					value: 's-maxage=60, stale-while-revalidate',
				},
			],
		},
	],
	async redirects() {
		console.log(process.env)
		const urls = await fetch(
			`https://firestore.googleapis.com/v1/projects/${process.env.projectId}/databases/(default)/documents/routes/`
		)
			.then((x) => x.json())
			.then((x) => x.documents)

		const z = urls.map((x) => ({
			permanent: true,
			source: `/${x.name.replace(
				`projects/${process.env.projectId}/databases/(default)/documents/routes/`,
				''
			)}/:stuff*`,
			destination: `${x.fields.url.stringValue}/:stuff*`,
		}))

		console.log(z)

		return z
	},
	github: {
		autoAlias: true,
		enabled: true,
	},
	cleanUrls: true,
	trailingSlash: false,
	public: true,
}