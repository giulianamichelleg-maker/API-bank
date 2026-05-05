import accountsService from "../services/accountsService.js";

const createAccount = async (req, res, next) => {
    try {
        const newAccount = await accountsService.createAccount(req.body);
         res.status(201).json(newAccount);
    } catch (error) {
        next(error);
    }
}

export default {
    createAccount,
}