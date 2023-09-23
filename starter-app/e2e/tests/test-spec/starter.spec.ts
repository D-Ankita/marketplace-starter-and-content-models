import { test } from "@playwright/test";
import { MarketplaceStarter } from "../pages/marketplace-starter";
import { AccountSetup } from "../pages/vercel-github-login";
import { deleteGitRepo } from "../utils/post-helper";

let apiKey: string;
let projectName: string;
let globalContext;
let marketplace;

test.beforeAll(async ({ browser }) => {
  globalContext = await browser.newContext();
  // create a new tab for github login
  const pageSetup = await globalContext.newPage();
  const setup = new AccountSetup(pageSetup);
  setup.accountLogin(); // github and vercel login

  const page = await globalContext.newPage();
  const cancelFlowPage = await globalContext.newPage();
  marketplace = new MarketplaceStarter(page, cancelFlowPage);
  await marketplace.visitMarketplace(); //go to marketplace
  const pageURL = await marketplace.findStarterApp(); // select starter app
  await cancelFlowPage.goto(pageURL);
});

//main test for E2E starter app
test("cancellation flow", async () => {
  await marketplace.cancelFlow(); // click on cancelFlow
  await marketplace.cancelScreen(); // cancellation navigation screen
});

test("starter app deployment flow", async () => {
  await marketplace.authorizeOrganization(); // get authorize in marketplace app
  await marketplace.starterDetails(); // add app name and start importing marketplace stack export
  await marketplace.vercelDeployment(); // create project in vercel
  //   projectName = await marketplace.getProjectName();
  // below test is skipped temporarily
  // const stackPage = await globalContext.newPage(); // create new tab for stack navigation link check
  // const vercelPage = await globalContext.newPage(); // create new tab got vercel navigation link check
  // const githubPage = await globalContext.newPage(); // create new tab got github navigation link check
  // [apiKey, projectName] = await Promise.all(
  //     [await marketplace.stackLinkResolver(stackPage),
  //     await marketplace.vercelLinkResolver(vercelPage),
  //     await marketplace.gitLinkResolver(githubPage)]) // visit and check all links
});

// after all E2E test delete newly created stack
test.afterAll(async () => {
  await marketplace.deleteStack(); // delete stack via ui
  // const authToken: string = await getAuthenticated();
  // await deleteStack(apiKey, authToken); // delete stack via api call's
  // await deleteGitRepo(projectName); // delete github repository
  // await deleteVercelProject(projectName);// delete vercel project
});
