import { defineConfig } from 'checkly'

// Import your email channel from the alert-channels.ts file 
import { emailChannel} from './__checks__/alert-channels'

const config = defineConfig({
  projectName: 'take home challenge',
  logicalId: 'Project1',
  repoUrl: 'https://github.com/checkly/checkly-cli',
  checks: {
    // Add your email alert channels below. You can add multiple channels in the array if you need. 
    alertChannels: [emailChannel],

    frequency: 10,
    locations: ['us-east-1', 'eu-west-1'],
    tags: ['mac'],
    runtimeId: '2024.02',
    checkMatch: '**/__checks__/**/*.check.ts',
    playwrightConfig: {},
    browserChecks: {
      testMatch: '**/__checks__/**/*.spec.ts',
    },
  },
  cli: {
    runLocation: 'eu-west-1',
    reporters: ['list'],
    retries: 0,
  },
})

export default config
