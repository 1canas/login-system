import app from "./app";

app.listen(process.env.MAIN_PORT, () => {
    console.log(`Server starts on localhost:${process.env.MAIN_PORT} port`);
});