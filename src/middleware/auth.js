export function authenticateUser(...allowedRoles) {
    return (req, res, next) => {
        if (!req.session?.userId || !req.session.userRole) {
            return res.redirect("/");
        }

        if (allowedRoles.length > 0 && !allowedRoles.includes(req.session.userRole)) {
            return res.redirect("/error/403");
        }

        return next();
    };
}

export function masterAdminAuth() {
    return (req, res, next) => {
        if (!req.session?.adminId || !req.session.adminRole == "masterAdmin") {
            return res.redirect("/masterAdmin/login");
        }
        return next();
    };
}
