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
