# Checkly CLI Demo with Email Alerts and CI/CD Integration

This project contains all the code needed to get started with a Checkly CLI project with email alerts. It also has instructions on setting up your first tests, and some basic information on how to get it set up with a CI/CD pipeline. 

## Getting started

To create a new Checkly project, follow these steps:

1. Install the Checkly CLI:

```bash
npm install checkly
```

2. Create a new Checkly project. Follow the prompts and choose the options that work best for you. In this example I've chosen the 'boilerplate TypeScript project with basic config' template. Make sure to initialize a git repo if you haven't already:

```bash
npm create checkly
```

3. Login to your Checkly account and follow the prompts by running:

```bash
npx checkly login
```

4. You can make sure everything is working with a dry run of your tests with:

```bash
npx checkly test
```

5. You can deploy your project to Checkly by using:

```bash
npx checkly deploy
```
After you deploy, you should see the tests on your Checkly dashboard. 

## Creating your tests

Once you create a new Checkly project you should notice a new directory named `__checks__`. You can create a new directory inside the `__checks__` directory to hold all your tests. In this example I've created a directory named `tests` (you can name it anything you want) to hold all the tests. If you prefer, you can keep all your test files directly in the `__checks__` directory instead. 

Create a new test file for each of your playwright tests inside the `tests` or `__checks__` directory. Make sure your playwright test files end with .spec.ts so that Checkly can identify them as tests.

Any new tests created inside the `tests` or `__checks__` directory will automatically be found and deployed to Checkly when you run `npx checkly deploy`. You can use this command manually to deploy from the terminal, or with your CI/CD pipeline. 

## Setting up Email Alerts

The first step is to create an email alert channel. You can create it directly inside the `checkly.config.ts` file, or create a new file in the `__checks__` directory called `alert-channels.ts`. In this example I've created a new file to help keep things organized.

Add the following to `alert-channels.ts`:

```typescript
import { EmailAlertChannel } from "checkly/constructs";

// Create an email channel for notifications if a test fails.
export const emailChannel = new EmailAlertChannel("email-channel-1", {
  address: "<YOUR EMAIL ADDRESS HERE>",
});
```

Make sure to change `<YOUR EMAIL ADDRESS HERE>` with your actual email address. This will be the email address where notifications are sent. 

Next, import the email channel into the `checkly.config.ts` file and add it to the 'checks' object:

```typescript
// Import your email channels from the alert-channels.ts file
import { emailChannel } from "./__checks__/alert-channels";

const config = defineConfig({
  // Additional code ...

  checks: {
    // Add your alert channels here. In this case we just have one email alert channel. 
    alertChannels: [emailChannel],

    // Additional code ...
  },
  // Additional code ...
});
```

You can learn more about email alerts and other methods of notifications here: https://www.checklyhq.com/docs/alerting-and-retries/alert-channels/

## CI/CD 

Checkly makes it simple to connect with your CI/CD pipeline. The specific configuration will depend on which pipeline you’re using. The basic steps all CI/CD pipelines are: 

1. Make sure the tests are tracked in the git repo so that the latest version is available whenever an update is pushed to the remote repo. 
2. Once the new code is deployed, run `npx checkly test` to ensure all tests are successful. 
3. If the tests are successful, run `npx checkly deploy` to deploy the tests to Checkly. 

Ideally you would run these commands in the staging environment so you can catch any errors before being deployed to production. 

You can find more information about using Checkly with a CI/CD pipeline here: https://www.checklyhq.com/docs/cicd/