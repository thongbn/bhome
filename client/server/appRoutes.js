import IndexRouter from "./routes";
import ProjectRouter from "./routes/project";
import ContactRouter from "./routes/contact";
import ProductRouter from "./routes/product";
import AboutRouter from "./routes/about";

const AppRoutes = (app) => {
    app.use('/', IndexRouter);
    app.use('/cong-trinh', ProjectRouter);
    app.use('/lien-he', ContactRouter);
    app.use('/san-pham', ProductRouter);
    app.use('/gioi-thieu', AboutRouter);
};

export default AppRoutes;