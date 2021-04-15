const repoSkeletonsDefault = [
  {
    language: 'ts',
    viewEngine: 'hbs',
    mono: false,
    gitRepo: '--single-branch --branch ts-hbs-multi https://github.com/jsagon/jsagon-nodejs-framework-examples.git'
  },
  {
    language: 'ts',
    viewEngine: 'ejs',
    mono: false,
    gitRepo: 'https://github.com/jsagon/jsagon.git'
  },
  {
    language: 'js',
    viewEngine: 'hbs',
    mono: false,
    gitRepo: '--single-branch --branch js-hbs-multi https://github.com/jsagon/jsagon-nodejs-framework-examples.git'
  },
  {
    language: 'js',
    viewEngine: 'ejs',
    mono: false,
    gitRepo: 'https://github.com/jsagon/jsagon.git'
  }
]

export const getRepoSkeletonDefault = (language: string, viewEngine: string, mono: Boolean): {}|null => {
  return repoSkeletonsDefault.find(item => item.language === language && item.viewEngine === viewEngine && item.mono === mono)
}

export const urlServer = 'https://jsagon.com/jsagon-nodejs-framework/api/repos'
