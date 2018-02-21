export interface OnlineForm {
    name: string;
    email: string;
    phone: string;
    description: string;
    vacancy: string;
    office: string;
}

const emptyRequest:OnlineForm = {
    name: '',
    email: '',
    phone: '',
    description: '',
    vacancy: '',
    office: ''
}

const getEmptyOnlineForm = () => {
    return Object.assign({}, emptyRequest);
}

export {getEmptyOnlineForm}

