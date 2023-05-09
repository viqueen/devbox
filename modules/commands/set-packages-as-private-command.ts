import minimist from 'minimist';
import * as path from 'path';
import * as fs from 'fs';
import { listFiles } from 'fs-directory';

const argv = minimist(process.argv.slice(2));

if (argv._.length === 0) {
    console.log('needs explicit directories, will not run on cwd');
    process.exit(1);
}

const setAsPrivate = (filename: string) => {
    console.log(`** process: `, filename);
    const data = fs.readFileSync(filename).toString();
    const packageInfo = JSON.parse(data);
    packageInfo['private'] = true;
    fs.writeFileSync(filename, JSON.stringify(packageInfo, null, 2));
};

const directories = argv._.map((item) => path.resolve(process.cwd(), item));
const packages = directories.flatMap((directory) =>
    listFiles(directory, {
        fileFilter: (entry) => entry.name === 'package.json',
        directoryFilter: () => true
    })
);

packages.forEach(setAsPrivate);
