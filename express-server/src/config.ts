
const redirect_postfix = 'google/callback';

let baseUrl = '';
let mongoUri = '';

// 'production', 'development'
if (typeof process.env.NODE_ENV === 'string' && process.env.NODE_ENV.trim() === 'development') {
    baseUrl = '';
    mongoUri = '';
}

let config = {
    oAuth_id: '',
    oAuth_pass: '',
    oAuth_scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile',
        'email'
    ],
    oAuth_redirect_postfix: redirect_postfix,
    oAuth_redirect: `${baseUrl}/auth/${redirect_postfix}`,

    mongoUri: mongoUri
};

export const CONFIG = config;
