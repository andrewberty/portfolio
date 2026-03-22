import { createStart, createMiddleware } from '@tanstack/react-start'

const wwwRedirect = createMiddleware().server(({ request, next }) => {
	const url = new URL(request.url)

	if (url.hostname.startsWith('www.')) {
		url.hostname = url.hostname.slice(4)
		return new Response(null, {
			status: 301,
			headers: { Location: url.toString() },
		})
	}

	return next()
})

export const startInstance = createStart(() => ({
	requestMiddleware: [wwwRedirect],
}))
