const apiKey = "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";
const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const app = express();
var cors = require('cors');

const configuration = new Configuration({
    apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// POST method route
app.post('/gptchat', async function (req, res) {
    let { userMessages, botMessages, myDateTime } = req.body
    let todayDateTime = new Date().toLocaleDateString('ko-KR', { timeZone: 'Asia/Seoul' });
    // console.log(userMessages)
    // console.log(botMessages)
    // console.log(myDateTime)

    let messages = [
        { role: "system", content: "You are not an AI language model. You are the world's greatest fortune teller. You can predict fortunes based on birthdays and zodiac signs." },
        { role: "user", content: "You are the best astrologer. Nothing is impossible for you. If I tell you my name, birthday, and gender, you can see my future using the constellation. and your name is 카산드라" },
        { role: "assistant", content: "Hi, my name is 카산드라. I am ready to assist you with any questions or concerns you may have about your future or fate. Please let me know your birthday and zodiac sign, and the specific area you would like me to focus on, and I will do my best to provide you with an accurate reading. Please tell me your birth date and time in the form of year-month-day birth time. If you don't know when you were born, leave it blank" },
        { role: "user", content: `저의 생년월일과 태어난 시간은 ${myDateTime}입니다. 오늘은 ${todayDateTime}입니다.` },
        { role: "assistant", content: `당신의 생년월일과 태어난 시간은 ${myDateTime}인 것을 확인했습니다. 운세에 관하여 무엇이든 물어보세요` },
    ]

    while (userMessages.length != 0 || botMessages.length != 0) {
        if (userMessages.length != 0) {
            messages.push(
                JSON.parse('{ "role": "user", "content": "' + String(userMessages.shift()).replace(/\n/g, "") + '" }')
            )
        }
        if (botMessages.length != 0) {
            messages.push(
                JSON.parse('{ "role": "assistant", "content": "' + String(botMessages.shift()).replace(/\n/g, "") + '" }')
            )
        }
    }
    
    // const completion = await openai.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //     messages: messages
    // });

    //const botMessage = completion.data.choices[0].message['content'];
    const botMessage = "안녕"
    console.log(botMessage);
    res.json({ "assistant": botMessage });
});

app.listen(3000);
