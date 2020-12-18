ServerConfig = {}
-- This is to be used only for config information used by the server, not client.

ServerConfig.ShareRealtimeGPSDefaultTimeInMs = 1000 * 60 -- Set default realtime GPS sharing expiration time in milliseconds
ServerConfig.newESX = false -- sets new esx
ServerConfig.ShareRealtimeGPSJobTimer = 10 -- Default Job GPS Timer (Minutes)

-- Optional Discord Logging
ServerConfig.UseDiscordLogging = false -- Work in progress. Functions are limited to twitter.
ServerConfig.Discord_Webhook = 'https://discord.com/api/webhooks/' -- Set Discord Webhook. See https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks
