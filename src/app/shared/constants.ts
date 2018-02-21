export class Pages {
    public static HOME = 'home';
    public static VACANCIES = 'vacancies';
    public static VACANCY = 'vacancy';
    public static ABOUT = 'about';
    public static CONTACT = 'contact';
}

export class StaticTranslations {
    private static MAP = {
        ru: {
            Male: 'мужчины',
            Female: 'женщины',
            'Female and Male': 'женщины и мужчины',
            location: 'место расположения',
            gender: 'пол',
            age: 'возраст',
            qualification: 'квалификация',
            duties: 'обязанности',
            'work schedule': 'рабочий график',
            payment: 'зарплата',
            'work conditions': 'рабочие условия',
            'employment conditions': 'условия трудоустройства',
            'residence conditions': 'условия проживания',
            'Apply': 'Подать заявку',
            Details: 'Подробнее',
            'Show on map': 'Показать на карте'
        },
        ua: {
            Male: 'чоловіки',
            Female: 'жінки',
            'Female and Male': 'жінки і чоловіки',
            location: 'місце розташування',
            gender: 'стать',
            age: 'вік',
            qualification: 'кваліфікація',
            duties: 'обов\'язки',
            'work schedule': 'робочий графік',
            payment: 'зарплата',
            'work conditions': 'робочі умови',
            'employment conditions': 'умови працевлаштування',
            'residence conditions': 'умови проживання',
            'Apply': 'Подати заявку',
            Details: 'Детальніше',
            'Show on map': 'Показати на карті'
        }
    }

    private static locale_:string = 'ua';


    static set locale(locale) {
        if (locale in this.MAP) {
            this.locale_ = locale
        } else {
            throw Error(`Incorrect locale: ${locale}`);
        }
    }

    static translate(key) {
        var language = this.MAP[this.locale_];
        if (language.hasOwnProperty(key)) {
            return language[key];
        }
        return key;
    }
}