Config = {}

-- Script locale (only .Lua)
Config.Locale = 'en'

FixePhone = {
  -- Mission Row
  ['911'] = { 
    name =  ('mission_row'), 
    coords = { x = 441.2, y = -979.7, z = 30.58 } 
  },
  
  ['008-0001'] = {
    name = ('phone_booth'),
    coords = { x = 372.25, y = -965.75, z = 28.58 } 
  },
}

Config.KeyOpenClose = 288 -- F1
Config.KeyTakeCall  = 38  -- E

Config.UseMumbleVoIP = true -- Use Frazzle's Mumble-VoIP Resource (Recommended!) https://github.com/FrazzIe/mumble-voip
Config.UseTokoVoIP   = false

Config.ShowNumberNotification = false -- Show Number or Contact Name when you receive new SMS