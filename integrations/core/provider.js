const fs = require('fs');
const path = require('path');
const { PROJECT_ROOT } = require('./load-env');

function companyCandidates() {
  return [
    path.join(process.cwd(), 'company.json'),
    path.join(PROJECT_ROOT, 'company.json'),
  ];
}

/**
 * Charge company.json (CWD puis racine Paperasse).
 * @returns {object|null}
 */
function loadCompany() {
  const companyPath = companyCandidates().find((p) => fs.existsSync(p));
  if (!companyPath) {
    return null;
  }
  return JSON.parse(fs.readFileSync(companyPath, 'utf-8'));
}

module.exports = { loadCompany, companyCandidates };
