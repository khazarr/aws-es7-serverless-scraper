//---- mock plugin structure--------------------------
const pluginData = [
  {
    name: 'disable-comments',
    url: 'https://pl.wordpress.org/plugins/disable-comments/'
  },
  {
    name: 'wp-hide-post',
    url: 'https://pl.wordpress.org/plugins/wp-hide-post/'
  },
  {
    name: 'disqus-comment-system',
    url: 'https://pl.wordpress.org/plugins/disqus-comment-system/'
  },
  {
    name: 'polylang',
    url: 'https://pl.wordpress.org/plugins/polylang/'
  },
  {
    name: 'wp-hide-post',
    url: 'https://pl.wordpress.org/plugins/wp-hide-post/'
  },
]
//--------------------------------------------


const { getCurrentWPVer, getCurrentPluginVer } = require('./helpers');
const request = require('axios');
let pluginsToday, wpToday, pluginsYesterday, wpYesterday;

export const hello = async (event, context, callback) => {
  const response = {
    statusCode: 200,
  };

  pluginsToday = await getAllPluginsVersion(pluginData)
  response.plugins = pluginsToday

  wpToday = await getWpVer()
  response.wp = wpToday;

  //get yesterday db data

  //compare data

  //if data differ SNS

  //delete old & save new data

  callback(null, response);
};





async function getWpVer() {
  const wpPage = await request('https://wordpress.org/download/')
  const obtained = getCurrentWPVer(wpPage.data)
  return obtained
}

async function getPluginVer(url) {
  const pageData = await request(url)
  const obtained = getCurrentPluginVer(pageData.data)
  return obtained
}

const getAllPluginsVersion = (myArray) => {
    const promises = myArray.map(async (plugin) => {
        return {
            name: plugin.name,
            ver: await getPluginVer(plugin.url)
        }
    });
    return Promise.all(promises);
}
