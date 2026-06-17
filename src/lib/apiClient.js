// Small fetch wrapper for talking to the PHP API in /api.
// All requests include cookies so PHP sessions work for auth.

const API_BASE = '/api';

export async function api(path, options = {}) {
	const isFormData = options.body instanceof FormData;

	const res = await fetch(`${API_BASE}/${path}`, {
		credentials: 'include',
		...options,
		headers: {
			...(isFormData ? {} : { 'Content-Type': 'application/json' }),
			...(options.headers || {}),
		},
	});

	const contentType = res.headers.get('Content-Type') || '';
	const data = contentType.includes('application/json') ? await res.json() : null;

	if (!res.ok) {
		const error = new Error((data && data.message) || `Request failed (${res.status})`);
		error.response = data;
		error.status = res.status;
		throw error;
	}

	return data;
}

// Helper to build the public URL for an uploaded file.
export function uploadUrl(filename) {
	return `/uploads/${filename}`;
}

export default api;
