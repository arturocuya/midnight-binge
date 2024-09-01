const rokuDeploy = require('roku-deploy');
const fs = require('fs');

require('dotenv').config();

let bsconfig = fs.readFileSync('bsconfig.json', 'utf8');
bsconfig = JSON.parse(bsconfig);

const rokuDeployOptions = {
    host: bsconfig.host,
    password: bsconfig.password,
    devId: process.env.ROKU_DEV_ID,
    rekeySignedPackage: process.env.ROKU_SIGNED_PKG_PATH,
    signingPassword: process.env.ROKU_SIGNING_PWD,
    rootDir: 'dist/build',
    files: ['source/**/*', 'components/**/*', 'images/**/*', 'manifest'],
    outDir: 'out'
};

async function main() {
    console.log('Rekeying device...');
    await rokuDeploy.rekeyDevice(rokuDeployOptions);

    console.log('Signing package and deploying...');
    const outputPath = await rokuDeploy.deployAndSignPackage(rokuDeployOptions);

    console.log('Signed package created at:', outputPath);
}

void main();
