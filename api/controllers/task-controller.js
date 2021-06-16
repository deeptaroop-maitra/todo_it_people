import { Tasks } from "../models";
import { allFieldsRequiredS } from "../utilities/error-functions";

export const createTask = async function (req, res) {
    let error = '';
    try {
        if (!req.body.name || !req.body.date || !req.body.userId) 
        {
            return allFieldsRequiredS(res);
        }
        const { name, date, userId } = req.body;
        const details = new Tasks({
            name: name,
            date: date,
            userId: userId,
        });
        let response = await details.save();
        if(response)
        {
            return res.status(200).json({
                message: 'Details Saved Successfully',
                data: response,
                status: true
            });
        }
        else
        {
            return res.status(500).json({
                message: 'Internal Server Error',
                status: false
            });
        }
    } 
    catch (err) {
        error = err.message;
    }
};

export const getTasks = async function (req, res) {
    let error = '';
    try {
        if (!req.body.userId) 
        {
            return allFieldsRequiredS(res);
        }
        const { userId } = req.body;
        const tasks = await Tasks.find({ userId: userId });
        if(tasks.length > 0)
        {
            return res.status(200).json({
                message: 'Tasks Fetched Successfully',
                data: tasks,
                status: true
            });
        }
        else
        {
            return res.status(422).json({
                message: 'No Tasks Found',
                status: false
            });
        }
    } 
    catch (err) {
        error = err.message;
    }
};

export const updateTask = async function (req, res) {
    let error = '';
    try {
        if (!req.body.name || !req.body.date || !req.body.userId || !req.body.isCompleted || !req.body.id) 
        {
            return allFieldsRequiredS(res);
        }
        const { name, date, userId, isCompleted, id } = req.body;
        const task = await Tasks.findOne({ _id: id });
        if(task)
        {
            let data = {
                name: name,
                date: date,
                userId: userId,
                isCompleted: isCompleted
            };
            await Tasks.updateOne({ _id: id }, data);
            return res.status(200).json({
                message: 'Task Updated Successfully',
                status: true
            });
        }
        else
        {
            return res.status(422).json({
                message: 'No Task Found',
                status: false
            });
        }
    } 
    catch (err) {
        error = err.message;
    }
};

export const deleteTask = async function (req, res) {
    let error = '';
    try {
        if (!req.body.id) 
        {
            return allFieldsRequiredS(res);
        }
        const { id } = req.body;
        const response = await Tasks.deleteOne({ _id: id });
        if(response)
        {
            return res.status(200).json({
                message: 'Task Deleted Successfully',
                status: true
            });
        }
        else
        {
            return res.status(500).json({
                message: 'Internal Server Error',
                status: false
            });
        }
    } 
    catch (err) {
        error = err.message;
    }
};