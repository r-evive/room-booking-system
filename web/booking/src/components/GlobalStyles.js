import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  .MuiGrid-root {
    flex-grow: 1;
  }

  .MuiDataGrid-columnHeader--sortable{
    background-color: rgba(150, 170, 255, 0.1) !important;
  }
`;
 
export default GlobalStyle;