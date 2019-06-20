import handler from 'serverloose';
import {NAME, AUTHOR, ENVIRONMENT, DESCRIPTION} from '../env';
import {specification as helloSpecification} from './v1/hello';

export default handler(() => ({
	name: NAME,
	author: AUTHOR,
	environment: ENVIRONMENT,
	description: DESCRIPTION,

	operations: {
		hello: helloSpecification
	}
}));
