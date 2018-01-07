export interface Request {
    name: string;
    email: string;
    phone: string;
    description: string;
    vacancy: string;
}

const emptyRequest:Request = {
    name: '',
    email: '',
    phone: '',
    description: '',
    vacancy: ''
}

const getEmptyRequest = () => {
    return Object.assign({}, emptyRequest);
}

export {getEmptyRequest}
