import { Request, Response, NextFunction } from "express";

export interface IController {

    req: Request;
    res: Response;
    next: NextFunction;

    /**
     * Endpoint functions must start by the name of the HTTP method case insensitive.
     * @example
     * all(): void {
     *     this.res.send("Hello");
     * }
     * 
     * Following the method name separation by _ for intercepting sub routes.
     * You can use $ for intercepting queries.
     * 
     * @example
     * all_login(): void {
     *     this.auth.isLogged() && this.redirect(Home);
     * }
     * 
     * @example
     * all_image$authid(): void {
     *     this.auth.isDenied() && this.redirect(DeniedRoute);
     * }
     */
    all?(): void;

    /**
     * Endpoint functions must start by the name of the HTTP method case insensitive.
     * @example
     * get(): void {
     *     this.res.send("Hello");
     * }
     * 
     * Following the method name separation by _ for intercepting sub routes.
     * You can use $ for intercepting queries.
     * 
     * @example
     * get_login(): void {
     *     this.auth.isLogged() && this.redirect(Home);
     * }
     * 
     * @example
     * get_image$authid(): void {
     *     this.auth.isDenied() && this.redirect(DeniedRoute);
     * }
     */
    get?(): void;

    /**
     * Endpoint functions must start by the name of the HTTP method case insensitive.
     * @example
     * post(): void {
     *     this.res.send("Hello");
     * }
     * 
     * Following the method name separation by _ for intercepting sub routes.
     * You can use $ for intercepting queries.
     * 
     * @example
     * post_login(): void {
     *     this.auth.isLogged() && this.redirect(Home);
     * }
     * 
     * @example
     * post_image$authid(): void {
     *     this.auth.isDenied() && this.redirect(DeniedRoute);
     * }
     */
    post?(): void;

    /**
     * Endpoint functions must start by the name of the HTTP method case insensitive.
     * @example
     * put(): void {
     *     this.res.send("Hello");
     * }
     * 
     * Following the method name separation by _ for intercepting sub routes.
     * You can use $ for intercepting queries.
     * 
     * @example
     * put_login(): void {
     *     this.auth.isLogged() && this.redirect(Home);
     * }
     * 
     * @example
     * put_image$authid(): void {
     *     this.auth.isDenied() && this.redirect(DeniedRoute);
     * }
     */
    put?(): void;

    /**
     * Endpoint functions must start by the name of the HTTP method case insensitive.
     * @example
     * patch(): void {
     *     this.res.send("Hello");
     * }
     * 
     * Following the method name separation by _ for intercepting sub routes.
     * You can use $ for intercepting queries.
     * 
     * @example
     * patch_login(): void {
     *     this.auth.isLogged() && this.redirect(Home);
     * }
     * 
     * @example
     * patch_image$authid(): void {
     *     this.auth.isDenied() && this.redirect(DeniedRoute);
     * }
     */
    patch?(): void;

    /**
     * Endpoint functions must start by the name of the HTTP method case insensitive.
     * @example
     * delete(): void {
     *     this.res.send("Hello");
     * }
     * 
     * Following the method name separation by _ for intercepting sub routes.
     * You can use $ for intercepting queries.
     * 
     * @example
     * delete_login(): void {
     *     this.auth.isLogged() && this.redirect(Home);
     * }
     * 
     * @example
     * delete_image$authid(): void {
     *     this.auth.isDenied() && this.redirect(DeniedRoute);
     * }
     */
    delete?(): void;
}