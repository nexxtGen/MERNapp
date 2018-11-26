// plik server/server.js.
// korzystamy z middleware'a, który przepuszcza każde zapytanie przez funkcję match
app.use((req, res, next) => {
    // funkcja match stara się dopasować na podstawie url z którego zostało wykonane zapytanie do jednego z routów
    match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
      // jeśli podczas dopasowywania routingu pojawił się błąd należy odesłać odpowiedź błędu razem z kodem 500 oznaczającym błąd serwera
      if (err) {
        return res.status(500).end(renderError(err));
      }
  
      // w przypadku obecności obiektu Location, zostaniemy przekierowani na tę lokalizację. 302 to kod, który oznacza właśnie przekierowanie
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }
  
      // renderProps to obiekt, który powinniśmy przekazać jako kontekst dla React Routera. Jeśli go nie ma możemy przepuścić middleware'a dalej
      if (!renderProps) {
        return next();
      }
  
      const store = configureStore();
  
      // Pobieramy dane potrzebne do "nawodnienia" komponentu.
      return fetchComponentData(store, renderProps.components, renderProps.params)
        // jeśli nam to wyjdzie korzystamy z metody renderToString zawartej w paczce react-dom/server i na podstawie przekazanych komponentów generujemy kod HTML, który następnie wrzucimy do pełnego szablonu HTML naszej strony.
        .then(() => {
          const initialView = renderToString(
            <Provider store={store}>
              <IntlWrapper>
                <RouterContext {...renderProps} />
              </IntlWrapper>
            </Provider>
          );
  
         // ustalamy ostateczny stan na podstawie wygenerowanego komponentu tak, aby przy starcie aplikacji po stronie klienta można było zasilić store jakimiś danymi.
          const finalState = store.getState();
  
          res
            .set('Content-Type', 'text/html')
            .status(200)
            // renderujemy całą stronę na podstawie stworzonego pierwszego widoku i stanu apki
            .end(renderFullPage(initialView, finalState));
        })
         // wyłapujemy wszystkie błędy związane z pobieraniem danych do komponentu
        .catch((error) => next(error));
    });
});