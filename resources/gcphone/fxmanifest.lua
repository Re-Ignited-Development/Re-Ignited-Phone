fx_version 'bodacious'
game 'gta5'

author 'BTNGaming, (Original: n3mtv)'
description 'Re-Ignited GCPhone for ESX'
version '1.2'

ui_page 'html/index.html'

files {
	'html/index.html',
	'html/static/css/app.css',
	'html/static/js/app.js',
	'html/static/js/manifest.js',
	'html/static/js/vendor.js',

	'html/static/config/config.json',
	
	-- Coque
	'html/static/img/coque/*.png',
	'html/static/img/coque/*.jpg',
	
	-- Background
	'html/static/img/background/*.jpg',
	'html/static/img/background/*.png',
	
	'html/static/img/icons_app/*.png',
	'html/static/img/icons_app/*.jpg',
	
	'html/static/img/app_bank/*.jpg',
	'html/static/img/app_bank/*.png',

	'html/static/img/app_tchat/*.png',
	'html/static/img/app_tchat/*.jpg',

	'html/static/img/twitter/*.png',
	'html/static/img/twitter/*.jpg',
	'html/static/sound/*.ogg',

	'html/static/img/*.png',
	'html/static/img/*.jpg',
	'html/static/fonts/fontawesome-webfont.ttf',

	'html/static/sound/*.ogg',
	'html/static/sound/*.mp3',

}

client_scripts {
	'client/esxaddonsgcphone-c.lua',
	'client/animation.lua',
	'client/client.lua',
	'client/photo.lua',
	'client/app_tchat.lua',
	'client/bank.lua',
	'client/twitter.lua'
}

shared_scripts {
	'@es_extended/locale.lua',
    'locales/*.lua',
	'config.lua',
}

server_scripts {
	'@mysql-async/lib/MySQL.lua',
	'server/esxaddonsgcphone-s.lua',
	'server/server.lua',
	'server/app_tchat.lua',
	'server/twitter.lua'
}
