import * as gen from 'gen-engine';
import { get } from 'plugins/requests';

export function updateSchemasOnEngine(cb = () => null) {
	get('/getAll').then(res => {
		gen.schemas.setSchemas(res.data.data);
		cb();
	});
}
