import app from "./app";

const port = process.env.MAIN_PORT ?? 3000;

app.listen(port, () => {
    console.log(`Server starts on localhost:${port} port`);
});