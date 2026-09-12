const analyticsWindow = window as Window & { dataLayer?: unknown[][] };
const dataLayer = analyticsWindow.dataLayer ??= [];

function gtag(...args: unknown[]) {
  dataLayer.push(args);
}

gtag('js', new Date());
gtag('config', 'G-NCM8XJXS9T');
