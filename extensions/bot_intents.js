module.exports = {

name: "Bot Intents",
isEditorExtension: true,
fields: [],
defaultFields: {
	intents: -2
},

size: function() {
	return { width: 340, height: 520 };
},

html: function(data) {
	if(data.intents === null || data.intents === undefined) {
		data.intents = -2;
	}
	let intents = data.intents >= 0 ? data.intents : 0;
	if(data.intents === -1) {
		intents = 32767;
	} else if(data.intents === -2) {
		intents = 32509;
	}
	return `
	<div style="padding: 10px 10px 10px 10px;">
		<input type="radio" id="All" name="RatioButton" value="All" ${(data.intents === -1) ? "checked" : ""}>
		<label for="All">All Intents ***</label><br>

		<input type="radio" id="NonPrivileged" name="RatioButton" value="NonPrivileged" ${(data.intents === -2) ? "checked" : ""}>
		<label for="NonPrivileged">Non-Privileged</label><br>

		<input type="radio" id="Custom" name="RatioButton" value="Custom" ${(data.intents >= 0) ? "checked" : ""}>
		<label for="Custom">Custom</label><br>

		<hr>

		<input type="checkbox" id="GUILDS" name="GUILDS" value="GUILDS" ${(intents & (1 << 0)) ? "checked" : ""}>
		<label for="GUILDS">Server Events</label><br>

		<input type="checkbox" id="GUILD_MEMBERS" name="GUILD_MEMBERS" value="GUILD_MEMBERS" ${(intents & (1 << 1)) ? "checked" : ""}>
		<label for="GUILD_MEMBERS">Server Member Events ***</label><br>

		<input type="checkbox" id="GUILD_BANS" name="GUILD_BANS" value="GUILD_BANS" ${(intents & (1 << 2)) ? "checked" : ""}>
		<label for="GUILD_BANS">Server Ban Events</label><br>

		<input type="checkbox" id="GUILD_EMOJIS" name="GUILD_EMOJIS" value="GUILD_EMOJIS" ${(intents & (1 << 3)) ? "checked" : ""}>
		<label for="GUILD_EMOJIS">Server Emoji Events</label><br>

		<input type="checkbox" id="GUILD_INTEGRATIONS" name="GUILD_INTEGRATIONS" value="GUILD_INTEGRATIONS" ${(intents & (1 << 4)) ? "checked" : ""}>
		<label for="GUILD_INTEGRATIONS">Server Integration Events</label><br>

		<input type="checkbox" id="GUILD_WEBHOOKS" name="GUILD_WEBHOOKS" value="GUILD_WEBHOOKS" ${(intents & (1 << 5)) ? "checked" : ""}>
		<label for="GUILD_WEBHOOKS">Server Webhook Events</label><br>

		<input type="checkbox" id="GUILD_INVITES" name="GUILD_INVITES" value="GUILD_INVITES" ${(intents & (1 << 6)) ? "checked" : ""}>
		<label for="GUILD_INVITES">Server Invite Events</label><br>

		<input type="checkbox" id="GUILD_VOICE_STATES" name="GUILD_VOICE_STATES" value="GUILD_VOICE_STATES" ${(intents & (1 << 7)) ? "checked" : ""}>
		<label for="GUILD_VOICE_STATES">Server Voice Events</label><br>

		<input type="checkbox" id="GUILD_PRESENCES" name="GUILD_PRESENCES" value="GUILD_PRESENCES" ${(intents & (1 << 8)) ? "checked" : ""}>
		<label for="GUILD_PRESENCES">Server Presence Events ***</label><br>

		<input type="checkbox" id="GUILD_MESSAGES" name="GUILD_MESSAGES" value="GUILD_MESSAGES" ${(intents & (1 << 9)) ? "checked" : ""}>
		<label for="GUILD_MESSAGES">Server Message Events</label><br>

		<input type="checkbox" id="GUILD_MESSAGE_REACTIONS" name="GUILD_MESSAGE_REACTIONS" value="GUILD_MESSAGE_REACTIONS" ${(intents & (1 << 10)) ? "checked" : ""}>
		<label for="GUILD_MESSAGE_REACTIONS">Server Message Events</label><br>

		<input type="checkbox" id="GUILD_MESSAGE_TYPING" name="GUILD_MESSAGE_TYPING" value="GUILD_MESSAGE_TYPING" ${(intents & (1 << 11)) ? "checked" : ""}>
		<label for="GUILD_MESSAGE_TYPING">Server Typing Events</label><br>

		<input type="checkbox" id="DIRECT_MESSAGES" name="DIRECT_MESSAGES" value="DIRECT_MESSAGES" ${(intents & (1 << 12)) ? "checked" : ""}>
		<label for="DIRECT_MESSAGES">Direct Message Events</label><br>

		<input type="checkbox" id="DIRECT_MESSAGE_REACTIONS" name="DIRECT_MESSAGE_REACTIONS" value="DIRECT_MESSAGE_REACTIONS" ${(intents & (1 << 13)) ? "checked" : ""}>
		<label for="DIRECT_MESSAGE_REACTIONS">DM Reaction Events</label><br>

		<input type="checkbox" id="DIRECT_MESSAGE_TYPING" name="DIRECT_MESSAGE_TYPING" value="DIRECT_MESSAGE_TYPING" ${(intents & (1 << 14)) ? "checked" : ""}>
		<label for="DIRECT_MESSAGE_TYPING">DM Typing Events</label><br>

		<hr>

		<label>*** These require your bot to have them enabled in the developer portal. Furthermore, they can only be enabled if your bot is in less than 100 servers or is whitelisted. If you enable them without turning them on in the portal, your bot will crash!</label>
	</div>`
},

init: function(document, globalObject) {
	const INTENTS = [
		"GUILDS",
		"GUILD_MEMBERS",
		"GUILD_BANS",
		"GUILD_EMOJIS",
		"GUILD_INTEGRATIONS",
		"GUILD_WEBHOOKS",
		"GUILD_INVITES",
		"GUILD_VOICE_STATES",
		"GUILD_PRESENCES",
		"GUILD_MESSAGES",
		"GUILD_MESSAGE_REACTIONS",
		"GUILD_MESSAGE_TYPING",
		"DIRECT_MESSAGES",
		"DIRECT_MESSAGE_REACTIONS",
		"DIRECT_MESSAGE_TYPING"
	];
	const PRIVILEGED = [
		"GUILD_PRESENCES",
		"GUILD_MEMBERS"
	];
	function EnableAll(enable) {
		for(let i = 0; i < INTENTS.length; i++) {
			const val = document.getElementById(INTENTS[i]);
			val.disabled = !enable;
		}
	};
	document.getElementById("All").onclick = function() {
		EnableAll(false);
		for(let i = 0; i < INTENTS.length; i++) {
			const val = document.getElementById(INTENTS[i]);
			val.checked = true;
		}
	};
	document.getElementById("NonPrivileged").onclick = function() {
		EnableAll(false);
		for(let i = 0; i < INTENTS.length; i++) {
			const val = document.getElementById(INTENTS[i]);
			val.checked = PRIVILEGED.indexOf(INTENTS[i]) === -1;
		}
	};
	document.getElementById("Custom").onclick = function() {
		EnableAll(true);
	};
	if(document.getElementById("All").checked) {
		document.getElementById("All").onclick();
	}
	if(document.getElementById("NonPrivileged").checked) {
		document.getElementById("NonPrivileged").onclick();
	}
	if(document.getElementById("Custom").checked) {
		document.getElementById("Custom").onclick();
	}
},

close: function(document, data, globalObject) {
	let result = 0;
	const INTENTS = [
		"GUILDS",
		"GUILD_MEMBERS",
		"GUILD_BANS",
		"GUILD_EMOJIS",
		"GUILD_INTEGRATIONS",
		"GUILD_WEBHOOKS",
		"GUILD_INVITES",
		"GUILD_VOICE_STATES",
		"GUILD_PRESENCES",
		"GUILD_MESSAGES",
		"GUILD_MESSAGE_REACTIONS",
		"GUILD_MESSAGE_TYPING",
		"DIRECT_MESSAGES",
		"DIRECT_MESSAGE_REACTIONS",
		"DIRECT_MESSAGE_TYPING"
	];
	if(document.getElementById("All").checked) {
		result = -1;
	} else if(document.getElementById("NonPrivileged").checked) {
		result = -2;
	} else {
		for(let i = 0; i < INTENTS.length; i++) {
			const val = document.getElementById(INTENTS[i]).checked;
			if(val) result |= (1 << i);
		}
	}
	data.intents = result;
},


mod: function(DBM) {

	DBM.Bot.intents = function() {
		if(DBM.Files && DBM.Files.data.settings && DBM.Files.data.settings["Bot Intents"]) {
			const intentData = DBM.Files.data.settings["Bot Intents"];
			if(intentData.customData && intentData.customData["Bot Intents"] && intentData.customData["Bot Intents"].intents !== undefined) {
				const intents = intentData.customData["Bot Intents"].intents;
				if(intents === -1) {
					return DBM.DiscordJS.Intents.ALL;
				} else if(intents === -2) {
					return DBM.DiscordJS.Intents.NON_PRIVILEGED;
				} else {
					return intents;
				}
			}
		}
		return DBM.DiscordJS.Intents.NON_PRIVILEGED;
	}

}

}; // End of module
