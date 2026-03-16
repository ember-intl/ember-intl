import { runWorker } from '@codemod-utils/threads';

import { task } from './task.js';

runWorker(task);
