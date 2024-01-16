import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
    return redirect(308, `/admin/hooks/${params.id}/logs`)
}