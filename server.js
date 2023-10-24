const express = require("express");
const yahooAPI2 = require("./yahoo.js"); // Update the path accordingly

const app = express();
const port = 3000; // Choose a port for your server

app.use(express.json());

app.get("/getSummary", async (req, res) => {
	try {
		const { symbols } = req.query;
		if (!symbols || !Array.isArray(symbols)) {
			return res.status(400).json({ error: "Invalid input" });
		}

		const summary = await yahooAPI2.getSummary(symbols);

		res.json(summary);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
