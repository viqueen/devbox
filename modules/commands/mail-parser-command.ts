/**
 * Copyright 2023 Hasnae Rehioui
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import chalk from 'chalk';
import concatStream from 'concat-stream';
import { HeaderValue, simpleParser } from 'mailparser';
import moment from 'moment';

const RECEIVED_PATTERN = /^(?<direction>by|from) (?<source>.*); (?<date>.*)$/;

const handleReceivedHeader = (received: HeaderValue | undefined) => {
    if (!received) return;
    let data: string[] = [];
    if (!Array.isArray(received)) {
        data = [received as string];
    } else {
        data = received as string[];
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
