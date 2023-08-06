import { NGLRekter } from "./NGLRekter";
import {questions} from "./secret"

function main() {
  const rekter = new NGLRekter("")
  for (let question of questions) {
    rekter.sendQuestion(question).then((status) => {
      console.log(status, " ", question)
    })
  }

}

main()
