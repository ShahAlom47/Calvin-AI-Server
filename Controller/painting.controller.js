const { default: axios } = require("axios")
const { db } = require("../utils/DB-connect")
const getImageData = require("../utils/getImageData")
const getImageUrl = require("../utils/getImageUrl")
const { ObjectId } = require("mongodb")

const paintingCollection = db.collection('generatedPaintings')

const painting = async (req, res) => {
    const result =await paintingCollection.find().toArray()
    res.send(result)

}
const paintingGenerate = async (req, res) => {
    const { body } = req || {}
    const { prompt, userEmail, category, type } = body || {}
    const finalPrompt= `generate a beautiful ${type} ${category} painting about ${prompt}`
    const buffer = await getImageData(finalPrompt);
    const imgData = await getImageUrl(buffer, prompt)

    const paintingData = {
        userEmail: userEmail,
        prompt: prompt,
        category: category,
        type: type,
        title: imgData?.data?.title,
        display_url: imgData?.data?.display_url,
        url: imgData?.data?.thumb?.url,
        medium_url: imgData?.data?.medium?.url,
        date: new Date(),
        details:prompt,

    }

    if (imgData) {
        const response = await paintingCollection.insertOne(paintingData)
        console.log(response, paintingData);
     
        res.send(response)
    }

}

const getSinglePainting=async(req,res)=>{
const {id}=req.params
const query= {_id: new ObjectId(id)}
const result = await paintingCollection.findOne(query)
res.send(result)

}
module.exports = {
    painting,
    paintingGenerate,
    getSinglePainting,

}