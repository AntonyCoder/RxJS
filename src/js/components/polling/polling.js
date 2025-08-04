import './polling.css';
import moment from 'moment';

export default class Messages {
    constructor(container, stream$) {
        if (!(container instanceof HTMLElement)) {
            throw new Error('This is not HTML element!');
        }
        this.container = container;
        this.stream$ = stream$;

        this._renderBlock();
        this._getData()
    }

    _getData() {
        this.stream$.subscribe((data) => {
            if (data.error) {
                console.error('Произошла ошибка:', data.message);
            } else {
                data.messages.forEach(message => {
                    this._renderMessage(message);
                })
            }
        })
    }


    _renderBlock() {
        const title = document.createElement('h2');
        title.classList.add('title');
        title.textContent = 'Incoming';

        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('message-wrapper');
        this.messageWrapper = messageWrapper;

        this.container.append(title, messageWrapper);
    }

    _renderMessage(message) {
        const messageBlock = document.createElement('div');
        messageBlock.classList.add('message-block');

        const messageAuthor = document.createElement('p');
        messageAuthor.classList.add('message-author');
        messageAuthor.textContent = message.from;

        const messageText = document.createElement('p');
        messageText.classList.add('message-text');

        const subject = this._limitText(message.subject);

        messageText.textContent = subject;

        const messageDate = document.createElement('p');
        messageDate.classList.add('message-date');
        messageDate.textContent = this._formatDate(message.received)

        messageBlock.append(messageAuthor, messageText, messageDate);

        this.messageWrapper.prepend(messageBlock);
    }

    _formatDate(date){
        const convertedDate = moment.unix(date).format('hh:mm DD.MM.YYYY');
        return convertedDate;
    }

    _limitText(text){
        if(text.length > 15){
            return text.slice(0, 15) + '...';
        }
        return text
    }
}