import { connectToDb } from "./db/db";
import app from "./app/app";

async function main() {
  try {
    
    await connectToDb(process.env.MONGO_URI as string);
    app.listen(process.env.PORT, () =>
      console.log(`app is runnng on port ${process.env.PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
}

main();
