import {setupServer} from 'msw/node';
import {rest, RestContext} from 'msw';

interface Config {
    method?: 'get' | 'post' | 'put' | 'delete';
    url: string;
    callback: (req?: Request, res?: Response, ctx?: RestContext) => void;
}
const configureServer = (configs: Config[]) => {
  const handlers = configs.map((config) => {
    //@ts-ignore
    return rest[config.method || 'get'](config.url, (req, res, context) => {
      console.log('here')
      console.log(req, res, context)
      config.callback()
    });
  })

  const server = setupServer(...handlers)

  beforeAll(() => server.listen())
  beforeEach(() => server.resetHandlers())
  afterAll(() => server.close())
}


export default configureServer
