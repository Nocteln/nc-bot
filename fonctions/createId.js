module.exports = async prefix => {
    
    let characters = [..."ABCDEFGHIJKLMNOPQRCTUVWXYZ0123456789"]
    let ID = []
    for(let i = 0; i < 10; i++) ID.push(characters[Math.floor(Math.random() * characters.length)])


    return `${prefix}-${ID.join("")}`

}