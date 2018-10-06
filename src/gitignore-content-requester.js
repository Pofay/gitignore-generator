import { throwError, of, from, forkJoin } from 'rxjs'
import { mergeMap } from 'rxjs/operators'
import R from 'ramda'
import fetch from 'node-fetch'

const api = 'https://api.github.com/repos/github/gitignore/contents'

const constructUrl = R.curry(
  (url, directive) => `${url}/${capitalize(directive)}.gitignore`
)

const flipConcat = R.flip(R.concat)

const capitalize = str =>
  R.pipe(
    R.head,
    R.toUpper,
    flipConcat(R.tail(str))
  )(str)

// httpGet :: String -> Promise e r
const httpGet = url => fetch(url)

// httpGetObservable :: String -> Observable
const httpGetObservable = url => from(httpGet(url).then(res => res.json()))

// constructRequestersFrom :: String -> Observable
const constructRequestersFrom = R.pipe(
  constructUrl(api),
  httpGetObservable
)

// getIgnoreContents :: List -> Observable
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
          : of(Buffer.from(obj.content, obj.encoding).toString())
    )
  )
}

export default getIgnoreContents
