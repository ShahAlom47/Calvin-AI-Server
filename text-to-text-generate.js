
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.CALVIN_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


const form = `

  <form method="POST" action="/prompt"> 
   <textarea name="prompt" id="prompt"></textarea>
   <button type="submit">Generate text </button>
  </form>


`;


app.use(express.urlencoded({ extended: true }));

app.get("/prompt", async (req, res) => {
  res.send(form);
});


app.post('/prompt', async (req, res) => {
    let { prompt } = req.body;

    // const prompt = "make a a story for me about developers "

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();


    res.send({data:text,status:200})
})
