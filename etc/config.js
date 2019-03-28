const { cleanEnv, bool, host, port, num, str, url, json } = require("envalid");

function firstOf(envVar, fallback) {
  return typeof envVar === "undefined" ? fallback : envVar;
}

const env = cleanEnv(process.env, {
  HOST: host({ example: "localhost" }),
  PORT: port({ default: 8004 }),
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
  PROXY_ENABLED: bool({ default: true }),
  PROXT_HOST: host({ example: "localhost" }),
  PROXY_PORT: port({ default: 8004 }),
  PROXY_SECURED: bool({ default: false }),
  // SSL
  SSL_ENABLED: bool({ default: false }),
  SSL_CERT_FILE: str({ default: "cert/cert.crt" }),
  SSL_KEY_FILE: str({ default: "cert/key.key" }),
  SSL_CA_FILE: str({ default: "cert/ca.crt" }),
  SSL_PORT: port({ default: 443 }),
  // OAuth2
  OAUTH2_SERVER: url({ example: "https://account.lab.fiware.org" }),
  OAUTH2_CLIENT_ID: str({ example: "eff50ed2-df09-4d95-b704-cf87e550049c" }),
  OAUTH2_CLIENT_SECRET: str({ example: "16eb167a-7414-4140-aa6e-d1661ccfee2b" }),
  OAUTH2_CALLBACK_URL: url({
    example: "http://localhost/auth/fiware/callback"
  }),
  OAUTH2_ROLES: json({
    default:
      '{"admin":"provider","customer":"customer","seller":"seller","orgAdmin":"orgAdmin"}'
  }),
  CUSTOMER_ROLE_REQUIRED: bool({ default: false }),
  MONGO_HOST: host({ example: "localhost" }),
  MONGO_PORT: port({ default: 27017 }),
  MONGO_USERNAME: str({ default: "" }),
  MONGO_PASSWORD: str({ default: "" }),
  MONGO_DBNAME: str({ default: "belp" }),
  // Percentage of the generated revenues that belongs to the system
  PCT_REVENUE_MODEL: num({ default: 30 }),
  // Billing Account owner role
  BILLING_ACCOUNT_OWNER_ROLE: str({ default: "bill receiver" }),
  // list of paths that will not check authentication/authorization
  PUBLIC_PATHS: json({
    default: "[]",
    example: '["/public/*","/static/css/"]'
  }),
  MAGIC_KEY: str({ default: undefined }),
  USAGE_CHART_URL: url({
    default:
      "https://mashup.lab.fiware.org/fdelavega/UsageChart?mode=embedded&theme=wirecloud.fiwarelabtheme"
  }),
  // Endpoints
  ENDPOINT_MANAGEMENT_PATH: str({ default: "management" }),
  ENDPOINT_MANAGEMENT_HOST: host({ default: "localhost" }),
  ENDPOINT_MANAGEMENT_PORT: port({ default: undefined }),
  ENDPOINT_MANAGEMENT_APP_SSL: bool({ default: undefined }),

  ENDPOINT_CATALOG_PATH: str({ default: "DSProductCatalog" }),
  ENDPOINT_CATALOG_HOST: host(),
  ENDPOINT_CATALOG_PORT: port({ default: 8080 }),
  ENDPOINT_CATALOG_APP_SSL: bool({ default: false }),

  ENDPOINT_ORDERING_PATH: str({ default: "DSProductOrdering" }),
  ENDPOINT_ORDERING_HOST: host(),
  ENDPOINT_ORDERING_PORT: port({ default: 8080 }),
  ENDPOINT_ORDERING_APP_SSL: bool({ default: false }),

  ENDPOINT_INVENTORY_PATH: str({ default: "DSProductInventory" }),
  ENDPOINT_INVENTORY_HOST: host(),
  ENDPOINT_INVENTORY_PORT: port({ default: 8080 }),
  ENDPOINT_INVENTORY_APP_SSL: bool({ default: false }),

  ENDPOINT_CHARGING_PATH: str({ default: "charging" }),
  ENDPOINT_CHARGING_HOST: host(),
  ENDPOINT_CHARGING_PORT: port({ default: 8006 }),
  ENDPOINT_CHARGING_APP_SSL: bool({ default: false }),

  ENDPOINT_RSS_PATH: str({ default: "DSRevenueSharing" }),
  ENDPOINT_RSS_HOST: host(),
  ENDPOINT_RSS_PORT: port({ default: 8080 }),
  ENDPOINT_RSS_APP_SSL: bool({ default: false }),

  ENDPOINT_PARTY_PATH: str({ default: "DSPartyManagement" }),
  ENDPOINT_PARTY_HOST: host(),
  ENDPOINT_PARTY_PORT: port({ default: 8080 }),
  ENDPOINT_PARTY_APP_SSL: bool({ default: false }),

  ENDPOINT_BILLING_PATH: str({ default: "DSBillingManagement" }),
  ENDPOINT_BILLING_HOST: host(),
  ENDPOINT_BILLING_PORT: port({ default: 8080 }),
  ENDPOINT_BILLING_APP_SSL: bool({ default: false }),

  ENDPOINT_CUSTOMER_PATH: str({ default: "DSCustomerManagement" }),
  ENDPOINT_CUSTOMER_HOST: host(),
  ENDPOINT_CUSTOMER_PORT: port({ default: 8080 }),
  ENDPOINT_CUSTOMER_APP_SSL: bool({ default: false }),

  ENDPOINT_USAGE_PATH: str({ default: "DSUsageManagement" }),
  ENDPOINT_USAGE_HOST: host(),
  ENDPOINT_USAGE_PORT: port({ default: 8080 }),
  ENDPOINT_USAGE_APP_SSL: bool({ default: false }),

  ENDPOINT_SLA_PATH: str({ default: "SLAManagement" }),
  ENDPOINT_SLA_HOST: host({ default: "localhost" }),
  ENDPOINT_SLA_PORT: port({ default: undefined }),
  ENDPOINT_SLA_APP_SSL: bool({ default: false }),

  ENDPOINT_REPUTATION_PATH: str({ default: "REPManagement" }),
  ENDPOINT_REPUTATION_HOST: host({ default: "localhost" }),
  ENDPOINT_REPUTATION_PORT: port({ default: undefined }),
  ENDPOINT_REPUTATION_APP_SSL: bool({ default: false })
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
  userDoc: env.USER_DOC_URL,
  proxy: {
    enabled: env.PROXY_ENABLED,
    host: env.PROXT_HOST,
    port: env.PROXY_PORT,
    secured: env.PROXY_SECURED
  },
  https: {
    enabled: env.SSL_ENABLED,
    certFile: env.SSL_CERT_FILE,
    keyFile: env.SSL_KEY_FILE,
    caFile: env.SSL_CA_FILE,
    port: env.SSL_PORT
  },
  oauth2: {
    server: env.OAUTH2_SERVER,
    clientID: env.OAUTH2_CLIENT_ID,
    clientSecret: env.OAUTH2_CLIENT_SECRET,
    callbackURL: env.OAUTH2_CALLBACK_URL,
    roles: env.OAUTH2_ROLES
  },
  // Customer Role Required to buy items
  customerRoleRequired: env.CUSTOMER_ROLE_REQUIRED,
  mongoDb: {
    server: env.MONGO_HOST,
    port: env.MONGO_PORT,
    user: env.MONGO_USERNAME,
    password: env.MONGO_PASSWORD,
    db: env.MONGO_DBNAME
  },
  revenueModel: env.PCT_REVENUE_MODEL,
  billingAccountOwnerRole: env.BILLING_ACCOUNT_OWNER_ROLE,
  publicPaths: env.PUBLIC_PATHS,
  magicKey: env.MAGIC_KEY,
  usageChartURL: env.USAGE_CHART_URL
};

// Configure endpoints
config.endpoints = {
  management: {
    path: env.ENDPOINT_MANAGEMENT_PATH,
    host: env.ENDPOINT_MANAGEMENT_HOST,
    port: firstOf(env.ENDPOINT_MANAGEMENT_PORT, env.PORT),
    appSsl: firstOf(env.ENDPOINT_MANAGEMENT_APP_SSL, env.SSL_ENABLED)
  },
  catalog: {
    path: env.ENDPOINT_CATALOG_PATH,
    host: env.ENDPOINT_CATALOG_HOST,
    port: env.ENDPOINT_CATALOG_PORT,
    appSsl: env.ENDPOINT_CATALOG_APP_SSL
  },
  ordering: {
    path: env.ENDPOINT_ORDERING_PATH,
    host: env.ENDPOINT_ORDERING_HOST,
    port: env.ENDPOINT_ORDERING_PORT,
    appSsl: env.ENDPOINT_ORDERING_APP_SSL
  },
  inventory: {
    path: env.ENDPOINT_INVENTORY_PATH,
    host: env.ENDPOINT_INVENTORY_HOST,
    port: env.ENDPOINT_INVENTORY_PORT,
    appSsl: env.ENDPOINT_INVENTORY_APP_SSL
  },
  charging: {
    path: env.ENDPOINT_CHARGING_PATH,
    host: env.ENDPOINT_CHARGING_HOST,
    port: env.ENDPOINT_CHARGING_PORT,
    appSsl: env.ENDPOINT_CHARGING_APP_SSL
  },
  rss: {
    path: env.ENDPOINT_RSS_PATH,
    host: env.ENDPOINT_RSS_HOST,
    port: env.ENDPOINT_RSS_PORT,
    appSsl: env.ENDPOINT_RSS_APP_SSL
  },
  party: {
    path: env.ENDPOINT_PARTY_PATH,
    host: env.ENDPOINT_PARTY_HOST,
    port: env.ENDPOINT_PARTY_PORT,
    appSsl: env.ENDPOINT_PARTY_APP_SSL
  },
  billing: {
    path: env.ENDPOINT_BILLING_PATH,
    host: env.ENDPOINT_BILLING_HOST,
    port: env.ENDPOINT_BILLING_PORT,
    appSsl: env.ENDPOINT_BILLING_APP_SSL
  },
  customer: {
    path: env.ENDPOINT_CUSTOMER_PATH,
    host: env.ENDPOINT_CUSTOMER_HOST,
    port: env.ENDPOINT_CUSTOMER_PORT,
    appSsl: env.ENDPOINT_CUSTOMER_APP_SSL
  },
  usage: {
    path: env.ENDPOINT_USAGE_PATH,
    host: env.ENDPOINT_USAGE_HOST,
    port: env.ENDPOINT_USAGE_PORT,
    appSsl: env.ENDPOINT_USAGE_APP_SSL
  },
  sla: {
    path: env.ENDPOINT_SLA_PATH,
    host: env.ENDPOINT_SLA_HOST,
    port: firstOf(env.ENDPOINT_SLA_PORT, env.PORT),
    appSsl: env.ENDPOINT_SLA_APP_SSL
  },
  reputation: {
    path: env.ENDPOINT_REPUTATION_PATH,
    host: env.ENDPOINT_REPUTATION_HOST,
    port: firstOf(env.ENDPOINT_REPUTATION_PORT, env.PORT),
    appSsl: env.ENDPOINT_REPUTATION_APP_SSL
  }
};

module.exports = config;
