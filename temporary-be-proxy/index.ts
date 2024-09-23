import express from "express";

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/buses", async (req, res) => {
  try {
    const response = await fetch(
      `https://api.um.warszawa.pl/api/action/busestrams_get/?resource_id=f2e5503e927d-4ad3-9500-4ab9e55deb59&apikey=${process.env.API_KEY}&type=1`
    );
    const data = await response.json();
    const buses = data.result;
    res.json(buses);
  } catch (error) {
    console.error("Error fetching bus data:", error);
    res.status(500).json({ error: "Error fetching bus data" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
