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
  otp_token,
}: {
  username: string;
  password: string;
  otp_token: string;
}) => api.post<{}>('/dashboard/login/', { username, password, otp_token });

export const logout = () => {
  return api.delete('/dashboard/logout/');
};

export const getMe = () => {
  return api.get('/dashboard/me/');
};

export const getUserByEmailOrUsername = (input: string) => {
  const data = input.includes('@') ? { email: input } : { username: input };
  return api.post<{ email?: string; username?: string }>(
    '/dashboard/find-user/',
    { ...data }
  );
};

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

export const getUserDataById = (userId: number) => {
  return api.get(`/dashboard/${userId}/`);
};

export const getChatAuthorizationToken = () => {
  return api.get(`/dashboard/kabelwerk/`);
};

export const getNotesList = (userId: number) => {
  return api.get(`/dashboard/${userId}/notes/`);
};

export const sendNote = (userId: number, text: string) => {
  return api.post(`/dashboard/${userId}/notes/`, {
    text,
  });
};

export const editNote = (userId: number, noteId: number, text: string) => {
  return api.patch(`/dashboard/${userId}/notes/${noteId}/`, {
    text,
  });
};

export const deleteNote = (userId: number, noteId: number) => {
  return api.delete(`/dashboard/${userId}/notes/${noteId}/`);
};

export const revokeAccess = (codes: string, deactivation_type: string) => {
  return api.post(`/dashboard/revoke-users-access/`, {
    codes,
    deactivation_type,
  });
};

export const getUserQrCode = () => {
  return api.get(`/dashboard/user-qr-code/`);
};

export const searchUser = (search_term: string) => {
  return api.post(`/dashboard/search-user/`, {
    search_term,
  });
};

export const RESULTS_PER_PAGE = 20;

export const getPrescriptions = ({
  beforeDate,
  afterDate,
  status,
  query,
  page,
}: {
  beforeDate?: string;
  afterDate?: string;
  status?: string;
  query?: string;
  page: number;
}) => {
  const offset = page * RESULTS_PER_PAGE;
  let url = `/dashboard/prescriptions/?limit=${RESULTS_PER_PAGE}&offset=${offset}`;
  if (status) {
    url += `&status=${status}`;
  }
  if (beforeDate) {
    url += `&before=${beforeDate}`;
  }
  if (afterDate) {
    url += `&after=${afterDate}`;
  }
  if (query) {
    url += `&search=${query}`;
  }
  return api.get(url);
};

export const postDraftPrescription = (formData: FormData) => {
  console.log('postDraftPrescription', formData)
  return api.post(`/dashboard/prescriptions/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const postFinalPrescription = (id: number) => {
  return api.post(`/dashboard/prescriptions/${id}/send/`);
};

export const deleteDraftPrescription = (id: number) => {
  return api.delete(`/dashboard/prescriptions/${id}/`);
};

export default api;
