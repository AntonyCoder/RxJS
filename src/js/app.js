import stream$ from "./api";
import Messages from "./components/polling/polling";
const root = document.querySelector('#root')

const messages = new Messages(root, stream$)