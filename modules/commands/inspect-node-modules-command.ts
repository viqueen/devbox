import minimist from 'minimist';
import * as path from 'path';
import * as fs from 'fs';
import { listFiles } from 'fs-directory';

const argv = minimist(process.argv.slice(2));

if (argv._.length === 0) {
    console.info('needs explicit directories, will not run on cwd');
    process.exit(1);
}

const extractPostInstall = (filename: string) => {
    const data = fs.readFileSync(filename).toString();
    try {
        const packageInfo = JSON.parse(data);
        const scripts = packageInfo['scripts'];
        const postInstall = scripts ? scripts['postinstall'] : undefined;
        if (postInstall) {
            console.info('** inspect: ', filename);
            console.info({ postInstall });
        }
    } catch (error) {
        console.error('** failed inspection: ', {
            filename,
            error
        });
    }
};

const directories = argv._.map((item) =>
    path.resolve(process.cwd(), item, 'node_modules')
);
const packages = directories.flatMap((directory) =>
    listFiles(directory, {
        fileFilter: (entry) => entry.name === 'package.json',
        directoryFilter: () => true
    })
);

packages.forEach(extractPostInstall);
