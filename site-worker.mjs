export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return response;
    }

    const url = new URL(request.url);
    return env.ASSETS.fetch(new Request(new URL('/404.html', url), request));
  }
};
