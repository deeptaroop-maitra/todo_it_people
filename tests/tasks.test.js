import { createTask, getTasks, updateTask, deleteTask } from '../api/controllers/task-controller';

const mockRequest = () => {
    return {
      body: {
            name: 'new name', 
            date: '17/06/2021', 
            userId: '1234',
            isCompleted: true,
            id: '2222'
        },
    };
};
const mockResponse = (message) => {
    return {
        json: function(){
            return { status: true }
        },
        status: function() {
            return true; 
        },
        message: message
    };
};
const mockFailedResponse = (message) => {
    return {
        json: function(){
            return { status: false }
        },
        status: function() {
            return false; 
        },
        message: message
    };
};

describe('create task', () => {
    it('should create a task', async () => {
        const req = mockRequest();
        const res = mockResponse('Details Saved Successfully');
        await createTask(req, res);
        expect(res.message).toBe('Details Saved Successfully');
    });
    it('should not create a task', async () => {
        const req = mockRequest();
        const res = mockFailedResponse('Internal Server Error');
        await createTask(req, res);
        expect(res.message).toBe('Internal Server Error');
    });
});

describe('get tasks', () => {
    it('should get all tasks', async () => {
        const req = mockRequest();
        const res = mockResponse('Tasks Fetched Successfully');
        await getTasks(req, res);
        expect(res.message).toBe('Tasks Fetched Successfully');
    });
    it('does not get any tasks', async () => {
        const req = mockRequest();
        const res = mockResponse('No Tasks Found');
        await getTasks(req, res);
        expect(res.message).toBe('No Tasks Found');
    });
});

describe('update task', () => {
    it('should update a tasks', async () => {
        const req = mockRequest();
        const res = mockResponse('Task Updated Successfully');
        await updateTask(req, res);
        expect(res.message).toBe('Task Updated Successfully');
    });
    it('should not update a task', async () => {
        const req = mockRequest();
        const res = mockResponse('No Task Found');
        await updateTask(req, res);
        expect(res.message).toBe('No Task Found');
    });
});

describe('delete task', () => {
    it('should delete a tasks', async () => {
        const req = mockRequest();
        const res = mockResponse('Task Deleted Successfully');
        await deleteTask(req, res);
        expect(res.message).toBe('Task Deleted Successfully');
    });
    it('should not delete a task', async () => {
        const req = mockRequest();
        const res = mockResponse('Internal Server Error');
        await deleteTask(req, res);
        expect(res.message).toBe('Internal Server Error');
    });
});