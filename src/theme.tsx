import {DefaultTheme, ThemeProvider} from "styled-components";
import { FunctionalComponent, h } from 'preact';

export const themeConfig: DefaultTheme = {
    colors: {
        level0: '#FFFFFF',
        level1: '#F2F2F2',
        level2: '#DAD9D9',
        level3: '#585D71',
        brand1: '#0B25E5',
        brand2: '#0C1642',
    },
    fonts: ["Roboto"],
    fontSizes: {
        small: "14px",
        medium: "17px",
        large: "22px"
    }
};

const Theme: FunctionalComponent = ({ children }) => (
    <ThemeProvider theme={themeConfig}>{children}</ThemeProvider>
);

export default Theme;
