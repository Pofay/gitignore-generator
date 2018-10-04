import { bindCallback } from 'rxjs/index'
import fs from 'fs'

const appendFileObservable = bindCallback(fs.appendFile)
const writeFileObservable = bindCallback(fs.writeFile)

export { appendFileObservable, writeFileObservable }
