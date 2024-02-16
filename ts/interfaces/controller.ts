import { Request, Response, NextFunction } from "express";

export interface IController {

    req: Request;
    res: Response;
    next: NextFunction;

    /**
     * Endpoint functions must start by the name of the HTTP method case insensitive.
     * @example
     * all(): any {
     *     this.res.send("Hello");
     * }
     * 
     * Following the method name separation by _ for intercepting sub routes.
     * You can use $ for intercepting params.
     * 
     * @example
     * all_login(): any {
     *     this.auth.isLogged() && this.redirect(Home);
     * }
     * 
     * @example
     * all_image$authid(): any {
     *     this.auth.isDenied() && this.redirect(DeniedRoute);
     * }
     */
    all?(): any;

    /**
     * Endpoint functions must start by the name of the HTTP method case insensitive.
     * @example
     * get(): any {
     *     this.res.send("Hello");
     * }
     * 
     * Following the method name separation by _ for intercepting sub routes.
     * You can use $ for intercepting params.
     * 
     * @example
     * get_login(): any {
     *     this.auth.isLogged() && this.redirect(Home);
     * }
     * 
     * @example
     * get_image$authid(): any {
     *     this.auth.isDenied() && this.redirect(DeniedRoute);
     * }
     */
    get?(): any;

    /**
     * Endpoint functions must start by the name of the HTTP method case insensitive.
     * @example
     * post(): any {
     *     this.res.send("Hello");
     * }
     * 
     * Following the method name separation by _ for intercepting sub routes.
     * You can use $ for intercepting params.
     * 
     * @example
     * post_login(): any {
     *     this.auth.isLogged() && this.redirect(Home);
     * }
     * 
     * @example
     * post_image$authid(): any {
     *     this.auth.isDenied() && this.redirect(DeniedRoute);
     * }
     */
    post?(): any;

    /**
     * Endpoint functions must start by the name of the HTTP method case insensitive.
     * @example
     * put(): any {
     *     this.res.send("Hello");
     * }
     * 
     * Following the method name separation by _ for intercepting sub routes.
     * You can use $ for intercepting params.
     * 
     * @example
     * put_login(): any {
     *     this.auth.isLogged() && this.redirect(Home);
     * }
     * 
     * @example
     * put_image$authid(): any {
     *     this.auth.isDenied() && this.redirect(DeniedRoute);
     * }
     */
    put?(): any;

    /**
     * Endpoint functions must start by the name of the HTTP method case insensitive.
     * @example
     * patch(): any {
     *     this.res.send("Hello");
     * }
     * 
     * Following the method name separation by _ for intercepting sub routes.
     * You can use $ for intercepting params.
     * 
     * @example
     * patch_login(): any {
     *     this.auth.isLogged() && this.redirect(Home);
     * }
     * 
     * @example
     * patch_image$authid(): any {
     *     this.auth.isDenied() && this.redirect(DeniedRoute);
     * }
     */
    patch?(): any;

    /**
     * Endpoint functions must start by the name of the HTTP method case insensitive.
     * @example
     * delete(): any {
     *     this.res.send("Hello");
     * }
     * 
     * Following the method name separation by _ for intercepting sub routes.
     * You can use $ for intercepting params.
     * 
     * @example
     * delete_login(): any {
     *     this.auth.isLogged() && this.redirect(Home);
     * }
     * 
     * @example
     * delete_image$authid(): any {
     *     this.auth.isDenied() && this.redirect(DeniedRoute);
     * }
     */
    delete?(): any;
}