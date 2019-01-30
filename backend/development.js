import http from 'http';
import {parse as parseUrl} from 'url';

const HANDLERS_FOLDER = './handlers';
const server = http.createServer(async (request, response) => {
	const path = parseUrl(request.url, true).pathname;

	try {
		let handler;

		try {
			handler = await import(`${HANDLERS_FOLDER + path}/index.js`);
		} catch (error) {
			handler = await import(`${HANDLERS_FOLDER + path}.js`);
		}

		await handler.default(request, response);
	} catch (error) {
		// console.error(error);
		response.end('404 Not Found');
	}
});

server.listen(4000);
console.log('> Listening on port 4000');
