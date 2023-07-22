declare module "*.scss";
declare module "*.module.scss";
declare module "*.module.css";
declare module "*.css";
declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
