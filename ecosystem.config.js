module.exports = {
    apps: [{
        name: 'mainGuardaRoupa',
        script: './dist/server.js',
        exec_mode: 'cluster',
        instances: 1
    }
],
};