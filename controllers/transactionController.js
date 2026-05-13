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
const transactionType = async(req, res, next)=>{
    try{
        const findTransactionType = await transactionService.transactionType(req.params.type);
        res.status(202).json(findTransactionType)
    }catch(error){
        next(error)
    }
}
const transactionMinMax = async(req, res, next)=>{
    try{
        const transactionMinMax = await transactionService.transactionMinMax(req.params.min, req.params.max);
        res.status(202).json(transactionMinMax)
    } catch(error){
        next(error)
    }
}
const transactionYear = async(req, res, next)=>{
    try{
const transaction = await transactionService.transactionYear(req.params.year)
res.status(202).json(transactionYear)
    }catch(error){
    next(error)
    }
}
export default {
    transactionsFind,
    transactionForId,
    transactionType,
    transactionMinMax,
    transactionYear
}
