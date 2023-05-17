import { Command } from 'commander';
import Chance from 'chance';

const program = new Command();
const chance = new Chance();

const text = ['paragraph', 'text', 'sentence'];
const include = [...text];
const actions = Object.keys(Chance.prototype).filter((v) =>
    include.includes(v)
);

actions.forEach((action) => {
    program
        .command(action)
        .description(`get random ${action}`)
        .action(() => {
            const doit = (chance as any)[action];
            console.info(doit.bind(chance).call());
        });
});

program.version('1.0.0');
program.parse(process.argv);
