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
};

export type InitialState = {
    answeredQuestions: [] | QuestionT[];
    nextQuestions: QuestionT[];
    currentQuestion: QuestionT;
    optionClicked: string;
    didUserWin: boolean;
    gameFinished: boolean;
    withdraw: boolean;
    askTheAudience: { hasAsked: boolean; isOpen: boolean };
    deleteTwoOptions: {
        hasDeleted: boolean;
        firstOption: number | null;
        secondOption: number | null;
        count: number;
    };
    callYourFriend: { hasAsked: boolean; isOpen: boolean };
    audio: AudioT;
};

export type Action = {
    type: string;
    payload?: string;
    questions?: QuestionT[];
    OpenTarget?: boolean;
    audio?: {
        bgSrc?: string;
        bgIsOn?: boolean;
        effectIsOn?: boolean;
        effectSrc?: string;
    };
};

export type MyDispatch = ({ type, payload, OpenTarget, audio }: Action) => void;

export type AudioT = {
    backgroundAudioIsOn: boolean;
    backgroundAudioSrc: string;
    effectsAudioIsOn: boolean;
    effectsAudioSrc: string;
    appAudioIsOn: boolean;
};

export type HelperToolsProps = {
    withdraw: boolean;
    answeredQuestionsLength: number;
    askTheAudience: { hasAsked: boolean; isOpen: boolean };
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

export type AnswerProps = {
    question: QuestionT;
    optionClicked: string;
    deleteTwoOptions: {
        hasDeleted: boolean;
        firstOption: null | number;
        secondOption: null | number;
        count: number;
    };
    dispatch: MyDispatch;
};

export type ModalProps = {
    correctIndex: number;
    deleteTwoOptions: {
        hasDeleted: boolean;
        firstOption: null | number;
        secondOption: null | number;
        count: number;
    };
    askTheAudience: { hasAsked: boolean; isOpen: boolean };
};

export type ModalCallProps = {
    callYourFriend: { hasAsked: boolean; isOpen: boolean };
    currentQuestion: QuestionT;
    audio: AudioT;
    dispatch: MyDispatch;
};
