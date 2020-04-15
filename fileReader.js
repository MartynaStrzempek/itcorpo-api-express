const fs = require('fs');

class FileReader {
    getContent(filepath){
        return fs.readFileSync(filepath)
    }
}

// 👿 extends / roszerzanie / dziedziczenie = A JEST B
// 😇 kompozycja / zawieranie = A ZAWIERA B

// composition over inheritance

module.exports = {
  FileReader
};