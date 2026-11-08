import { bootstrapApplication } from "@angular/platform-browser";

import { App } from "./app/app";
import { appConfig } from "./app/app.config";
import {
  installChunkLoadRecovery,
  installGlobalErrorHandlers,
} from "./lib/error-reporting";

installChunkLoadRecovery();
installGlobalErrorHandlers();

bootstrapApplication(App, appConfig);
