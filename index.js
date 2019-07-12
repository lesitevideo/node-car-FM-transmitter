const { spawn } = require('child_process');
const radio = require('nodefm-rpi');

var streamURL = 'http://www.wefunkradio.com/play/radio.mp3';

var emitter = new radio("107.9","KINOKI","KinoFM PI radio");
var radioStream = emitter.start();

var sox = spawn('/usr/bin/sox', ['-t', 'mp3',streamURL,'-t', 'wav','-']);

sox.stdout.pipe(radioStream);

sox.stdout.on('data', (data) => {
    //console.log(data);
});

sox.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

sox.on('close', (code) => {
  console.log(`child process exited with code ${code}`);
});



/*const util = require('util');
const exec = util.promisify(require('child_process').exec);

const http = require('http');

var streamURL = 'http://www.wefunkradio.com/play/radio.mp3';
var freq = 107.9;

async function main() {
  const { stdout, stderr } = await exec('/usr/bin/sox -t mp3 '+streamURL+' -t wav - | sudo /home/pi/PiFmRds/src/pi_fm_rds -freq '+freq+' -ps KINOKI -audio -');

  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  console.log(`Number of files ${stdout}`);
}

main()
*/