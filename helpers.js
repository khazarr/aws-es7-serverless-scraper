const cheerio = require('cheerio');

function getCurrentWPVer(html) {
  const $ = cheerio.load(html)
  const downloadButton = $('p.download-meta > a > strong')
  const extracted = downloadButton.text().substr(-5)
  return extracted
}

function getCurrentPluginVer(html) {
  const $ = cheerio.load(html)
  const data = $('div.widget.plugin-meta > ul > li:nth-child(1)').text()
  return data.split(' ')[1]
}


module.exports = {
  getCurrentWPVer,
  getCurrentPluginVer
};
