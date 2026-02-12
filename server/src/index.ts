const express = require('express');
const { google } = require('googleapis');
var cors = require('cors')
require('dotenv').config();
import { Request, Response } from "express";
const app = express();

app.use(cors());

const googleClient = new google.auth.OAuth2(
	process.env.GOOGLE_CLIENT_ID,
	process.env.GOOGLE_CLIENT_SECRET,
	"http://localhost:8080/auth/google",
)

const gmailScopes = [
	"openid",
	"email",
	"profile",
	"https://www.googleapis.com/auth/gmail.compose"
];

const spreadSheetScopes = [
	"openid",
	"email",
	"profile",
	"https://www.googleapis.com/auth/spreadsheets"
]

app.get('/health', (req: Request, res: Response) => {
	console.log(`health check: ${req}`)
	res.send('ok');
})

app.get('/redirect/gmail', (req: Request, res: Response) => {

	const url = googleClient.generateAuthUrl({
		access_type: 'offline',
		scope: gmailScopes,
		prompt: "consent",
	})

	res.status(300).redirect(url);
})

app.get('/redirect/spreadsheet', (req: Request, res: Response) => {
	const url = googleClient.generateAuthUrl({
		access_type: 'offline',
		scope: spreadSheetScopes,
		prompt: "consent",
	})

	res.status(300).redirect(url);
})

app.get('/auth/google', async (req: Request, res: Response) => {
	const code = req.query.code;

	if (code == undefined) {
		res.status(400).send('error');
		return;
	}

	const { tokens } = await googleClient.getToken(code)
	console.log(tokens);

	res.status(300).redirect("http://localhost:3000");
})

app.listen(8080, () => {
	console.log("server started on port 8080.");
})
