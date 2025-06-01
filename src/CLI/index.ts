#!/usr/bin/env node

import { Command } from 'commander';
import { migrateCommand } from './commands';

const program = new Command();

program.addCommand(migrateCommand);
program.parse(process.argv);
