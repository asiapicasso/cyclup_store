const dotenv = require("dotenv");
const path = require("path");

console.log('REDIS_URL:', REDIS_URL);

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) { }

// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://user:password@localhost:5432/mydatabase";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  {
    resolve: "@medusajs/admin",
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },
];

const modules = {
  eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redis_url: REDIS_URL,
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redis_url: REDIS_URL,
      ttl: 30, //If it's set to 0, the module will skip adding the items to the cache.
    },
  },
};

const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL, //pour qu'il puisse lier correctement la base de données
  admin_cors: ADMIN_CORS,
  database_extra: {
    type: "postgres",
    url: DATABASE_URL,
    synchronize: false,
    logging: true,
    entities: [
      path.join(__dirname, "src/models/*.js")
    ],
    migrations: [
      path.join(__dirname, "src/migrations/*.js")
    ],
    subscribers: [
      path.join(__dirname, "src/subscribers/*.js")
    ],
    cli: {
      migrationsDir: "src/migrations"
    }
  },
  redis_url: REDIS_URL || "redis://localhost:6379", //pour ne pas utiliser un fake redis
};

module.exports = {
  projectConfig,
  plugins,
  modules,
};
