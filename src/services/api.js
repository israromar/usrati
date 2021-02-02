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
export function addFamily(payload, action) {
  if (action === 'add') {
    return http
      .post('family', payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  } else {
    return http
      .patch('family', payload)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
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

export function updateGuardianData(id) {
  return http
    .patch(`parent/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function deleteGuardianData(id) {
  return http
    .delete(`parent/${id}`)
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
  console.log('🚀 ~ file: api.js ~ line 137 ~ addNewChild ~ payload', payload);
  return http
    .post('child', payload)
    .then((response) => {
      console.log('🚀 ~ file: api.js ~ line 141 ~ .then ~ response', response);
      return response.data;
    })
    .catch((error) => {
      console.log('🚀 ~ file: api.js ~ line 145 ~ addNewChild ~ error', error);
      throw error;
    });
}

export function updateChildData(id, payload) {
  console.log('id, payload', id, payload);
  return http
    .patch(`child/${id}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(
        '🚀 ~ file: api.js ~ line 158 ~ updateChildData ~ error',
        error,
      );
      throw error;
    });
}

export function deleteChildData(id) {
  return http
    .delete(`child/${id}`)
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
    .patch(`category/${id}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function deleteMatric(id) {
  return http
    .delete(`category/${id}`)
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

// Sub Categories apis
export function addSubMatric(payload) {
  return http
    .post('subcategory', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function editSubMatric(id, payload) {
  return http
    .put(`subcategory/${id}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function deleteSubMatric(id) {
  return http
    .delete(`subcategory/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function getSubMatrics({ parentCategoryID }) {
  return http
    .get(`category/${parentCategoryID}/subcategories`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}

export function updateSubMatrics(payload) {
  return http
    .post('subcategory/update', payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error.response.data;
    });
}
