// AdhocReport External Auth Example - Node.js (didactic)
// ------------------------------------------------------
// This server demonstrates the canonical external auth contract expected by ServerApp.
// It intentionally uses in-memory users to keep the tutorial simple.

const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const selfsigned = require('selfsigned');

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT || 5199);
const CERT_PATH = path.join(__dirname, 'dev-cert.pem');
const KEY_PATH = path.join(__dirname, 'dev-key.pem');

// In-memory identity source for didactic purposes.
// In real implementations, replace this with your identity provider/database.
const USERS = [
  {
	userId: 'ext-usr-001',
	username: 'ext.manuela',
	fullName: 'Manuela External',
	email: 'manuela.external@test.local',
	password: 'Ext@1234',
	isActive: true
  },
  {
	userId: 'ext-usr-002',
	username: 'ext.ricardo',
	fullName: 'Ricardo External',
	email: 'ricardo.external@test.local',
	password: 'Ext@1234',
	isActive: true
  }
];

function ensureCertificateFiles() {
  if (fs.existsSync(CERT_PATH) && fs.existsSync(KEY_PATH)) {
	return;
  }

  const attrs = [{ name: 'commonName', value: 'localhost' }];
  const pems = selfsigned.generate(attrs, {
	days: 365,
	keySize: 2048,
	algorithm: 'sha256',
	extensions: [{ name: 'subjectAltName', altNames: [{ type: 2, value: 'localhost' }] }]
  });

  fs.writeFileSync(CERT_PATH, pems.cert, 'utf8');
  fs.writeFileSync(KEY_PATH, pems.private, 'utf8');
}

// Basic health endpoint for operational checks.
app.get('/health', (_req, res) => {
  res.status(200).json({
	status: 'ok',
	source: 'AdhocReport.ExternalAuth.NodeExample'
  });
});

// Canonical auth validation endpoint used by ServerApp.
app.post('/api/external-auth/validate', (req, res) => {
  const username = typeof req.body?.username === 'string' ? req.body.username.trim() : '';
  const externalUserId = typeof req.body?.externalUserId === 'string' ? req.body.externalUserId.trim() : '';
  const password = typeof req.body?.password === 'string' ? req.body.password : '';

  // Canonical input validation.
  if ((!username && !externalUserId) || !password) {
	return res.status(400).json({
	  isAuthenticated: false,
	  message: 'invalid-request'
	});
  }

  // Lookup by externalUserId first when provided, otherwise by username.
  const user = externalUserId
	? USERS.find(x => x.userId === externalUserId)
	: USERS.find(x => x.username === username);

  if (!user || !user.isActive) {
	return res.status(200).json({
	  isAuthenticated: false,
	  message: 'invalid-credentials'
	});
  }

  // Didactic plain-text check.
  // Replace with secure hash verification in real implementations.
  if (user.password !== password) {
	return res.status(200).json({
	  isAuthenticated: false,
	  message: 'invalid-credentials'
	});
  }

  // Canonical success response required by ServerApp.
  return res.status(200).json({
	isAuthenticated: true,
	userContext: {
	  userId: user.userId
	},
	fullName: user.fullName,
	email: user.email
  });
});

function start() {
  ensureCertificateFiles();

  const server = https.createServer(
	{
	  key: fs.readFileSync(KEY_PATH, 'utf8'),
	  cert: fs.readFileSync(CERT_PATH, 'utf8')
	},
	app
  );

  server.listen(PORT, () => {
	console.log(`[NodeExample] HTTPS server running at https://localhost:${PORT}`);
	console.log('[NodeExample] Endpoint: POST /api/external-auth/validate');
	console.log('[NodeExample] Health: GET /health');
  });
}

start();
