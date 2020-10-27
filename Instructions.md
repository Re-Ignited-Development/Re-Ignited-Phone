# Installation 
> 1. Download the release for your ESX version (ESX 1.1 & ESX 1.2) from [Releases](https://github.com/Re-Ignited-Development/Re-Ignited-Phone/releases)
> 2. Copy/Drag the **gcphone** folder into your server resources folder. (You no longer need esx_addons_gcphone as it was merged with the phone)
> 3. Import the following SQL's: `base.sql` and `twitter.sql` **(This is the same as the other versions.)** (Locales available in the sql folder.)
> 4. Add the following to your server.cfg **AFTER es_extended** & **BEFORE any jobs**. (Such as esx_ambulancejob, esx_policejob etc...)

``` 
ensure gcphone
```

> 5. Start your server.

# Notes
-**No changes to fxmanifest is needed when adding new images to the resource due to Globbing. Can read more about this [here](https://docs.fivem.net/docs/scripting-reference/resource-manifest/resource-manifest/#globbing "FIveM Globbing Information")**.

-**You need to ensure the resource is started before your jobs otherwise features that interact with them may not work.**

-**The following should remain false`"useWebRTCVocal": false` as it doesn't work with onesync anymore.**

-**You need [Screenshot Basic](https://github.com/citizenfx/screenshot-basic "Screnshot Basic") to take selfies/photos. Otherwise, set `"enableTakePhoto": true,` to `false`**


## Configuration (Keybind)
> 1. Navigate to `gcphone > config.lua` line `23`
> 2. Change `288` to your desired keybind. Default is `F1`. See [FIveM Key Mapping](https://docs.fivem.net/docs/game-references/controls/ "FIveM Key Mapping") for reference.

## Configuration (Default Language)
> 1. Navigate to `gcphone > html > static > config.json` and search for `"defaultLanguage": "en_US",`
> 2. Below that line, you'll see `"language": {` this is the location of current translations. If you don't see yours here you'll need to add your own translations. Current languages are as followed:
```
en_US (English)
fr_FR (Français)
de_DE (Deutsch)
pl_PL (Polish)
es_ES (Spanish)
cs_CZ (Čeština)
```
> 3. Choosing one of the above previations, change `"defaultLanguage": "en_US",` to your desired one.

## Configuration (Cell Provider)
> 1. Navigate to `gcphone > html > static > config.json` and search for `"reseau": "ReIgnited Mobile",`
> 2. Change `"reseau": "ReIgnited Mobile",` to your desired carrier.

## Configuration (Number Format)
> 1. Navigate to `gcphone > html > static > config.json` and search for ` "useFormatNumberFrance": false,`
> 2. Setting it to false gives you a number like `xxx-xxxx` while true gives you `xxxxxxx`.

## Configuration (Message Warning)
> 1. Navigate to `gcphone > html > static > config.json` and at the top you'll see `"warningMessageCount": 999,`
> 2. This is the notification a player recieves to delete messahes. It's currently set to max.

## Configuration (New Ringtone)
> 1. Navigate to `gcphone > html > static > sound` and save your new sound here. **The sound must be an .ogg or .mp3 file. (.ogg recomended)**
> 2. Navigate to `gcphone > html > static > config.json` and search for ` "sonido": {`
> 3. Add your new sound like so `"DISPLAYNAME": "FILENAME.FILEFORMAT",`. Example:
```
  "sonido": {
    "Astronomia": "ring.ogg",
    "Safaera": "safaera.ogg",
    "Bella Ciao": "bella_ciao.ogg",
    "Casa Papel": "casa_papel.ogg",
    "Iphone 11": "iphone_11.ogg",
    "Tusa": "tusa.ogg",
    "OwO": "OwO.ogg",
    "Dank Ringtone": "dank.ogg",
    "XXXTentacion": "xtentacion.ogg"
  },
```

## Configuration (Remove App)
> 1. Navigate to `gcphone > html > static > config.json` and search for the app name.
> 2. Remove the code that corresponds to it. Example:
```
    {
      "name": "Bourse",
      "fr_FR__name": "Bourse",
      "cs_CZ__name": "Burza",
      "en_US__name": "Stock Market",
      "de_DE__name": "Börse",
      "es_ES__name": "Bolsa",
      "icons": "/html/static/img/icons_app/bourse.png",
      "routeName": "bourse",
      "enabled": true
    },
```
> Note: **If "enabled" is an option, can disable by setting it to false - Otherwise you need to remove the full code of that app as seen above.**

## Configuration (New Wallpaper)
> 1. Navigate to `gcphone > html > static > img > background`
> 2. Place your desired new wallpaper here. Copy the name as you'll need it for step 4.
> 3. Navigate to `gcphone > html > static > config.json` line `42`. **This where backgrounds start.**
> 4. The wallpaper is done as such: `"DISPLAY NAME": "FILENAME.FILEFORMAT",`.
> **5. Ensure the file name corresponds correctly with whats inside `gcphone > html > static > img > background`**

## Configuration (Replace App Icons)
> 1. Navigate to `gcphone > html > static > img > icons_app` and save your new icon here.  Copy the name as you'll need it for step 3,
> 2. Navigate to `gcphone > html > static > config.json` and search for `"icons":`. You'll find 11 results. **Each result corresponds to a specific app.**
> 3. Find your desired app and replace it with the one you added in step 1.

## Configuration (Default Settings)
**The following are default settings for new players that are adjustable within `gcphone > html > static > config.json`:**
> `"background_default": {` Phone Background

> `"coque_default": {` Phone Style

> `"sonido_default": {` Phone Ringtone

> `"defaultContacts": [{` Default contacts

> `"defaultLanguage": "en_US",` Default Language

## Configuration (Adding Default Contact)
> 1. Navigate to `gcphone > html > static > config > config.json`
> 2. Search for `defaultContacts` This is where you add new Default Contacts. See below for details (You caa use letter + backgroundColor instead of icon if you so desire):

```lua
  "defaultContacts": [
    {
      "number": "ambulance",
      "display": "Ambulance",
      "icon": "/html/static/img/icons_app/bank.png"
    },
    {
      "number": "police",
      "display": "Police",
      "backgroundColor": "blue",
      "letter": "P"
    },
    {
      "number": "JOB NAME",
      "display": "DISPLAY NAME",
      "icon": "/html/static/img/icons_app/ICON LINK.png" 
    }
  ],

```
## Configuration (Additional Service Call) 
> This assumes you already have the contact as a default contact.
> 1. Navigate to `gcphone > html > static > config > config.json`
> 2. Search for `serviceCall` This is where you add new prompts. See below for details:
```lua
  "serviceCall": [{
      "display": "Police",
      "icon": "/html/static/img/icons_app/police.png",
      "subMenu": [{
          "title": "Send Message",
          "eventName": "esx_addons_gcphone:call",
          "type": {
            "number": "police"
          }
        },
        {
          "title": "Call Police Station",
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
      "subMenu": [{
        "title": "Send Message",
        "eventName": "esx_addons_gcphone:call",
        "type": {
          "number": "ambulance"
        }
      }]
    },
    {
      "display": "DISPLAY NAME",
      "backgroundColor": "COLOR INSTEAD OF ICON",
      "subMenu": [{
        "title": "Send Message",
        "eventName": "esx_addons_gcphone:call",
        "type": {
          "number": "JOB NAME"
        }
      }]
    },
    {
      "display": "DISPLAY NAME",
      "icon": "/html/static/img/icons_app/ICONNAME.png",
      "subMenu": [{
        "title": "Send Message",
        "eventName": "esx_addons_gcphone:call",
        "type": {
          "number": "JOB NAME"
        }
      }]
    }
  ],
```
> 3. You will need to edit the config.lua if you would like to add aditional preset locations like payphones/pick up locations similiar to PD.
