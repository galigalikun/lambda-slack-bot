const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_TOKEN;
const channel = process.env.SLACK_CHANNEL;

const web = new WebClient(token);

exports.handler = async (event) => {
    console.log("EVENT\n" + JSON.stringify(event, null, 2));
    if (event.body !== null) {
        const body = JSON.parse(event.body);
        if (event.body.challenge !== undefined) {
            return {
                statusCode: 200,
                body: JSON.stringify(event.body)
            }
        } else {
            console.log('process_event');
            console.log(body);
            await process_event(body.event);
        }

    }
    const response = {
        statusCode: 200,
        body: JSON.stringify('lambda'),
    };
    return response;
};

const process_event = async (event) => {
    console.log('process_event');
    console.log(event);
    const item = event.item;
    if (item.channel === channel) {
        await post_result(item);
    }

};

const post_result = async (item) => {
    console.log('post_result');
    try {
        const res = await web.chat.postMessage({ channel: item.channel, text: 'Hello there' });
        console.log("SLACK\n" + JSON.stringify(res, null, 2));
    } catch (err) {
        console.error("ERROR\n" + JSON.stringify(err, null, 2));
    }
};
