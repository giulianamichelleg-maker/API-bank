const adminMiddleware = (req, res, next)=>{
    if(req.user.role !== "admin"){
        return res.status(403).json({
            error: "Acesso negado: apenas administradores podem acessar este recurso"
        })
    }
    next();

}
export default adminMiddleware;