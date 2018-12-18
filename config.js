const { cleanEnv, bool, host, port, str, url } = require("envalid");

const env = cleanEnv(process.env, {
  HOST: host({ default: "localhost" }),
  PORT: port({ default: 80 }),
  EXT_PORT: port({ default: 8004 }),
  // Express
  EXPRESS_PROXY_PREFIX: str({ default: "" }),
  EXPRESS_PORTAL_PREFIX: str({ default: "" }),
  EXPRESS_LOGIN_PATH: str({ default: "/login" }),
  EXPRESS_LOGOUT_PATH: str({ default: "/logOut" }),
  EXPRESS_SESSION_SECRET: str({ default: "keyboard cat" }),
  EXPRESS_THEME: str({ default: "" }),
  // Version
  VERSION: str({ default: "6.4.0" }),
  RELEASE_DATE: str({ default: "" }),
  GIT_HASH: str({ default: "" }),
  DOC_URL: url({
    default: "https://fiware-tmforum.github.io/Business-API-Ecosystem/"
  }),
  USER_DOC_URL: url({
    default: "http://business-api-ecosystem.readthedocs.io/en/v6.4.0"
  }),
  // Proxy
  PROXY_ENABLED: bool({ default: false }),
  PROXT_HOST: host({ default: undefined }),
  PROXY_PORT: port({ default: 80 }),
  PROXY_SECURED: bool({ default: false }),
  // SSL
  SSL_ENABLED: bool({ default: false }),
  SSL_CERT_FILE: str({ default: "cert/cert.crt" }),
  SSL_KEY_FILE: str({ default: "cert/key.key" }),
  SSL_CA_FILE: str({ default: "cert/ca.crt" }),
  SSL_PORT: port({ default: 443 })
});

const config = {
  host: env.HOST,
  port: env.PORT,
  extPort: env.EXT_PORT,
  proxyPrefix: env.EXPRESS_PROXY_PREFIX,
  portalPrefix: env.EXPRESS_PORTAL_PREFIX,
  logInPath: env.EXPRESS_LOGIN_PATH,
  logOutPath: env.EXPRESS_LOGOUT_PATH,
  sessionSecret: env.EXPRESS_SESSION_SECRET,
  theme: env.EXPRESS_THEME,
  version: env.VERSION,
  releaseDate: env.RELEASE_DATE,
  gitHash: env.GIT_HASH,
  doc: env.DOC_URL,
  userDoc: env.USER_DOC_URL
};

config.proxy = {
  enabled: true,
  host: env.PROXT_HOST,
  port: env.PROXY_PORT,
  secured: env.PROXY_SECURED
};

config.https = {
  enabled: true,
  certFile: env.SSL_CERT_FILE,
  keyFile: env.SSL_KEY_FILE,
  caFile: env.SSL_CA_FILE,
  port: env.SSL_PORT
};

// OAuth2 configuration
//'server': 'http://34.213.26.168:8000/',
config.oauth2 = {
  server: "https://account.lab.fiware.org",
  clientID: "--client-id--",
  clientSecret: "--client-secret--",
  callbackURL: "http://localhost/auth/fiware/callback",
  roles: {
    admin: "provider",
    customer: "customer",
    seller: "seller",
    orgAdmin: "orgAdmin"
  }
};

// Customer Role Required to buy items
config.customerRoleRequired = false;

// MongoDB
config.mongoDb = {
  server: "localhost",
  port: 27017,
  user: "",
  password: "",
  db: "belp"
};

// Configure endpoints
config.endpoints = {
  management: {
    path: "management",
    host: "localhost",
    port: config.port,
    appSsl: config.https.enabled
  },
  catalog: {
    path: "DSProductCatalog",
    host: "localhost",
    port: "8080",
    appSsl: false
  },
  ordering: {
    path: "DSProductOrdering",
    host: "localhost",
    port: "8080",
    appSsl: false
  },
  inventory: {
    path: "DSProductInventory",
    host: "localhost",
    port: "8080",
    appSsl: false
  },
  charging: {
    path: "charging",
    host: "localhost",
    port: "8006",
    appSsl: false
  },
  rss: {
    path: "DSRevenueSharing",
    host: "localhost",
    port: "8080",
    appSsl: false
  },
  party: {
    path: "DSPartyManagement",
    host: "localhost",
    port: "8080",
    appSsl: false
  },
  billing: {
    path: "DSBillingManagement",
    host: "localhost",
    port: "8080",
    appSsl: false
  },
  customer: {
    path: "DSCustomerManagement",
    host: "localhost",
    port: "8080",
    appSsl: false
  },
  usage: {
    path: "DSUsageManagement",
    host: "localhost",
    port: "8080",
    appSsl: false
  },
  sla: {
    path: "SLAManagement",
    host: "localhost",
    port: config.port,
    appSsl: false
  },
  reputation: {
    path: "REPManagement",
    host: "localhost",
    port: config.port,
    appSsl: false
  }
};

// Percentage of the generated revenues that belongs to the system
config.revenueModel = 30;

// Billing Account owner role
config.billingAccountOwnerRole = "bill receiver";

// list of paths that will not check authentication/authorization
// example: ['/public/*', '/static/css/']
config.publicPaths = [];

config.magicKey = undefined;

config.usageChartURL =
  "https://mashup.lab.fiware.org/fdelavega/UsageChart?mode=embedded&theme=wirecloud.fiwarelabtheme";

module.exports = config;
