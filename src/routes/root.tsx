import * as React from "react";
import TopBar from "../components/layout/topbar";
import Footer from "../components/layout/footer";
import withProviders from "../providers";
import { Link, Outlet } from "react-router-dom";
import { Box, Container } from "@mui/material";
// import ProductCategories from "./modules/views/ProductCategories";
// import ProductSmokingHero from "./modules/views/ProductSmokingHero";
// import AppFooter from "./modules/views/AppFooter";
// import ProductValues from "./modules/views/ProductValues";
// import ProductHowItWorks from "./modules/views/ProductHowItWorks";
// import ProductCTA from "./modules/views/ProductCTA";
// import ProductHero from "./components/views/ProductHero";

function Root() {
  return (
    <React.Fragment>
      <TopBar />
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "background.default", minHeight: "90vh" }}
      >
        <Outlet />
      </Container>
      <Footer />
    </React.Fragment>
  );
}

export default withProviders(Root);

// export default function Root() {
//   return (
//     <>
//       <div id="sidebar">
//         <h1>React Router Contacts</h1>
//         <div>
//           <form id="search-form" role="search">
//             <input
//               id="q"
//               aria-label="Search contacts"
//               placeholder="Search"
//               type="search"
//               name="q"
//             />
//             <div id="search-spinner" aria-hidden hidden={true} />
//             <div className="sr-only" aria-live="polite"></div>
//           </form>
//           <form method="post">
//             <button type="submit">New</button>
//           </form>
//         </div>
//         <nav>
//           <ul>
//             <li>
//               <Link to={`contacts/1`}>Your Name</Link>
//             </li>
//             <li>
//               <Link to={`contacts/2`}>Your Friend</Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//       <div id="detail">
//         <Outlet />
//       </div>
//     </>
//   );
// }
