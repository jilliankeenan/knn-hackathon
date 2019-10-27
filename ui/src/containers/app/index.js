import React from 'react';
import CataloguePage from '../catalogue';
import ResultPage from '../result';
import '../../reset.css';
import { Nav, AppContainer, Brand } from './styled'
import { ThemeProvider } from 'styled-components';
import theme from '../../theme';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import logo from '../../logo.svg';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <AppContainer>
                    <Nav>
                        <Brand to="/catalogue">
                            <img src={logo} height={32} width={32} alt="logo" />
                            Vaidar Platform</Brand>
                    </Nav>
                    <Switch>
                        <Route path="/catalogue">
                            <CataloguePage />
                        </Route>
                        <Route path="/result/:videoId">
                            <ResultPage />
                        </Route>
                        <Route path="/">
                            <CataloguePage />
                        </Route>
                    </Switch>
                </AppContainer>
            </Router>
        </ThemeProvider>
    );
}

export default App;
