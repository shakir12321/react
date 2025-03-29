const resolve = require("path").resolve;
const fs = require("fs").promises;
const fse = require("fs-extra");

const DIRECTORY = "./widgetOutput";

function fileExists(filePath) {
  try {
    fs.access(filePath, "", function (error) {
      if (error) {
        console.log("Directory does not exist.");
        return false;
      } else {
        console.log("Directory exists.");
        return true;
      }
    });
  } catch (err) {
    return false;
  }
}

async function deleteFolder(directory) {
  return new Promise((resolve, reject) => {
    fs.rmdir(directory, { recursive: true })
      .then(() => {
        resolve();
      })
      .catch(() => {
        resolve();
      });
  });
}

async function createFolder(directory) {
  return new Promise((resolve, reject) => {
    fs.mkdir(directory)
      .then(() => {
        resolve();
      })
      .catch(() => {
        reject();
      });
  });
}

async function getFiles(dir) {
  const dirents = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

async function copyBuildFiles(from, to) {
  let dirCont = await getFiles(from);
  dirCont.map(async (elm) => {
    if (elm.match(/.*\.js$|.*\.css$|.*\.map$/gi)) {
      const splittedPath = elm.split("/");
      const file = splittedPath[splittedPath.length - 1];
      await fs.copyFile(elm, `${to}/${file}`);
    }
  });
}

async function replaceFiles(from, to, regexp, replacePattern, removePattern) {
  let result = "";
  const file = await fs.readFile(from, { encoding: "utf-8", flag: "r" });

  let match;
  match = regexp.exec(file);
  while (match != null) {
    const url = match[1];
    const splittedPath = url.split("/");
    const path = splittedPath[splittedPath.length - 1];
    result += `${removePattern}("resources/${path}")\n`;
    match = regexp.exec(file);
  }

  const newToFile = [];
  const toFile = await fs.readFile(to, { encoding: "utf-8", flag: "r" });

  const lines = toFile.split("\n");

  lines.forEach((line) => {
    if (!line.startsWith(removePattern)) {
      newToFile.push(line);
    }
    if (line.includes(replacePattern)) {
      newToFile.push(result);
    }
  });

  await fs.writeFile(to, newToFile.join("\n"), { encoding: "utf-8" });
}

(async () => {
  console.log("Build widget started!!");
  await deleteFolder(`${DIRECTORY}`);

  await createFolder(`${DIRECTORY}`);

  await createFolder(`${DIRECTORY}/resources`);

  await copyBuildFiles("./build", `${DIRECTORY}/resources`);
  fse.copyFileSync(`./widgetSource/details.vm`, `${DIRECTORY}/details.vm`);
  fse.copyFileSync(`./widgetSource/icon.png`, `${DIRECTORY}/icon.png`);
  fse.copyFileSync(
    `./widgetSource/parameters.vm`,
    `${DIRECTORY}/parameters.vm`
  );
  fse.copyFileSync(`./widgetSource/render.vm`, `${DIRECTORY}/render.vm`);
  fse.copyFileSync(
    `./widgetSource/widget.properties`,
    `${DIRECTORY}/widget.properties`
  );

  await replaceFiles(
    "./build/index.html",
    `${DIRECTORY}/render.vm`,
    new RegExp('href="(.*?.css)"', "g"),
    "!cssloading",
    "#loadWidgetCss"
  );
  await replaceFiles(
    "./build/index.html",
    `${DIRECTORY}/render.vm`,
    new RegExp('src="(.*?.js)"', "g"),
    "!jsloading",
    "#loadWidgetJs"
  );
})();
