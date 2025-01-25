import OpenAI from "openai";


const openai = new OpenAI({

    apiKey: '21c67fafe444470e8c0f6f66226f2824',
    baseURL: 'https://api.aimlapi.com/v1',
    dangerouslyAllowBrowser: true
});

class ActionProvider {
    constructor(
        createChatBotMessage,
        setStateFunc,
        createClientMessage,
        stateRef,
        createCustomMessage,
        ...rest
    ) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage;
        this.stateRef = stateRef;
        this.createCustomMessage = createCustomMessage;

       
        this.callGenAI = this.callGenAI.bind(this);
        this.timer = this.timer.bind(this);
        this.generateResponseMessages = this.generateResponseMessages.bind(this);
        this.updateChatBotMessage = this.updateChatBotMessage.bind(this);
        this.respond = this.respond.bind(this);
    }

    callGenAI = async (prompt) => {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: "system", content: "You are a credit card advisor in the India market" },
                { role: 'user', content: prompt }
            ],
            temperature: 0.5,
            max_tokens: 50
        });
        console.log('chatCompletion:', chatCompletion)
        return chatCompletion.choices[0].message.content;
    };

    timer = (ms) => new Promise((res) => setTimeout(res, ms));

    generateResponseMessages = async (userMessage) => {
        const responseFromGPT = await this.callGenAI(userMessage); 
        let message;
        const numberNOLine = responseFromGPT.split('\n').length;
        for (let i = 0; i < numberNOLine; i++) {
            const msg = responseFromGPT.split('\n')[i];
            if (msg.length) {
                console.log('KW101', msg);
                message = this.createChatBotMessage(msg);
                this.updateChatBotMessage(message);
            }
            await this.timer(1000);
        }
    };

    respond = (message) => {
        this.generateResponseMessages(message);
    };

    updateChatBotMessage = (message) => {
        this.setState((prevState) => ({
            ...prevState,
            messages: [...prevState.messages, message],
        }));
    };
}

export default ActionProvider;
