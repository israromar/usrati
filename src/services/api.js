import http from './usrati';

/**
 * User login
 * @returns {Promise<T | never>}
 */
export function login(payload) {
  return http
    .post('user/auth/login', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
}

/**
 * User Signup
 * @returns {Promise<T | never>}
 */
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

/**
 * Create parent user
 * @returns {Promise<T | never>}
 */
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

/**
 * Add family
 * @returns {Promise<T | never>}
 */
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

/**
 * Add user photo
 * @returns {Promise<T | never>}
 */
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

/**
 * Add guardian user
 * @returns {Promise<T | never>}
 */
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

/**
 * Add child user
 * @returns {Promise<T | never>}
 */
export function addNewChild(payload) {
  return http
    .post('child', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

/**
 * Get all children
 * @returns {Promise<T | never>}
 */
export function getAllChildren({ familyID }) {
  return http
    .get(`family/${familyID}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function addMatric(payload) {
  return http
    .post('category', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function editMatric(id, payload) {
  return http
    .put(`category/${id}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function getMatrics({ parentID }) {
  return http
    .get(`parent/${parentID}/categories`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function updateMatrics(payload) {
  return http
    .post('category/update', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}
