import {
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import * as fs from "fs";
import { ComponentGeneratorSchema } from './schema';

// // name of file
// const file = "logs.txt";
//
// // logs
// const logData = "\nRequest status: 200 OK";
//
// // add logData to end of logs.txt file
// // using fs.appendFile() asynchronous function
// fs.appendFile(file, logData, "utf-8", () => {
//   console.log("Log data added!");
// });
interface NormalizedSchema extends ComponentGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  indexRoot: string;
}

function normalizeOptions(tree: Tree, options: ComponentGeneratorSchema): NormalizedSchema {
  const name = names(options.name).fileName;
  const indexDirectory = 'graph-ql-client/src';
  const projectDirectory = `${indexDirectory}/lib/model-loaders/${name}`;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const indexRoot = `${getWorkspaceLayout(tree).libsDir}/${indexDirectory}`;
  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    indexRoot
  };
}
function addFiles(tree: Tree, options: NormalizedSchema) {
    const nameList = names(options.name);
    const templateOptions = {
      ...options,
      ...nameList,
      offsetFromRoot: offsetFromRoot(options.projectRoot),
      template: ''
    };
    generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}

export default async function (tree: Tree, options: ComponentGeneratorSchema) {
  const nameList = names(options.name);
  const normalizedOptions = normalizeOptions(tree, options);
  addFiles(tree, normalizedOptions);
  const data = `\nexport * from './lib/model-loaders/${nameList.fileName}';`
  const filePath = path.join(normalizedOptions.indexRoot, 'index.ts');
  await fs.appendFile(filePath, data, "utf-8", () => {
    console.log("Information added at index file!");
  });
  await formatFiles(tree);
}
