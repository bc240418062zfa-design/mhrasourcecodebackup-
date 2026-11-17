// Instant IndexNow submission script for Microsoft Bing, Yandex & Global Search Engines
import https from 'https';

const urlList = [
  'https://mihora.tech/',
  'https://mihora.tech/company/',
  'https://mihora.tech/faq/',
  'https://mihora.tech/docs/',
  'https://mihora.tech/engineering/',
  'https://mihora.tech/services/',
  'https://mihora.tech/services/digital-engineering/',
  'https://mihora.tech/services/automation-intelligence/',
  'https://mihora.tech/services/physical-infrastructure/',
  'https://mihora.tech/services/field-engineering/',
  'https://mihora.tech/services/managed-sre/',
  'https://mihora.tech/how-it-works/',
  'https://mihora.tech/case-studies/',
  'https://mihora.tech/resources/',
  'https://mihora.tech/partnerships/',
  'https://mihora.tech/solutions/',
  'https://mihora.tech/industries/',
  'https://mihora.tech/insights/',
  'https://mihora.tech/careers/',
  'https://mihora.tech/contact/',
  'https://mihora.tech/status/',
  'https://mihora.tech/legal/',
  'https://mihora.tech/privacy/',
  'https://mihora.tech/terms/',
  'https://mihora.tech/disclaimer/',
];

const payload = JSON.stringify({
  host: 'mihora.tech',
  key: 'e4b3c2d1a0f9e8d7c6b5a49382716054',
  keyLocation: 'https://mihora.tech/e4b3c2d1a0f9e8d7c6b5a49382716054.txt',
  urlList,
});

const endpoints = [
  { name: 'IndexNow Central', hostname: 'api.indexnow.org', path: '/indexnow' },
  { name: 'Microsoft Bing', hostname: 'www.bing.com', path: '/indexnow' },
  { name: 'Yandex', hostname: 'yandex.com', path: '/indexnow' },
];

async function submitToEndpoint(ep) {
  return new Promise((resolve) => {
    const options = {
      hostname: ep.hostname,
      port: 443,
      path: ep.path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
      },
    };

    const req = https.request(options, (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        console.log(`[IndexNow -> ${ep.name}] Status: ${res.statusCode} (${res.statusMessage})`);
        resolve(res.statusCode);
      });
    });

    req.on('error', (e) => {
      console.warn(`[IndexNow -> ${ep.name}] Error: ${e.message}`);
      resolve(null);
    });

    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log(`[IndexNow] Submitting ${urlList.length} URLs across Bing, Yandex & Global IndexNow engines...`);
  for (const ep of endpoints) {
    await submitToEndpoint(ep);
  }
}

run();
