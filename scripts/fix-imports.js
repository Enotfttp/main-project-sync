import {
  createSourceFile,
  ScriptTarget,
  forEachChild,
  isImportDeclaration,
  isStringLiteral,
  isExportDeclaration,
} from "typescript";
import {
  readFileSync,
  writeFileSync,
  existsSync,
  readdirSync,
  statSync,
} from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Получаем staged файлы из git
function getStagedFiles() {
  try {
    const output = execSync("git diff --cached --name-only --diff-filter=ACM", {
      encoding: "utf8",
    });
    return output
      .split("\n")
      .filter(
        (file) => file && /\.(tsx?|jsx?)$/.test(file) && existsSync(file),
      );
  } catch (error) {
    return [];
  }
}

function fixImportsAndExportsInFile(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    const sourceFile = createSourceFile(
      filePath,
      content,
      ScriptTarget.Latest,
      true,
    );

    let result = content;
    let changed = false;

    function visit(node) {
      // Обрабатываем импорты
      if (isImportDeclaration(node)) {
        const moduleSpecifier = node.moduleSpecifier;
        if (isStringLiteral(moduleSpecifier)) {
          const importPath = moduleSpecifier.text;

          // Убираем расширения .ts, .tsx, .js, .jsx для ВСЕХ импортов (кроме node_modules)
          if (
            /\.(tsx?|jsx?)$/.test(importPath) &&
            !importPath.includes("node_modules")
          ) {
            const newImportPath = importPath.replace(/\.(tsx?|jsx?)$/, "");

            // Заменяем все варианты кавычек
            const singleQuoteRegex = new RegExp(
              `'${importPath.replace(/([.*+?^${}()|[\]\\])/g, "\\$1")}'`,
              "g",
            );
            const doubleQuoteRegex = new RegExp(
              `"${importPath.replace(/([.*+?^${}()|[\]\\])/g, "\\$1")}"`,
              "g",
            );

            result = result.replace(singleQuoteRegex, `'${newImportPath}'`);
            result = result.replace(doubleQuoteRegex, `"${newImportPath}"`);
            changed = true;

            console.log(`🔧 Fixed import: ${importPath} → ${newImportPath}`);
          }
        }
      }

      // Обрабатываем экспорты
      if (isExportDeclaration(node) && node.moduleSpecifier) {
        const moduleSpecifier = node.moduleSpecifier;
        if (isStringLiteral(moduleSpecifier)) {
          const exportPath = moduleSpecifier.text;

          // Убираем расширения .ts, .tsx, .js, .jsx для ВСЕХ экспортов (кроме node_modules)
          if (
            /\.(tsx?|jsx?)$/.test(exportPath) &&
            !exportPath.includes("node_modules")
          ) {
            const newExportPath = exportPath.replace(/\.(tsx?|jsx?)$/, "");

            // Заменяем все варианты кавычек
            const singleQuoteRegex = new RegExp(
              `'${exportPath.replace(/([.*+?^${}()|[\]\\])/g, "\\$1")}'`,
              "g",
            );
            const doubleQuoteRegex = new RegExp(
              `"${exportPath.replace(/([.*+?^${}()|[\]\\])/g, "\\$1")}"`,
              "g",
            );

            result = result.replace(singleQuoteRegex, `'${newExportPath}'`);
            result = result.replace(doubleQuoteRegex, `"${newExportPath}"`);
            changed = true;

            console.log(`🔧 Fixed export: ${exportPath} → ${newExportPath}`);
          }
        }
      }

      forEachChild(node, visit);
    }

    visit(sourceFile);

    if (changed && result !== content) {
      writeFileSync(filePath, result, "utf8");
      console.log(`✅ Fixed imports/exports in: ${filePath}`);
      return true;
    }
  } catch (error) {
    console.log(`❌ Error in ${filePath}:`, error.message);
  }
  return false;
}

// Рекурсивно обходим все файлы
function processDirectory(dir) {
  const files = readdirSync(dir);

  files.forEach((file) => {
    const filePath = join(dir, file);
    const stat = statSync(filePath);

    if (
      stat.isDirectory() &&
      !file.includes("node_modules") &&
      !file.includes("dist")
    ) {
      processDirectory(filePath);
    } else if (/\.(tsx?|jsx?)$/.test(file)) {
      fixImportsAndExportsInFile(filePath);
    }
  });
}
// Основная логика
const isStaged = process.argv.includes("--staged");
const specificFile = process.argv[2];

if (specificFile && !isStaged) {
  // Исправляем конкретный файл
  fixImportsAndExportsInFile(specificFile);
} else if (isStaged) {
  // Исправляем только staged файлы
  const stagedFiles = getStagedFiles();
  console.log(
    `Fixing imports/exports in ${stagedFiles.length} staged files...`,
  );
  stagedFiles.forEach(fixImportsAndExportsInFile);
} else {
  // Исправляем все файлы в src
  console.log("Fixing imports and exports in all files...");
  processDirectory("./src");
}
