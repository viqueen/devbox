import concatStream from 'concat-stream';
import minimist from 'minimist';
import jp from 'jsonpath';

const ops = minimist(process.argv.slice(2));

process.stdin.pipe(
    concatStream((buffer) => {
        if (buffer.length > 0) {
            const json = JSON.parse(buffer.toString());
            console.log(jp.query(json, ops._[0]));
        }
    })
);
