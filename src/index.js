import program from 'commander'
import getIgnoreContents from './gitignore-content-requester'
import { scan, mergeMap } from 'rxjs/operators'
import { appendFileObservable, writeFileObservable } from './fs-observable'

const gitIgnore = dir => `${dir}/.gitignore`

program
  .version('0.0.1')
  .command('generate <dir> [programming_language...]')
  .description(
    'Generate a .gitgnore on dir with common ignored files for a specific language.'
  )
  .option(
    '-c, --concatenate',
    'Concatenate .gitignore file types to existing .gitignore'
  )
  .option(
    '-o, --overwrite',
    'This is the default behavior. Force overwrite of generated .gitignore to existing in dir'
  )
  .action(function (dir, programmingLanguages, cmd) {
    if (cmd.concatenate) {
      getIgnoreContents(programmingLanguages)
        .pipe(mergeMap(res => appendFileObservable(gitIgnore(dir), res)))
        .subscribe(
          () =>
            console.log(
              'Successful appended contents to current .gitignore in directory'
            ),
          err => console.log(err)
        )
    } else {
      getIgnoreContents(programmingLanguages)
        .pipe(
          scan((acc, cur) => acc + cur),
          mergeMap(res => writeFileObservable(gitIgnore(dir), res))
        )
        .subscribe(
          () =>
            console.log(
              'Successful overwrite to current .gitignore in directory'
            ),
          err => console.log(err)
        )
    }
  })

program.parse(process.argv)
