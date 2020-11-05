import axios from 'axios';

// In production the requests made to `/api/` are proxied to production backend -> `public/_redirects`:
// https://www.netlify.com/docs/redirects/#proxying
// In development the reuqests are proxied to staging backend in setupProxy.js:
// https://create-react-app.dev/docs/proxying-api-requests-in-development/#configuring-the-proxy-manually
const api = axios.create({
  baseURL: '/api/',
  timeout: 5500,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

function getCookie(name: string) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

api.interceptors.request.use(
  // Set CSRF token before sending a request
  function (config) {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
      config.headers.common['X-CSRFToken'] = csrfToken;
    } else {
      config.headers.common['X-CSRFToken'] = null;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const login = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => api.post<{}>('/dashboard/login/', { username, password });

export const logout = () => {
  return api.delete('/dashboard/logout/');
};

export const getMe = () => {
  return api.get('/dashboard/me/');
};

export const getUserByEmail = (email: string) =>
  api.post<{ id: number; nickname: string; timezone: string }>(
    '/dashboard/find-user/',
    { email }
  );

export const getTrackingDataPoints = ({
  userId,
  start,
  end,
  limit,
  offset,
}: {
  userId?: number | null;
  start: string;
  end: string;
  limit: number;
  offset: number;
}) => {
  return api.get<
    {
      id: number;
      name: string;
      started: Date;
      completed: Date;
    }[]
  >(
    `/dashboard/${
      userId || 'me'
    }/data-points/?start=${start}&end=${end}&limit=${limit}&offset=${offset}`
  );
};

export const downloadMealItemImage = ({
  userId,
  realmId,
}: {
  userId?: number | null;
  realmId: string;
}) => {
  return api.get(`/dashboard/${userId || 'me'}/images/${realmId}/`, {
    responseType: 'blob',
  });
};

export const getQuestionnaires = ({
  userId,
  limit,
  offset,
}: {
  userId: number;
  limit: number;
  offset: number;
}) => {
  return api.get(
    `dashboard/${userId}/questionnaires/?limit=${limit}&offset=${offset}`
  );
};

export const getQuestionnaire = ({
  userId,
  submissionId,
}: {
  userId: number;
  submissionId: string;
}) => {
  return api.get(`/dashboard/${userId}/questionnaires/${submissionId}/`);
};

export const requestResetPassword = (username: string) => {
  return api.post('/dashboard/request-reset-password/', { username });
};

export const resetPassword = ({
  password,
  token,
}: {
  password: string;
  token: string;
}) => {
  return api.post('/dashboard/reset-password/', { password, token });
};

export const changePassword = ({
  currentPassword,
  newPassword,
}: {
  currentPassword: string;
  newPassword: string;
}) => {
  return api.post('/dashboard/change-password/', {
    current: currentPassword,
    new: newPassword,
  });
};

export const getChatRooms = ({
  limit,
  offset,
}: {
  limit: number | string;
  offset: number | string;
}) => {
  return api.get(`/dashboard/chat/rooms/?limit=${limit}&offset=${offset}`);
};

export const getChatRoom = (userId: number) => {
  return api.get(`/dashboard/chat/rooms/${userId}/`);
};

export const getMessages = (userId: number | string) => {
  return api.get(`/dashboard/chat/rooms/${userId}/messages/`);
};

export default api;
