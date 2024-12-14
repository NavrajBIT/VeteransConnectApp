const version = "api/v1/";
// const API_URL = "http://13.235.238.211/";
const API_URL = "http://192.168.1.3:8000/";

export const loginURL = `${API_URL}${version}auth/login/`;
export const registerURL = `${API_URL}${version}auth/register/`;
export const sendOtpURL = `${API_URL}${version}auth/send_otp/`;
export const highlightsURL = `${API_URL}${version}highlights/`;
export const announcementURL = `${API_URL}${version}announcements`;
export const nokRegistrationURL = `${API_URL}${version}nok/`;
export const echsRegistrationURL = `${API_URL}${version}echs/`;
export const veteranRegistrationURL = `${API_URL}${version}vetran/`;
export const getUserDetailsURL = `${API_URL}${version}auth/user/detail/profile/`;
export const fetchFeedbackURL = `${API_URL}${version}feedback/`;
export const sendFeedbackURL = `${API_URL}${version}feedback/`;
