const fs = require('fs');

console.log(JSON.stringify(process.argv));

fs.readFile('package.json', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const packageJson = JSON.parse(data);
  if (packageJson.dependencies) {
    Object.entries(packageJson.dependencies).forEach(([dep, version]) => {
      if (!packageJson.devDependencies[dep]) {
        packageJson.devDependencies[dep] = version;
      }
    });
    delete packageJson.dependencies;
  }

  fs.writeFile('package.json', JSON.stringify(packageJson, null, 2), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log(`package.json dependecies deleted`);
  });
});