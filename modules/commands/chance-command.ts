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
import Chance from 'chance';
import { Command } from 'commander';

const program = new Command();
const chance = new Chance();

const text = ['paragraph', 'word', 'sentence'];
const include = [...text];
const actions = Object.keys(Chance.prototype).filter((v) =>
    include.includes(v)
);

actions.forEach((action) => {
    program
        .command(action)
        .description(`get random ${action}`)
        .option('-w, --words <words>')
        .action((opts) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const doIt = (chance as any)[action];
            const params = opts.words ? { words: parseInt(opts.words) } : {};
            const output = doIt.bind(chance)(params);
            console.info({
                output,
                length: output.length
            })
        });
});

program.version('1.0.0');
program.parse(process.argv);
