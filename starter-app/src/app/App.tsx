import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UICallback from "./pages/ui-callback";
import Callback from "./pages/callback";
import Configure from "./pages/configure";
import AccessDenied from "./pages/authorization-error";
import ErrorBoundary from "./components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import CMCallback from "./pages/cm-callback";
export const queryClient = new QueryClient();
export default function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route path="/ui/callback">
              <UICallback />
            </Route>
            <Route path="/ui/vercel">
              <Callback />
            </Route>
            <Route path="/configure">
              <Configure />
            </Route>
            <Route path="/cancel">
              <AccessDenied />
            </Route>

            <Route path="/ui/content-models/callback">
              <QueryClientProvider client={queryClient}>
                <CMCallback />
                <ReactQueryDevtools initialIsOpen={false} />
              </QueryClientProvider>
            </Route>
          </Switch>
        </Router>
      </ErrorBoundary>
    </div>
  );
}
