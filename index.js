const {getLinks, getNazm} = require('./scraper')
const fs = require('fs');

const SEARCH_TERM = 'water'
const url = `https://www.rekhta.org/search/nazm?q=${SEARCH_TERM}`

getLinks(url)
.then((links)=>{
    // console.log(links)
    const getNazms = links.map((link) => {
        const fullNazmURL = `https://www.rekhta.org${link}?lang=hi`
        return getNazm(fullNazmURL)
    })
    return Promise.all(getNazms)
    .then((nazms) => {
        // console.log(nazms)
        const nazmTxt = JSON.stringify(nazms,  null, 2);
        const cleanNazmTxt = nazmTxt.replace(/(\r\n|\n|\r)/gm, "");
        fs.writeFile('nazms.json', cleanNazmTxt, 'utf8', (err)=>{
            if (err){
                console.log(err)
            }
        });
    })
})
.catch((err) => {
    console.log('Error : Could not fetch nazms')
})
