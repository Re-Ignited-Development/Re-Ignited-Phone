Config = {}

-- Script locale (only .Lua)
Config.Locale = 'en'

Config.FixePhone = {
  -- Mission Row
  ['911'] = { 
    name =  _U('mission_row'), 
    coords = { x = 441.2, y = -979.7, z = 30.58 } 
  },
  
  ['008-0001'] = {
    name = _U('phone_booth'),
    coords = { x = 372.25, y = -965.75, z = 28.58 } 
  },
}

-- TEMPORARILY ONLY WORKS IN es_extended 1.1 and older, Fixing this in the next couple of days, forgot something in the code. --

Config.newESX = false -- True = ESX 1.2(v1final), False = ESX 1.1 and older. (NOT WORKING YET, FORGOT SOMETHING IN CODE, HAVE TO FIND IT)

Config.KeyOpenClose = 288 -- F1
Config.KeyTakeCall  = 38  -- E

Config.UseMumbleVoIP = false -- Use Frazzle's Mumble-VoIP Resource (Recommended!) https://github.com/FrazzIe/mumble-voip
Config.UseTokoVoIP   = false

Config.ShowNumberNotification = false -- Show Number or Contact Name when you receive new SMS

Config.ShareRealtimeGPSDefaultTimeInMs = 1000 * 60 -- Set default realtime GPS sharing expiration time in milliseconds

-- Optional Features (Can all be set to true or false.)
Config.ItemRequired = false -- If true, must have the item "phone" to use it.
Config.NoPhoneWarning = false -- If true, the player is warned when trying to open the phone that they need a phone. To edit this message go to the locales for your language.
