const frontendBaseUrl = process.env.FRONTEND_BASE_URL;

export const isMainSite = (host) => {
  if (frontendBaseUrl.includes('unicornization')) {
    return ['unicornization.com', 'www.unicornization.com'].includes(host);
  }
  return ['localhost', '127.0.0.1'].includes(host);
};
