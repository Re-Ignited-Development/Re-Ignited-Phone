--====================================================================================
--  Function APP BANK
--====================================================================================

--[[
      Appeller SendNUIMessage({event = 'updateBankbalance', banking = xxxx})
      à la connection & à chaque changement du compte
--]]

-- ES / ESX Implementation

local bank = 0
local firstname = ''
function setBankBalance (value)
      bank = value
      SendNUIMessage({event = 'updateBankbalance', banking = bank})
end

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(playerData)
      local accounts = playerData.accounts or {}
      for index, account in ipairs(accounts) do 
            if account.name == 'bank' then
                  setBankBalance(account.money)
                  break
            end
      end
end)

RegisterNetEvent('esx:setAccountMoney')
AddEventHandler('esx:setAccountMoney', function(account)
      if account.name == 'bank' then
            setBankBalance(account.money)
      end
end)

RegisterNetEvent("es:addedBank")
AddEventHandler("es:addedBank", function(m)
      setBankBalance(bank + m)
end)

RegisterNetEvent("es:removedBank")
AddEventHandler("es:removedBank", function(m)
      setBankBalance(bank - m)
end)

RegisterNetEvent('es:displayBank')
AddEventHandler('es:displayBank', function(bank)
      setBankBalance(bank)
end)



--===============================================
--==         Transfer Event                    ==
--===============================================
-- route request to custom gcphone resource that handles phone numbers and offline functionality
AddEventHandler('gcphone:bankTransferByPhoneNumber', function(data)
      TriggerServerEvent('gcPhone:bankTransferByPhoneNumber', data.phoneNumber, data.amount)
      TriggerServerEvent('bank:balance')
end)

-- route request to the banking resource, this is the nominal path
AddEventHandler('gcphone:bankTransferById', function(data)
      TriggerServerEvent('bank:transfer', tonumber(data.id), tonumber(data.amount))
      TriggerServerEvent('bank:balance')
end)