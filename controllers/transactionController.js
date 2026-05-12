import transactionService from "../services/transactionService.js";

const transactionsFind = async (req, res, next) => {
    try {
        const listTransaction = await transactionService.transactionsFind();
        res.status(201).json(listTransaction);
    } catch (error) {
        next(error);
    }
}
const transactionForId = async(req, res, next)=>{
    try{
const findId = await transactionService.transactionForId(req.params.id);
res.status(202).json(findId)
    }catch (error){
        next(error)
    }
}
export default {
    transactionsFind,
    transactionForId
}
