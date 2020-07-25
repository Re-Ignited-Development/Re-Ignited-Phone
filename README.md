<h2 align="center">WILL REWRITE ALL OF THIS AS SOON AS THE PHONE IS WORKING FULLY (BTNGaming)</h2>

## ReDesign & Functionality project by BTNGaming and ItsChip!


### [Downloads page](https://github.com/btngaming/gcredesign)

<h2 align="center">GCPhone Redesign for FiveM</h2>

![Image of gcphone1](https://i.imgur.com/naTiBgI.png)
![Image of gcphone2](https://i.imgur.com/LAicovK.png)
![Image of gcphone3](https://i.imgur.com/imWPohA.png)
![Image of gcphone4](https://i.imgur.com/rzWdDMy.png)
![Image of gcphone5](https://i.imgur.com/9h7eiI8.png)

## Features
   - Full contacts list.
   - Sending text messages.
   - Voice calls
   - Anonymous calling
   - Bank application
   - Anonymous Chat application
   - Stock market application (With full functionality soon)
   - Customizable cover / screen
   - Add Contacts from recent text messages.


## Configuration


### Edit File /html/static/config/config.json
```json
{
  "//": "Name your mobile provider here (Top left of phone)",
  "reseau": "Gannon",
  
  "//": "Choose the base color of your phone.",
  "themeColor": "#303f9f",

  "//": "Color list for contacts.",
  "colors": [
    "#EF5350",
    "#EC407A",
    "#AB47BC",
    "#7E57C2",
    "#5C6BC0",
    "#42A5F5",
    "#29B6F6",
    "#26C6DA",
    "#26A69A",
    "#66BB6A",
    "#9CCC65",
    "#D4E157",
    "#FFCA28",
    "#FFA726",
    "#FF7043",
    "#8D6E63",
    "#78909C"
  ],

  "//": "If false add a '-' In the number (###-####)",
  "useFormatNumberFrance": false,

  "//": "useWebRTCVocal: false => Calls via GTA channels",
  "//": "useWebRTCVocal: true  => Calls via WebRTC",
  "useWebRTCVocal": true,

  "//": "Configuration of the TURN servers used.",
  "RTCConfig": {
    "iceServers": [{
      "urls": ["turn:btngaming.com"],
      "username": "rtcusername",
      "credential": "rtcpassword"
    }]
  },


  "//": "List of available wallpapers, location => /html/static/img/background",
  "background" : {
    "Calvin & Hobbes": "back001.jpg",
    "Destiny": "back002.jpg",
    "Stormtrooper": "back003.jpg",
    "Custom URL": "URL"
  },
  "//": "Fond d'ecran par default",
  "background_default": {
    "label": "Calvin & Hobbes",
    "value": "back001.jpg"
  },

  "//": "List of available phone styles, location => /html/static/img/coque",
  "coque": {
    "Sansumg S8": "s8.png",
    "Iphone X": "iphonex.png",
    "Brick Base": "base.png",
    "Transparent": "transparent.png"
  },
  "//": "Coque par default",
  "coque_default": {
    "label": "Sansumg S8",
    "value": "s8.png"
  },

  "//": "Configuration of service calls (Favorites)",
  "serviceCall": [
    {

      "//": "Display Name",
      "display": "Police",

      "//": "Optional: Icon/Logo color",
      "backgroundColor": "red",

      "//": "Optional: Image for Icon/Logo of contact",
      "icon": "/html/static/img/icons_app/bank.png",

      "//": "List of available Actions",
      "subMenu": [
        {
          "//": "Title of Action",
          "title": "Send a Message",

          "//": "Name of Event Trigger Used.",
          "eventName": "esx_addons_gcphone:call",

          "//": "Optional: Data parameters sent with event.",
          "type": {
            "number": "police"
          }
        },
        {
          "title": "Call the Police Station",
          "eventName": "gcphone:autoCallNumber",
          "type": {
            "number": "911"
          }
        }
      ]
    },
    {
      "display": "Ambulance",
      "backgroundColor": "red",
      "subMenu": [
        {
          "title": "Send a Message",
          "eventName": "esx_addons_gcphone:call",
          "type": {
            "number": "ambulance"
          }
        }
      ]
    }
  ],
  
  "//": "Add Default (Favorite) Contacts",
  "defaultContacts": [
    { "number": "ambulance" , "display": "AABBUULLAANNCCEE", "icon": "/html/static/img/icons_app/bank.png" },
    { "number": "police" , "display": "Police", "backgroundColor": "blue", "letter": "J" }
  ],

  "//": "Configuration for APPS",
  "apps": [
    {
      "//": "Name of Application",
      "name": "Telephone",

      "//": "Icon for Application",
      "icons": "/html/static/img/icons_app/call.png",

      "//": "Application route, DO NOT MODIFY",
      "routeName": "appels",

      "//": "If true, This will put an icon on your phones home screen.",
      "inHomePage": true,

      "//": "If false, this will disable the application server wide.",
      "enabled": true
    },
    {
      "name": "Messages",
      "icons": "/html/static/img/icons_app/sms.png",
      "routeName": "messages",
      "inHomePage": true,

      "//": "Store reference, to display a bullet under the app icon",
      "puceRef": "nbMessagesUnread",
    },
    {
      "name": "Contacts",
      "icons": "/html/static/img/icons_app/contacts.png",
      "routeName": "contacts",
      "inHomePage": true
    },
    {
      "name": "Paramètres",
      "icons": "/html/static/img/icons_app/settings.png",
      "routeName": "parametre",
      "inHomePage": true
    },
    {
      "name": "Bank",
      "icons": "/html/static/img/icons_app/bank.png",
      "routeName": "bank",
      "inHomePage": false
    },
    {
      "name": "Bourse",
      "icons": "/html/static/img/icons_app/bourse.png",
      "routeName": "bourse",
      "enabled": true
    },
    {
      "name": "Photo",
      "icons": "/html/static/img/icons_app/photo.png",
      "routeName": "photo"
    },
    {
      "name": "Dark Chat",
      "icons": "/html/static/img/icons_app/tchat.png",
      "routeName": "tchat"
    }
  ],
  
  "//": "Configuration des langues du telephone",
  "language": {
    "fr_FR": {
      "NAME": "Français",
      "KEY": "VALUE"
    },
    "en_US": {
      "NAME": "English",
      "//": "..."
    },
    "//": "Autre Langue"
  }
}

```
*Don't forget to add the new files in the fxmanifest.lua *


* You can modify the sounds in \ html \ static \ sound
* The shells must be in 1000x500 px format, the screen area is centered in size 800 * 400
* Bank & Stock Market applications must be configured according to your scripts
### Fixed stations(phone numbers) can be configured in gcphone/config.lua
```LUA
--[[
  Be careful not to use a number that conflicts with a player
--]]
FixePhone = {
  -- Number for Police (With coordinates of the phone on the desk.)
  ['911'] = { name =  "Central Police", coords = { x = 441.2, y = -979.7, z = 30.58 } },
  
  -- Cabin near the police station
  ['008-0001'] = { name = "Cabin Phone", coords = { x = 372.25, y = -965.75, z = 28.58 } },
}
```


## About esx_addons_gcphone
Used to make the connection between the telephone and the ESX trades.

Please put esx_addons_gcphone & gcphone before jobs.
Exemple :
```yml
  # ...

  start mysql-async
  start essentialmode
  start esplugin_mysql
  start es_extended

  start esx_addons_gcphone
  start gcphone

  start esx_mecanojob
  start esx_job2
  start esx_job3
  # ...
```

## License
[GNU v3](https://opensource.org/licenses/gpl-3.0.html)

Originally: Jonathan (Gannon) D
New & Updated: BTNGaming & ItsChip
