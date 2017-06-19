// @flow
import dotenv from 'dotenv';
import app from './app';
import Debug from 'debug';
import http from 'http';

dotenv.config();

const debug = Debug('server');

const port = normalizePort(process.env.PORT || 3000);
const server = http.createServer(app.callback());


server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort (val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) { return val; }
    if (port >= 0) { return port; }
    return val;
}

function onError (error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        break;
    case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        break;
    default:
        throw error;
    }
    process.exit(1);
}

function onListening () {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
