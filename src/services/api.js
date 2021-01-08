import http from './usrati';

export function login(payload) {
  return http
    .post('auth', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error);
    });
}

export function createStudent(payload) {
  return http
    .post('students', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function createEmployer(employer) {
  return http
    .post('employers', employer)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function createCompany(payload) {
  return http
    .post('companies', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function createApplication(payload) {
  return http
    .post('applications', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

/**
 * Get all Jobs
 * @returns {Promise<T | never>}
 */
export function getJobs() {
  return http
    .get('jobs')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export function getJobById(id) {
  return http
    .get(`jobs/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
