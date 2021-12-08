const rl = require('readline')
const fs = require('fs')
const readline = rl.createInterface({
	input: process.stdin,
	output: process.stdout
})
function *generationQuestion(){
	yield "Savolni kiriting!⏬\n"
	yield ("A: ")
	yield ("B: ")
	yield ("C: ")
	yield ("To'g'ri javobni kiriting: ")
}
const addQues = fs.readFile('./database/questionData.json','UTF-8',((error,addQues)=>{
	if(error) console.log(error)
	else{
		let dataQuestion = addQues ? JSON.parse(addQues) : []
		let getQues = generationQuestion()
		readline.setPrompt(getQues.next().value)
		readline.prompt()
		let addQuesArray = []
		readline.on('line',(data)=>{
			if (data == ''){
				console.log("❗ Xatolik hech nima kiritilmadi. Qayta kiriting!")
				return ;
			}
			let ques = getQues.next().value

			addQuesArray.push(data) 
			if(!ques){
				if (!("ABC".includes(data))){
					console.log("❗ (A,B,C) variantlarini tanlang. Qayta kiritib ko'ring!")
					return;
				}
				else{
					addQuesArray[4] = data
					dataQuestion.push({question:" Savol: "+addQuesArray[0],A:"A: "+addQuesArray[1],B:"B: "+addQuesArray[2],C:"C: " +addQuesArray[3],answer:addQuesArray[4]})
					fs.writeFile('./database/questionData.json',JSON.stringify(dataQuestion,null,4),((error,value)=>{
						if(error) console.log(error)
					}))
					return readline.close()
				}
			}
			readline.setPrompt(ques)
			readline.prompt()
		})
	}
}))



