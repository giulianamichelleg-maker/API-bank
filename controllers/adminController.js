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



export default {
    adminUserActive,
    adminUserInactive,
    adminUpdateUser,

}


