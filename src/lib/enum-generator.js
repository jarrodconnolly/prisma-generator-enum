import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import prismaInternals from '@prisma/internals';

export const defaultOutputFile = 'enumerations.js';

export async function generate(options) {
  const { output, config } = options.generator;
  const outputDir = prismaInternals.parseEnvValue(output);

  const outputFile =
    typeof config.outputFile === 'string'
      ? config.outputFile
      : defaultOutputFile;

  try {
    await mkdir(outputDir, { recursive: true });

    const enumerations = await generateEnumerations(options.dmmf);

    await writeFile(join(outputDir, outputFile), enumerations);
  } catch (e) {
    console.error('Error: unable to write files for Prisma Enum Generator');
    throw e;
  }
}

function titleCase(str) {
  str = str.toLowerCase().split('_');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

async function generateEnumerations(dmmf) {
  const enumify = await readFile(join(import.meta.dirname, '../../dist', 'enumify.js'), 'utf-8');
  const enumModels = dmmf.datamodel.enums;
  let output = '';
  output += `// This file was generated by Prisma Enum Generator\n`;
  output += enumify;
  output += '\n';

  for (const enumModel of enumModels) {

    if(enumModel.documentation) {
      output += `/**\n * ${enumModel.documentation}\n * @enum {${enumModel.name}}\n */\n`;
    }

    output += `export class ${enumModel.name} extends Enumify {\n`;
    for (const value of enumModel.values) {

      let documentation = '';
      if(value.documentation) {
        documentation = `"${value.documentation}"`;
        output += `  /** ${documentation} */\n`;
      }
      output += `  static ${value.name} = new ${enumModel.name}(${documentation});\n`;
    }
    output += `  static #_ = ${enumModel.name}.closeEnum();\n`;
    output += '}\n'
  }
  
  return output;
}
