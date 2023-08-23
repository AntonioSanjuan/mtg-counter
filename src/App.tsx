import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './layouts/BaseLayout/BaseLayout';
import { LoginLayout } from './layouts/LoginLayout/LoginLayout';
import Alert from './components/Alert/Alert';
import { AuthRouteGuard } from './guards/authGuard/auth.guard';

const HomePageLazy = React.lazy(() => import('./pages/Home/Home'));
const ProfilePageLazy = React.lazy(() => import('./pages/Profile/Profile'));
const HistoricPageLazy = React.lazy(() => import('./pages/Historic/Historic'));
const SignUpPageLazy = React.lazy(() => import('./pages/SignUp/SignUp'));
const LoginPageLazy = React.lazy(() => import('./pages/Login/Login'));
const DeckCollectionPageLazy = React.lazy(() => import('./pages/DeckCollection/DeckCollection'));

function App() {
  return (
    <>
      <Alert />
      <Routes>
        <Route
          path=""
          element={
            <Layout />
}
        >
          <Route
            path=""
            element={(
              <React.Suspense fallback={<>...</>}>
                <HomePageLazy />
              </React.Suspense>
                  )}
          />
          <Route
            path="profile"
            element={(
              <React.Suspense fallback={<>...</>}>
                <ProfilePageLazy />
              </React.Suspense>
                  )}
          />
          <Route
            path="history"
            element={(
              <React.Suspense fallback={<>...</>}>
                <AuthRouteGuard>
                  <HistoricPageLazy />
                </AuthRouteGuard>
              </React.Suspense>
                  )}
          />
          <Route
            path="deckCollection"
            element={(
              <React.Suspense fallback={<>...</>}>
                <AuthRouteGuard>
                  <DeckCollectionPageLazy />
                </AuthRouteGuard>
              </React.Suspense>
                  )}
          />
          <Route
            path="*"
            element={(
              <React.Suspense fallback={<>...</>}>
                <HomePageLazy />
              </React.Suspense>
                  )}
          />
        </Route>
        <Route
          path="login"
          element={
            <LoginLayout />
}
        >
          <Route
            index
            element={(
              <React.Suspense fallback={<>...</>}>
                <LoginPageLazy />
              </React.Suspense>
          )}
          />
        </Route>
        <Route
          path="signUp"
          element={
            <LoginLayout />
}
        >
          <Route
            index
            element={(
              <React.Suspense fallback={<>...</>}>
                <SignUpPageLazy />
              </React.Suspense>
          )}
          />
        </Route>
      </Routes>
    </>

  );
}

export default App;
