export type PrizesT = [
    100,
    200,
    300,
    500,
    1000,
    2000,
    4000,
    8000,
    16000,
    32000,
    64000,
    125000,
    250000,
    500000,
    1000000
];

export type QuestionT = {
    id: string;
    question: string;
    options: [string, string, string, string];
    correct: number;
    difficulty: string;
};

export type InitialState = {
    answeredQuestions: [] | QuestionT[];
    nextQuestions: QuestionT[];
    currentQuestion: QuestionT;
    optionClicked: string;
    didUserWin: boolean;
    gameFinished: boolean;
    withdraw: boolean;
    askTheAudience: { hasAsked: boolean; count: number };
    deleteTwoOptions: {
        hasDeleted: boolean;
        firstOption: number | null;
        secondOption: number | null;
        count: number;
    };
    callYourFriend: { hasAsked: boolean; isOpen: boolean };
    audio: {
        backgroundAudioIsOn: boolean;
        backgroundAudioSrc: string;
        effectsAudioIsOn: boolean;
        effectsAudioSrc: string;
    };
};

export type Action = {
    type: string;
    payload?: string;
    isOpen?: boolean;
    audio?: {
        bgSrc?: string;
        bgIsOn?: boolean;
        effectIsOn?: boolean;
        effectSrc?: string;
    };
};

export type MyDispatch = ({ type, payload, audio }: Action) => void;

export type AudioT = {
    backgroundAudioIsOn: boolean;
    backgroundAudioSrc: string;
    effectsAudioIsOn: boolean;
    effectsAudioSrc: string;
};

export type HelperToolsProps = {
    withdraw: boolean;
    answeredQuestionsLength: number;
    askTheAudience: { hasAsked: boolean; count: number };
    deleteTwoOptions: {
        hasDeleted: boolean;
        firstOption: null | number;
        secondOption: null | number;
        count: number;
    };
    callYourFriend: { hasAsked: boolean; isOpen: boolean };
    audio: AudioT;
    dispatch: MyDispatch;
};

export type FieldProps = {
    text: string;
    question: QuestionT;
    clicked?: string;
    index?: number;
    isQuestion?: boolean;
    deleteThisOption?: boolean;
    dispatch?: MyDispatch;
};
