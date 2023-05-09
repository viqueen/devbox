import prettyXml from 'xml-formatter';
import concatStream from 'concat-stream';

process.stdin.pipe(
    concatStream(function (buffer) {
        if (buffer.length > 0) {
            const xml = buffer.toString();
            console.log(prettyXml(xml, {}));
        }
    })
);
