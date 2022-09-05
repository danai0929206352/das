const functions = require('firebase-functions')
const axios = require('axios')

const RICH_MENU_ID = 'richmenu-3b4fc51783ea34d3b104d0845459ada5' // แทนด้วย Rich Menu ID ที่ต้องการแสดง
const LINE_CHANNEL_ACCESS_TOKEN = 'iyVbWPSqkSoIS2cl6FckC7G1+BWuw6sZGSn4Na+sDzg9rqG8aEG9G4mmSzoq9JAlusTHOkQh85HeCn7XD2r5tHV20TJAMHLvSVqCsLsGWp1OSgd9crWOUYy/1XoUiIRwm77XXEBP9bWwG8XlMrO7TAdB04t89/1O/w1cDnyilFU=' // แทนด้วยค่า Channel access token
const region = 'asia-southeast1'

exports.lineWebhooks = functions.region(region).https.onRequest(async (req, res) => {
  if (req.body.events[0] && req.body.events[0].type === 'follow') {
    const lineUserID = req.body.events[0].source.userId

    const config = {
      method: 'post',
      url: `https://api.line.me/v2/bot/user/${lineUserID}/richmenu/${RICH_MENU_ID}`,
      headers: {
        Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`
      }
    }
    await axios(config)
  }

  return res.status(200).send('OK')
})