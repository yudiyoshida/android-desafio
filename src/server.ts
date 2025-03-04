import http from 'http';
import https from 'https';

import sslOptions from '@config/ssl';
import DataSource from '@database/data-source';
import app from './app';

async function start() {
  try {
    // Checking database connection before running the server.
    await DataSource.$connect();

    const server = (process.env.NODE_ENV === 'production') ? https.createServer(sslOptions, app) : http.createServer(app);
    server.listen(process.env.PORT, () => {
      console.log('Projeto iniciado com sucesso!');
      console.log(`Documentação da API disponível em ${process.env.APP_URL}/swagger`);
    });

  } catch (err: any) {
    console.log('Erro ao iniciar o projeto!');
    console.log(err);

  }
}

start();
