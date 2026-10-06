const Expense = require("../MODELS/Expense");


// CREATE EXPENSE
const createExpense = async (req, res) => {
    try {
        const{title, amount, category, description, expense_mode, date}= req.body;

        if(!title||!amount||!category||!expense_mode){
            return res.status(400).json({
                message:"Title, amount, category and expense_mode are required"
            });
        }
        const expense = await Expense.create({
            user: req.user.userId,
            title,
            amount,
            category,
            description,
            expense_mode,
            date
        });
        res.status(201).json({
            message:"Expense created successfully",
            expense
        });
    } catch (error) {
        res.status(500).json({
            message:"Failed to create expense",
            error: error.message
        });
    }
};



// GET ALL EXPENSES

const getExpenses = async (req, res) => {
    try{
        const expenses = await Expense.find({user: req.user.userId}).sort({date:-1}); // -1 is for descending
        res.status(200).json(expenses);
    }catch(error){
        res.status(500).json({
            message: "Failed to get expenses",
            error: error.message
        });
    }
};



// for single data

const getExpenseById = async(req, res)=>{
    try {
        // const expense = await Expense.findById(req.params.id);
        const expense = await Expense.findOne({_id:req.params.id, user: req.user.userId});
        if(!expense){
            return res.status(404).json({
                message: "Expense not found"
            });
        }
        res.status(200).json(expense);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get expense",
            error: error.message
        });
    }
};


// Update expense
const updateExpense = async (req, res) => {
    try{
        // const expense = await Expense.findByIdAndUpdate(
        //     req.params.id,
        //     req.body,{
        //         new:true,
        //         runValidators:true
        //     }
        // );


        const expense = await Expense.findOneAndUpdate({_id:req.params.id,
            user: req.user.userId
        },
            req.body,{
                new:true,
                runValidators:true
            }
        );

        if(!expense){
            return res.status(404).json({
                message: "Expense not found"
            });
        }
        res.send(200).json({
            message:"Failed to update successfully"
        });
    }
    catch(error){
        res.status(500).json({
            message: "Failed to get expense",
            error: error.message
        });
    }    
}



// Delete expense

const deleteExpense = async (req, res) => {
    try{
        // const expense = await Expense.findByIdAndDelete(
        //     req.params.id,
        // );

        const expense = await Expense.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });
        if(!expense){
            return res.status(404).json({
                message: "Expense not found"
            });
        }
        res.send(200).json({
            message:"Failed to deleted successfully"
        });
    }
    catch(error){
        res.status(500).json({
            message: "Failed to delete expense",
            error: error.message
        });
    }    
};



module.exports = {
    getExpenses,
    getExpenseById,
    createExpense,
    updateExpense,
    deleteExpense,
}