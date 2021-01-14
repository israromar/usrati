import http from './usrati';

export function login(payload) {
  return http
    .post('user/auth/login', payload)
    .then((response) => {
      console.log('🚀 ~ file: api.js ~ line 7 ~ .then ~ response', response);
      return response.data;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
}

export function createUser(payload) {
  return http
    .post('user', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}
export function createParent(payload) {
  return http
    .post('parent', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: payload.token,
      },
      email: payload.email,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function addFamily(payload) {
  return http
    .post('family', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

// export function addFamily(payload) {
//   return http
//     .post('family', payload)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       throw error.response.data;
//     });
// }

export function addUserPhoto(payload) {
  return http
    .post('family', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function addNewGuardian(payload) {
  return http
    .post('guardian', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function addNewChild(payload) {
  return http
    .post('child', payload)
    .then((response) => {
      console.log('🚀 ~ file: api.js ~ line 91 ~ .then ~ response', response);
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

// export function createEmployer(employer) {
//   return http
//     .post('employers', employer)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       throw error.response.data;
//     });
// }

// export function createCompany(payload) {
//   return http
//     .post('companies', payload)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       throw error.response.data;
//     });
// }

// export function createApplication(payload) {
//   return http
//     .post('applications', payload)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       throw error.response.data;
//     });
// }

// /**
//  * Get all Jobs
//  * @returns {Promise<T | never>}
//  */
// export function getJobs() {
//   return http
//     .get('jobs')
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       throw error;
//     });
// }

// export function getJobById(id) {
//   return http
//     .get(`jobs/${id}`)
//     .then((response) => {
//       return response.data;
//     })
//     .catch((error) => {
//       throw error;
//     });
// }
