(global as any).window = { innerWidth: 1920, innerHeight: 1080 };
(global as any).import = { meta: { env: { BASE_URL: '/' } } };
// wait, tsx handles import.meta.env? Let's just mock process.env
