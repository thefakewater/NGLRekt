import {v4 as uuidv4} from "uuid"
import axios, { AxiosError } from "axios"

const SUBMIT_URL = "https://ngl.link/api/submit"

export class NGLRekter {
  private username: string;
  constructor(username: string) {
    this.username = username;
  }
  async checkUsername() {
    try {
      await axios.get("https://ngl.link/"+this.username)
    } catch(error) {
      const e = error as AxiosError
      if (e.response?.status === 404) {
        throw new Error("Invalid username")
      }
    }
  }
  async sendQuestion(question: string) {
    const deviceId = uuidv4();
    const data = {
      username: this.username,
      question: question,
      deviceId: deviceId,
      gameSlug: "",
      referrer: "https://instagram.com/"+this.username
    }
    try {
      await axios.post(SUBMIT_URL, data)
    } catch(error) {
      const e = error as AxiosError
      if (e.response?.status === 429) {
        throw new Error("Stop spamming we are being ratelimited, retry later")
      } else {
        throw new Error("Invalid username or NGl is down maybe")
      }
    }
  }
}