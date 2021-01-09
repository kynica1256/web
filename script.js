var i = 0
const idquestion = []
const iddiv = []
const idanswer = []
const o = {}
var leng= 'Python'
function creat(i, iddiv, idanswer, idquestion, o) {
	elem.insertAdjacentHTML('beforeend', '<div id="'+i+'text'+'"><br><input class="input-text" id="'+i+'question'+'" type="text" name="'+i+'question'+'" placeholder="Вопрос"><br><br><input id="'+i+'answer'+'" class="input-text" type="text" name="'+i+'answer'+'" placeholder="Ответ"><br></div>')
	iddiv.push(String(i)+'text')
	idquestion.push(String(i)+'question')
	idanswer.push(String(i)+'answer')
	o[i+'question'] = i+'answer'
}
function remove(o, iddiv, idanswer, idquestion) {
	document.getElementById(iddiv[iddiv.length-1]).remove()
	delete o[idquestion[idquestion.length-1]]
	iddiv.splice(iddiv.length-1, 1)
	idquestion.splice(idquestion.length-1, 1)
	idanswer.splice(idanswer.length-1, 1)
}
function generate(o) {
	const els = document.getElementById('else').value
	const token = document.getElementById('Token').value
	o['token'] = token
	o['else'] = els
	const key = Object.keys(o)
	console.log(key)
	const json = {}
	for (let i of key) {
		if (i === 'else') {
			json['else'] = els
		} else if (i === 'token'){
			json['token'] = token
		} else {
			const a = document.getElementById(i).value
			const b = document.getElementById(o[i]).value
			json[a] = b
		}
	}
	const jsonob = JSON.stringify(json)
    if (leng === "Python") {
    	document.querySelector("textarea[name=text]").value = 'json = '+jsonob+'\n'+'from random import randint'+'\n'+'import vk_api'+'\n'+'token = "'+token+'"'+'\n'+'vk = vk_api.VkApi(token = token)'+'\n'+'vk._auth_token()'+'\n'+'value = {"offset":0,"count":20,"filter":"unanswered"}'+'\n'+'while True:'+'\n'+'    messages = vk.method("messages.getConversations",value)'+'\n'+'    if messages["count"] >= 1:'+'\n'+'        user_id = messages["items"][0]["last_message"]["from_id"]'+'\n'+'        text = messages["items"][0]["last_message"]["text"]'+'\n'+'        try:'+'\n'+'            txt = json[txt]'+'\n'+'            vk.method("messages.send",{"user_id":user_id,"random_id":randint(1,1000),"message":txt})'+'\n'+'        except:'+'\n'+'            vk.method("messages.send",{"user_id":user_id,"random_id":randint(1,1000),"message":json["else"]})'
    } else {
    	document.querySelector("textarea[name=text]").value = 'const json = '+jsonob+'\n'+'const vk = require("node-vk-bot-api")'+'\n'+'const bot = new vk("'+token+'")'+'\n'+'bot.startPolling(() => {console.log("start")})'+'\n'+'bot.on((answer) => {'+'\n'+'    let message = answer.message'+'\n'+'    try {'+'\n'+'        const o = json[message.text]'+'\n'+'        answer.reply(o)'+'\n'+'    } catch (e) {'+'\n'+'        answer.reply(json["else"])'+'\n'+'    }'+'\n'+'})'
    }
}