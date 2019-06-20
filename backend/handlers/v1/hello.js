import lilypads from 'lilypads';
import handler from 'serverloose';

const specification = {
	description: 'Get hello.',
	examples: ['GET /v1/hello'],
	request: {
		methods: ['get'],
		paths: ['/v1/hello']
	}
};

export {specification};
export default handler(({request}) => {
	const {url} = request;
	const options = {id: `handlers/v1/hello/${url}`};

	return lilypads(options, () => ({
		message: `hello from ${url}`
	}));
}, specification.request);
