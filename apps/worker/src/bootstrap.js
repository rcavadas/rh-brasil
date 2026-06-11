const interval = Number(process.env.WORKER_INTERVAL_MS ?? 30000);

setInterval(() => {
  console.log('rh-worker heartbeat');
}, interval);

console.log('rh-worker started');
