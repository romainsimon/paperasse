/**
 * PM2 — rappels fiscaux J-15 (Resend)
 *
 * Démarrage :
 *   pm2 start ecosystem.config.cjs
 *   pm2 save
 *
 * Logs :
 *   pm2 logs paperasse-reminders
 *
 * Test manuel :
 *   npm run reminders:dry-run
 */
const path = require('path');

module.exports = {
  apps: [
    {
      name: 'paperasse-reminders',
      script: path.join(__dirname, 'scripts/send-reminders.js'),
      cwd: __dirname,
      interpreter: 'node',
      cron_restart: '0 8 * * *',
      autorestart: false,
      watch: false,
      time: true,
      env: {
        NODE_ENV: 'production',
        REMINDER_TIMEZONE: 'Europe/Paris',
        REMINDER_LEAD_DAYS: '15',
      },
    },
  ],
};
