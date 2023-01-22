import path from 'path';
import { Command } from 'commander';
import { serve } from 'local-api';

interface LocalApiError {
  code: string;
}

const isProduction = process.env.NODE_ENV === 'production';

export const serveCommand = new Command()
  .command('serve [filename]')
  .description('Open a file for editing')
  .option('-p, --port <number>', 'port to run server on', '4050')
  .action(
    async (filename: string = 'notebook.js', options: { port: string }) => {
      const isLocalApiError = (err: any): err is LocalApiError => {
        return typeof err.code === 'string';
      };

      console.log(
        `Opened ${filename}. Navigate to http://localhost:${options.port} to edit file`
      );

      try {
        const dir = path.join(process.cwd(), path.dirname(filename));
        await serve(
          parseInt(options.port),
          path.basename(filename),
          dir,
          !isProduction
        );
      } catch (err) {
        if (isLocalApiError(err)) {
          if (err.code === 'EADDRINUSE') {
            console.log('Port is in use. Try running on a different port');
          } else if (err instanceof Error) {
            console.log(`Error: ${err.message}`);
          }
          process.exit(1);
        }
      }
    }
  );
