const express = require("express");
const yahooAPI = require("./yahoo.js"); // Update the path accordingly

const app = express();
const port = 3000; // Choose a port for your server

app.use(express.json());

app.get("/getSummary", async (req, res) => {
	try {
		const symbols = req.query.symbols;
		if (!symbols) {
			return res.status(400).json({ error: "Invalid input" });
		}

		const symbolsArray = symbols.split(","); // Split the comma-separated symbols into an array

		if (!symbolsArray.length) {
			return res.status(400).json({ error: "Invalid input" });
		}

		const summary = await yahooAPI.getSummary(symbolsArray);

		res.json(summary);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
