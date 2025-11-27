module.exports = {
  // Use env var in Docker, fallback to localhost for local dev
  url: process.env.MONGO_URL || "mongodb://localhost:27017/dd_db"
};







