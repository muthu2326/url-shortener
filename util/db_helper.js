export const findURLCode = (urlCode) =>{

    let code = await Url.findOne({
        urlCode
    })

    return code
}