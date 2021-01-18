const axios = require('axios');
const rimraf = require('rimraf');
const util = require('util');
const chalk = require('chalk');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const writeFile = util.promisify(fs.writeFile);
const rename = util.promisify(fs.rename);

const service = {
  name: 'estyleApi',
  location: 'http://localhost:8080/api-json'
};
(async function() {
  if (fs.existsSync('./.tmp')) rimraf.sync('./.tmp');
  if (!fs.existsSync('./services')) fs.mkdirSync('./services');
  fs.mkdirSync('./.tmp');
  const errors = [];
  console.log(chalk.green('Generating services'));
  try {
    const res = await axios.get(service.location, {
      transformResponse: (res) => res,
      responseType: 'json'
    });
    await writeFile(`./.tmp/${service.name}.json`, res.data);
    await exec(`openapi-generator generate -i ./.tmp/${service.name}.json -g typescript-angular -o ./.tmp/${service.name} --skip-validate-spec`);
    if (fs.existsSync(`./services/${service.name}`)) rimraf.sync(`./services/${service.name}`);
    await rename(`./.tmp/${service.name}`, `./services/${service.name}`);
  } catch (err) {
    console.log(chalk.red(err.message))
    errors.push(service.name);
  }
  rimraf.sync('./.tmp');
  if (errors.length > 0) {
    console.log(chalk.bgRed('Failed to generate services for: ' + errors.join(', ')));
  }
  console.log(chalk.green('Generator done'));
})();