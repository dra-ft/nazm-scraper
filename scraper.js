const rp = require('request-promise')
const cheerio = require('cheerio');

const getLinks = (url) => {
    return rp(url)
    .then((html)=>{
        // console.log(html)
        const $ = cheerio.load(html)
        const nazmLinks = $('div[class=genricMatchCard] > p > a', html).map((i, x) => $(x).attr('href')).toArray()
        return nazmLinks;
    })
    .catch((err) =>{
        console.log('Error: could not fetch HTML ', err)
    })
    
}

const getNazm =  (nazmUrl) => {
    return rp(nazmUrl)
    .then((html) => {
        const $ = cheerio.load(html)
        
        const poemBody = $('.poemPageContentBody')
        return poemBody.text()
    })
    .catch((err)=>{
        console.log('Error : fetching nazm', err)
    })
}

module.exports = {
    getLinks, getNazm
}

