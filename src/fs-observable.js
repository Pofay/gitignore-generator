import { bindCallback } from 'rxjs/index'
import fs from 'fs'

// appendFileObservable :: String -> String -> Observable
const appendFileObservable = bindCallback(fs.appendFile)

// writeFileObservable :: String -> String -> Observable
const writeFileObservable = bindCallback(fs.writeFile)

export { appendFileObservable, writeFileObservable }
