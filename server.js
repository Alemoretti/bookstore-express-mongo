import "dotenv/config"
import app from './src/app.js';

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log("Server is running on port 3001")
})