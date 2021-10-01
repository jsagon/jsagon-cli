const dataFramework = {
  version: 1,
  languages: [{ value: 'ts', name: 'TypeScript' }, { value: 'js', name: 'JavaScript' }],
  viewEngines: [{ value: 'hbs', name: 'Handlebars' }, { value: 'ejs', name: 'EJS' }],
  repos: [
    {
      language: 'ts',
      viewEngine: 'hbs',
      mono: false,
      urlRepo: 'https://github.com/jsagon/jsagon-nodejs-framework-examples/tree/ts-hbs-multi',
      gitRepo: '--single-branch --branch ts-hbs-multi https://github.com/jsagon/jsagon-nodejs-framework-examples.git'
    },
    {
      language: 'ts',
      viewEngine: 'ejs',
      mono: false,
      urlRepo: 'https://github.com/jsagon/jsagon-nodejs-framework-examples/tree/ts-ejs-multi',
      gitRepo: '--single-branch --branch ts-ejs-multi https://github.com/jsagon/jsagon-nodejs-framework-examples.git'
    },
    {
      language: 'js',
      viewEngine: 'hbs',
      mono: false,
      urlRepo: 'https://github.com/jsagon/jsagon-nodejs-framework-examples/tree/js-hbs-multi',
      gitRepo: '--single-branch --branch js-hbs-multi https://github.com/jsagon/jsagon-nodejs-framework-examples.git'
    },
    {
      language: 'js',
      viewEngine: 'ejs',
      mono: false,
      urlRepo: 'https://github.com/jsagon/jsagon-nodejs-framework-examples/tree/js-ejs-multi',
      gitRepo: '--single-branch --branch js-ejs-multi https://github.com/jsagon/jsagon-nodejs-framework-examples.git'
    },
    {
      language: 'ts',
      viewEngine: 'hbs',
      mono: true,
      urlRepo: 'https://github.com/jsagon/jsagon-nodejs-framework-examples/tree/ts-hbs-mono',
      gitRepo: '--single-branch --branch ts-hbs-mono https://github.com/jsagon/jsagon-nodejs-framework-examples.git'
    },
    {
      language: 'js',
      viewEngine: 'hbs',
      mono: true,
      urlRepo: 'https://github.com/jsagon/jsagon-nodejs-framework-examples/tree/js-hbs-mono',
      gitRepo: '--single-branch --branch js-hbs-mono https://github.com/jsagon/jsagon-nodejs-framework-examples.git'
    },
    {
      language: 'ts',
      viewEngine: 'ejs',
      mono: true,
      urlRepo: 'https://github.com/jsagon/jsagon-nodejs-framework-examples/tree/ts-ejs-mono',
      gitRepo: '--single-branch --branch ts-ejs-mono https://github.com/jsagon/jsagon-nodejs-framework-examples.git'
    },
    {
      language: 'js',
      viewEngine: 'ejs',
      mono: true,
      urlRepo: 'https://github.com/jsagon/jsagon-nodejs-framework-examples/tree/js-ejs-mono',
      gitRepo: '--single-branch --branch js-ejs-mono https://github.com/jsagon/jsagon-nodejs-framework-examples.git'
    }
  ]
}

export { dataFramework }

export const getRepoSkeletonDefault = (language: string, viewEngine: string, mono: Boolean): {}|null => {
  return dataFramework.repos.find(item => item.language === language && item.viewEngine === viewEngine && item.mono === mono)
}

export const urlServer = 'https://jsagon.com/jsagon-nodejs-framework/api/repos'
