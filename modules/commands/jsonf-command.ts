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
import concatStream from 'concat-stream';
import prettyJson from 'prettyjson';

process.stdin.pipe(
    concatStream((buffer) => {
        if (buffer.length > 0) {
            const json = JSON.parse(buffer.toString());
            console.info(prettyJson.render(json));
        }
    })
);
