import http from 'http';

const HANDLERS_FOLDER = './handlers';
const server = http.createServer(async (request, response) => {
	const path = parseUrl(request.url, true).pathname;

	if (path === '/') {
		handlerPath = `${HANDLERS_FOLDER}/index.js`;
	} else {
		handlerPath = `${HANDLERS_FOLDER + path}.js`;
	}

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
