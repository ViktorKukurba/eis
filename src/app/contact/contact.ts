class Phone {
    number: string;
    viber: boolean;
}

export class Contact {
    city: string;
    street: string;
    phones: Phone[];
    lat: number;
    lng: number;
    email: string;
}

export class ContactPageContent {
    title: string;
    action_button: string;
    contact_email: string;
    email_label: string;
    official_form_download: string;
    official_form_info: string;
    official_form_upload: string;
    online_form_info: string;
    online_form_open_action: string;
    online_form_send_action: string;
    request_label: string;
    search_button: string;
    site_title: string;
    sub_title: string;
    vk_link: string;
    vk_label: string;
}
