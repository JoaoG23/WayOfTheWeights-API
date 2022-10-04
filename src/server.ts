import app from './app';

app.listen(process.env.PORT_SERVER || 3210, () => {
    console.info(`🌍 Ambiente: ${process.env.NODE_ENV}, Servidor rodando na porta /localhost: ${process.env.PORT_SERVER}`)
});