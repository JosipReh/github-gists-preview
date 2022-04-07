import 'styled-components';

declare module "*.css" {
    const mapping: Record<string, string>;
    export default mapping;
}


declare module "styled-components" {
    export interface DefaultTheme {
        colors: {
            level0: string;
            level1: string;
            level2: string;
            level3: string;
            brand1: string;
            brand2: string;
        };
        fonts: string[];
        fontSizes: {
            small: string;
            medium: string;
            large: string;
        };
    }
}