const { default: axios } = require("axios")

const getImageUrl =async (buffer,prompt)=>{
    const imgFormData= new FormData();
    imgFormData.append(
        "image",
        new Blob([buffer],{type:"image,jpeg"}),
        `${prompt}.jpg`
    );

   
const res =await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_KEY}`,imgFormData) 
const data = res.data;
return data
}

module.exports=getImageUrl