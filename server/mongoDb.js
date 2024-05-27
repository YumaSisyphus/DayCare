const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/daycare"
  //"mongodb+srv://butritnreqica:EwKrYj7B9y586W1G@cluster0.ufzgp4x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
};

async function run() {
  try {
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await mongoose.disconnect();
    console.log(
      "You successfully disconnected to MongoDB!"
    );
  }
}
run().catch(console.dir);
