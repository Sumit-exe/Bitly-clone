import { nanoid } from "nanoid";
import URL from "../models/url.js";

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(404).json({ err: "URL is required" })

    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectURl: body.url,
        visitHistory: [],
        createdBy: req.user._id
    });
    return res.render("home",{
        id:shortId
    })
   
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    console.log(result)
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    })
}
export default {
    handleGenerateNewShortURL,
    handleGetAnalytics
}