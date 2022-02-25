const request = require('request');
const fs = require('fs')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const fetcher = function () {
  const args = process.argv.slice(2)
  request(args[0], (error, response, body) => {
    if (fs.existsSync(args[1])) {
      rl.question('This file already exists, press Y to overwrite.\n', (answer) => {
        if (answer === 'y' || answer === 'Y') {
          fs.writeFile(args[1], body, (err) => {
            console.log('file written to index.html')
            rl.close()
          }) 
        } else {
            rl.close()
        } 
      })
    } else {
        fs.writeFile(args[1], body, (err) => {
          console.log('file written to index.html')
          rl.close()
        })
      }    
  })
}

fetcher()