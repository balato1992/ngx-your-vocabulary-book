
const redirect_postfix = 'google/callback';

export const CONFIG = {
    oAuth_id: '',
    oAuth_pass: '',
    oAuth_scope: [
    ],
    oAuth_redirect_postfix: redirect_postfix,
    oAuth_redirect: 'http://localhost:3000/auth/' + redirect_postfix,

    mongoUri: ''
};
