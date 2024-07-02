const dotenv = require("dotenv");
const path = require("path");

// Détermine le fichier .env à utiliser en fonction de NODE_ENV
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

// Charge les variables d'environnement
dotenv.config({ path: path.resolve(process.cwd(), ENV_FILE_NAME) });

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

//console.log('REDIS_URL:', REDIS_URL); // Vérification de la variable REDIS_URL

// CORS configuration
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

// Base de données et Redis configuration
const DATABASE_URL = process.env.DATABASE_URL || "postgres://user:password@localhost:5432/mydatabase";

//console.log('DATABASE_URL:', DATABASE_URL);
//console.log('ADMIN_CORS:', ADMIN_CORS);
//console.log('STORE_CORS:', STORE_CORS);

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

const projectConfig = {
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  database_type: "postgres",
  admin_cors: ADMIN_CORS,
  redis_url: REDIS_URL,
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
    },
    //production
    database_extra: process.env.NODE_ENV !== "development" ?
      {
        ssl: {
          rejectUnauthorized: false,
        },
      } : {},
  }
};

//console.log('projectConfig:', projectConfig);

const modules = {
  eventBus: {
    //resolve: "@medusajs/event-bus-local",
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: process.env.REDIS_URL, // Utilisation de la variable REDIS_URL
    },
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: process.env.REDIS_URL, // Utilisation de la variable REDIS_URL
      ttl: 30, // Si défini à 0, le module ne mettra pas les éléments en cache.
    },
  },
};

//console.log('modules:', modules);

module.exports = {
  projectConfig,
  plugins,
  modules,
};
