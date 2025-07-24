import './polling.css'

export default class Messages {
    constructor(container, stream$) {
        if (!(container instanceof HTMLElement)) {
            throw new Error('This is not HTML element!');
        }
        this.container = container;
        this.stream$ = stream$;

        this.renderBlock();
        this.getData()
    }

    getData() {
        this.stream$.subscribe((data) => {
            if (data.error) {
                console.error('Произошла ошибка:', data.message);
            } else {
                this.renderMessage(data.messages[0]);
            }
        })
    }


    renderBlock() {
        const title = document.createElement('h2');
        title.classList.add('title');
        title.textContent = 'Incoming';

        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('message-wrapper');
        this.messageWrapper = messageWrapper;

        this.container.append(title, messageWrapper);
    }

    renderMessage(message) {
        const messageBlock = document.createElement('div');
        messageBlock.classList.add('message-block');

        const messageAuthor = document.createElement('p');
        messageAuthor.classList.add('message-author');
        messageAuthor.textContent = message.from;

        const messageText = document.createElement('p');
        messageText.classList.add('message-text');

        const subject = this.limitText(message.subject);

        messageText.textContent = subject;

        const messageDate = document.createElement('p');
        messageDate.classList.add('message-date');
        messageDate.textContent = new Date(message.received * 1000).toLocaleString();

        messageBlock.append(messageAuthor, messageText, messageDate);

        this.messageWrapper.prepend(messageBlock);
    }

    limitText(text){
        if(text.length > 15){
            console.log(text);
            return text.slice(0, 15) + '...';
        }
        return text
    }
}