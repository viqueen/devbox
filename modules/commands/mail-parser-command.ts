import concatStream from 'concat-stream';
import { simpleParser } from 'mailparser';
import moment from 'moment';
import chalk from 'chalk';

const RECEIVED_PATTERN = /^(?<direction>by|from) (?<source>.*); (?<date>.*)$/;

const handleReceivedHeader = (received: any) => {
    if (!received) return;
    let data = received;
    if (!Array.isArray(received)) {
        data = [received];
    }
    data.forEach((item: string) => {
        const matcher = item.match(RECEIVED_PATTERN);
        if (matcher) {
            const date = moment(matcher.groups?.['date']).toString();
            const source = matcher.groups?.['source'];
            console.info(`date: ${chalk.red(date)} - source: ${source}`);
        }
    });
    console.log(data);
};

process.stdin.pipe(
    concatStream((buffer) => {
        if (buffer.length > 0) {
            simpleParser(buffer, {})
                .then((parsed) => {
                    console.info('-------- received \\');
                    const received = parsed.headers.get('received');
                    handleReceivedHeader(received);

                    console.info('-------- date header \\');
                    const date = moment(
                        parsed.headers.get('date') as string
                    ).toString();
                    console.info(chalk.red(date));

                    console.info('-------- all headers \\');
                    console.info(parsed.headers);
                })
                .catch(console.error);
        }
    })
);
