import http from 'http';
import {getRequestUrl} from 'serverloose';

const handlersFolder = './handlers';
const server = http.createServer(async (request, response) => {
	const {pathname} = getRequestUrl(request);

	if (/favicon\.ico/i.test(request.url)) {
		response.end('nope');
		return;
	}

	try {
		let handler;

		try {
			handler = await import(`${handlersFolder + pathname}/index.js`);
		} catch (error) {
			if (!/cannot find module/i.test(error.message)) {
				console.log(error);
			}

			handler = await import(`${handlersFolder + pathname}.js`);
		}

		await handler.default(request, response);
	} catch (error) {
		console.error(error);
		response.end('404 Not Found');
	}
});

server.listen(4001);
console.log('> Listening on port 4001');
