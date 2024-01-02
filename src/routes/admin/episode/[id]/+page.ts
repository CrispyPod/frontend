import { redirect } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (({ params }) => {
	const id = params.id;
	if (id == 'page') {
		redirect(308, '/admin/episode');
	}

	return {
		id: id
	};
}) satisfies PageLoad;
