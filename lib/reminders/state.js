const fs = require('fs');
const path = require('path');
const { PROJECT_ROOT } = require('../../integrations/core/load-env');

const STATE_PATH = path.join(PROJECT_ROOT, 'data', 'reminders-sent.json');

function loadState() {
  if (!fs.existsSync(STATE_PATH)) {
    return { sent: {} };
  }
  return JSON.parse(fs.readFileSync(STATE_PATH, 'utf-8'));
}

function saveState(state) {
  const dir = path.dirname(STATE_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(STATE_PATH, JSON.stringify(state, null, 2) + '\n', 'utf-8');
}

function wasSent(state, instanceId, leadDays) {
  const key = `${instanceId}_${leadDays}`;
  return Boolean(state.sent[key]);
}

function markSent(state, instanceId, leadDays, meta = {}) {
  const key = `${instanceId}_${leadDays}`;
  state.sent[key] = {
    at: new Date().toISOString(),
    ...meta,
  };
  return state;
}

module.exports = { loadState, saveState, wasSent, markSent, STATE_PATH };
