import adminService from "../services/adminService.js";
import userService from "../services/userService.js"




const adminUserActive = async (req, res, next) => {
    try {
        const userActive = await adminService.adminUserActive(req.params.user)
        res.status(202).json(userActive)
    } catch (error) {
        next(error)
    }
}
const adminUserInactive = async (req, res, next) => {
    try {
        const userInactive = await adminService.adminUserInactive(req.params.user)
        res.status(202).json(userInactive)
    } catch (error) {
        next(error)
    }
}
const adminUpdateUser = async (req, res, next) => {
    try {
        const updateActivate = await adminService.adminUpdateUser(req.params.id, req.params.user)
        res.status(202).json(updateActivate)
    } catch (error) {
        next(error)
    }
}
const adminUpdateDesactivate = async (req, res, next)=>{
    try{
const updateDesactivate  = await adminService.adminUpdateDesactivate(req.params.id)
res.status(202).json(updateDesactivate)
    }catch(error){
        next(error)
    }
}
const getAccountsActive = async(req, res, next)=>{
    try{
        const accountActive = await adminService.getAccountsActive(req.params.accounts)
        res.status(202).json(accountActive)
    }catch(error){
        next(error)
    }
}
const getAccountsInactive = async(req,res,next)=>{
    try{
        const accountInactive = await adminService.getAccountsInactive(req.params.accounts)
        res.status(202).json(accountInactive)
    }catch (error){
        next(error)
    }
}
const accountsUpdateBlock = async(req, res, next)=>{
    try{
        const accountBlocked = await adminService.accountsUpdateBlock(req.params.id)
        res.status(202).json(accountBlocked);
    }catch(error){
        next(error)
    }
}
const accountsUpdateUnblock = async(req, res, next)=>{
    try{
        const accountUnblock = await adminService.accountsUpdateUnblock(req.params.id)
        res.status(202).json(accountUnblock);
    }catch(error){
        next(error)
    }
}
const accountClose = async (req, res, next)=>{
    try{
        const accountClose = await adminService.accountClose(req.params.id);
        res.status(202).json(accountClose);
    }catch(error){
        next(error);
    }
}
const accountFee = async(req, res, next)=>{
    try{
        const accountFee = await adminService.accountFee(req.params.id, req.body);
        res.status(202).json(accountFee)
    }catch(error){
        next(error)
    }
}
const accountRefund = async(req, res, next)=>{
    try{
        const accountRefund = await adminService.accountRefund(req.params.id, req.body);
        res.status(202).json(accountRefund)
    }catch(error){
        next(error)
    }
}
export default {
    adminUserActive,
    adminUserInactive,
    adminUpdateUser,
    adminUpdateDesactivate,
    getAccountsActive,
    getAccountsInactive,
    accountsUpdateBlock,
    accountsUpdateUnblock,
    accountClose,
    accountFee,
    accountRefund


}


