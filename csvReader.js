class CSVReader {
    constructor(fileReader){
        this.fileReader = fileReader
    }

    getContent(filepath){ // JSON[]
        const content = this.fileReader.getContent(filepath)
        // CUSTOM LOGIC
        return
    }
}

module.exports = {
    CSVReader
};