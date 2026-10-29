import HomePage from "@pages/home.page";
import SigninPage from "@pages/signin.page";

import { ROUTES } from "@routes/navigate";

export const publicRoutes = [
  { path: ROUTES.HOME, Component: HomePage },
  { path: ROUTES.SIGN_IN, Component: SigninPage },
];
