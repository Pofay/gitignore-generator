import { throwError, of, from, forkJoin } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import R from 'ramda'
import fetch from 'node-fetch'

const api = 'https://api.github.com/repos/github/gitignore/contents'

const constructUrl = R.curry(
  (url, directive) => `${url}/${capitalize(directive)}.gitignore`
)

const capitalize = str => str.charAt(0).toUpperCase() + str.substr(1)

// httpGet :: String -> Promise e r
const httpGet = url => fetch(url)

// httpGetO :: String -> Observable
const httpGetO = url => from(httpGet(url).then(res => res.json()))

const constructRequestersFrom = R.pipe(
  constructUrl(api),
  httpGetO
)

function getIgnoreContents (programmingLanguages) {
  const requesters = R.map(constructRequestersFrom, programmingLanguages)
  return forkJoin(requesters).pipe(
    mergeMap(x => from(x)),
    mergeMap(
      obj =>
        R.has('message', obj)
          ? throwError(
            `No associated .gitignore file in Github for one of given programming languages [ ${programmingLanguages} ]`
          )
          : of({ content: obj.content, encoding: obj.encoding })
    ),

    mergeMap(obj => of(Buffer.from(obj.content, obj.encoding).toString()))
  )
}

export default getIgnoreContents
