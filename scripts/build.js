#!/usr/bin/env node

const fs = require('node:fs');
const process = require('node:process');
const path = require('node:path');
const archiver = require('archiver');
const ROOT = path.join(__dirname, '..');


const build = async () => {;
  const zipName = 'unistyle.zip';
  fs.mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
  const output = fs.createWriteStream(path.join(ROOT, 'dist', zipName));


  const archive = archiver('zip', {
    zlib: { level: 9 },
  });
  archive.pipe(output);
  archive.glob('LICENSE');
  process.chdir(path.join(ROOT, 'src'));
  archive.glob('**/*');
  archive.finalize();
  console.log('BUILD', zipName);
};

build();
