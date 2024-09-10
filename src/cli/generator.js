import generatorHelper from '@prisma/generator-helper';
import { generate } from '../lib/enum-generator.js';

generatorHelper.generatorHandler({
  onManifest: () => ({
    defaultOutput: '../enumerations',
    prettyName: 'Enumerations',
  }),
  onGenerate: generate,
});