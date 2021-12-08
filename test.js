
const fs = require('fs')
function render(array){
  let store = []
  let i =0
  let sum =0
  while (sum!=array.length){
    i= Math.random()*array.length
    if(!store.includes(i|0)){
      store.push(i|0)
      sum++
    }
  }
  let result = []
  let score = 1
  for (let i of store){
  	array[i].question = score + array[i].question
  	score += 1
  	result.push(array[i])
  }
  return  result
}


function *generation(array){
	yield "👤 Ismingizni kiriting: "
	for (let i of array){
		yield (i.question + '\n' + i.A+ '\n' + i.B+ '\n' + i.C +'\nJavob: ')
	}
}

fs.readFile("./database/questionData.json",'UTF-8',((error,dataQuest)=>{
	if (error) console.log(error)
	else{
		let array = dataQuest ? JSON.parse(dataQuest) : []

		fs.readFile('./database/data.json','UTF-8',((error,usersData)=>{
    	 	if(error) console.log(error)
    	 	else{
    	 		const rl = require('readline')
				const readline = rl.createInterface({
					input: process.stdin,
					output: process.stdout
				})
				let ren = render(array)
				let gen = generation(ren)
    	 		let userArray = usersData ? JSON.parse(usersData) : []
				readline.setPrompt(gen.next().value)
				readline.prompt()
				let i = 0
				let compile = 0
				let faild = 0
				let x = true
				let user
				readline.on('line',(data)=>{
					if (data ==''){
						console.log("❗ Xatolik hech nima kiritilmadi. Qayta kiriting!")
						return ;
					}
					else if (x){
						user = data
						x = false
					}
					else if (!"ABC".includes(data)){
						console.log(`⛔ Mavjud bo'lmagan '${data}' varianti belgilandi. Qayta kiritib ko'ring!`)
						return ;
					}
				
					else{
						(array[i].answer == data) ? compile += 1 : faild += 1;
						i+=1
					}
					let ques = gen.next().value
					if (!ques) {
						userArray.push({"Users": user,"The correct answer": compile,"Wrong answer": faild,"All question":(array.length)})
						fs.writeFile('./database/data.json',JSON.stringify(userArray,null,4),((error)=>{
							if(error) console.log(error)
						}))
						console.table([{"👤 User": user,"✅ The correct answer": compile,"❌ Wrong answer": faild,"All question":(array.length)}])
						return readline.close()
					}
					console.log('------------------------')
					readline.setPrompt(ques)
					readline.prompt()
				})
    	 	}
		}))
	}
}))



