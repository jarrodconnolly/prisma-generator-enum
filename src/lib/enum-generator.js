import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import prismaInternals from '@prisma/internals';

export const defaultOutputFile = 'enumerations.js';
export const defaultClassName = 'Enumerations';

export async function generate(options) {
  const { output, config } = options.generator;
  const outputDir = prismaInternals.parseEnvValue(output);

  const outputFile =
    typeof config.outputFile === 'string'
      ? config.outputFile
      : defaultOutputFile;

  const className =
    typeof config.className === 'string'
      ? config.className
      : defaultClassName;

  try {
    await mkdir(outputDir, { recursive: true });

    const enumerations = generateEnumerations(options.dmmf, className);

    await writeFile(join(outputDir, outputFile), enumerations);
  } catch (e) {
    console.error('Error: unable to write files for Prisma Enum Generator');
    throw e;
  }
}

function generateEnumerations(dmmf, className) {
  const enumModels = dmmf.datamodel.enums;
  const enums = enumModels.map((enumModel) => {
    const values = enumModel.values.map(value => `'${value.name}'`).join(',');
    return `\t${enumModel.name} = [${values}];`;
  });
  return `export class ${className} {\n${enums.join('\n')}\n}`;
}