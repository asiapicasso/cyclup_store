/*const express = require("express")
const { GracefulShutdownServer } = require("medusa-core-utils")
const customRoutes = require(path.resolve(__dirname, './src/server')); // Assurez-vous que le chemin est correct


const loaders = require("@medusajs/medusa/dist/loaders/index").default

  ; (async () => {
    async function start() {
      const app = express()
      const directory = process.cwd()

      app.use('/custom', customRoutes);

      app.get('/', (req, res) => {


        console.error("hi something happen there")
        res.send('Server is running');
      });

      try {
        const { container } = await loaders({
          directory,
          expressApp: app
        })
        const configModule = container.resolve("configModule")
        const port = process.env.PORT ?? configModule.projectConfig.port ?? 9000

        const server = GracefulShutdownServer.create(
          app.listen(port, (err) => {
            if (err) {
              return
            }
            console.log(`Server is ready on port: ${port}`)
          })
        )

        // Handle graceful shutdown
        const gracefulShutDown = () => {
          server
            .shutdown()
            .then(() => {
              console.info("Gracefully stopping the server.")
              process.exit(0)
            })
            .catch((e) => {
              console.error("Error received when shutting down the server.", e)
              process.exit(1)
            })
        }
        process.on("SIGTERM", gracefulShutDown)
        process.on("SIGINT", gracefulShutDown)
      } catch (err) {
        console.error("Error starting server", err)
        process.exit(1)
      }
    }

    await start()
  })()
*/

const path = require('path');
const express = require('express');
const { GracefulShutdownServer } = require('medusa-core-utils');
const loaders = require('@medusajs/medusa/dist/loaders/index').default;
const customRoutes = require(path.resolve(__dirname, './src/server')); // Assurez-vous que le chemin est correct

(async () => {
  async function start() {
    const app = express();

    app.use(express.json()); // Ajout du middleware pour analyser le JSON

    // Utilisation des routes personnalisées
    app.use('/custom', customRoutes);

    // Définir une route de base pour vérifier que le serveur fonctionne
    app.get('/', (req, res) => {
      res.send('Server is running');
    });

    const directory = process.cwd();

    try {
      const { container } = await loaders({
        directory,
        expressApp: app
      });

      // Enregistrer les routes de l'API
      require(path.resolve(__dirname, './src/api'))(app);

      const configModule = container.resolve('configModule');
      const port = process.env.PORT ?? configModule.projectConfig.port ?? 9000;

      const server = GracefulShutdownServer.create(
        app.listen(port, (err) => {
          if (err) {
            return;
          }
          console.log(`Server is ready on port: ${port}`);
        })
      );

      // Gestion de l'arrêt gracieux
      const gracefulShutDown = () => {
        server
          .shutdown()
          .then(() => {
            console.info('Gracefully stopping the server.');
            process.exit(0);
          })
          .catch((e) => {
            console.error('Error received when shutting down the server.', e);
            process.exit(1);
          });
      };
      process.on('SIGTERM', gracefulShutDown);
      process.on('SIGINT', gracefulShutDown);
    } catch (err) {
      console.error('Error starting server', err);
      process.exit(1);
    }
  }

  await start();
})(); 