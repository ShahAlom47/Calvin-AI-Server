const getImageData = async (prompt) => {
    const form = new FormData()
    form.append('prompt', prompt)

    const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
        method: 'POST',
        headers: {
            // 'x-api-key': process.env.AI_API_KEY,
            'x-api-key':'b436d60fa79005eb376fffdfbefe81acfefd03a6494f4ad981adea6c789ce97e816a3507e2db9e41ec1a401a46b8dd51',
        },
        body: form,
    })

    const buffer = await response.arrayBuffer()

    return buffer


}

module.exports = getImageData