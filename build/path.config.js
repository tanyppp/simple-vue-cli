const path = require('path');

const RootPath = path.resolve(__dirname, '../');
const StaticPath = path.resolve(RootPath, './src/static');
const SourcePath = path.resolve(RootPath, './src');
const DistPath = path.resolve(RootPath, './dist');

module.exports = {
  RootPath,
  StaticPath,
  SourcePath,
  DistPath
}